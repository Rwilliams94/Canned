import React, { Component } from "react";
import apiHandler from '../../API/apiHandler'
// import withUser from '../Components/Auth/withUser'
import UpdateBrewery from './UpdateBrewery'
import Rating from '../../Components/Rating'
import '../../Styles/BreweryDetails.css'
import BeerList from "../Beers/BeerList";

export class BreweryDetails extends Component {

    state = {
      brewery: null,
      breweryBeers: null,
      beerList: false,
      showSettings: false,
    };


  componentDidMount() {
    this.setState({brewery: this.props.brewery})
    const breweryId = this.props.brewery._id
 
    // get brewery beers

    apiHandler
    .getBreweryBeers(breweryId)
    .then(response => {
      console.log(response);
      this.setState({breweryBeers: response})
    })
    .catch((err) => {
      console.log(err);
    });
  }



  handleAddBeer = () => {
    apiHandler
      .addUserBeer(this.beerId)
      .then(response => {
        console.log("success");
        this.setState({alreadyDrunk: !this.state.alreadyDrunk})
      })
      .catch(err => console.log(err))
  }

  handleRemoveBeer = () => {
    apiHandler
      .removeUserBeer(this.beerId)
      .then(response => {
        console.log("success");
        this.setState({
          alreadyDrunk: !this.state.alreadyDrunk,
          reviewForm: false,
          imageForm: false,
        })
      })
      .catch(err => console.log(err))
  }

  handleBeerList = () => {
    this.setState({beerList: true})
  }

  handleDescription = () => {
    this.setState({beerList: false})
  }

  handleShowSettings = () => {
    this.setState({
      showSettings: !this.state.showSettings
    })
  }

  handleBreweryChange = (newBrewery) => {
    this.setState({
      brewery: newBrewery
    })
  }


  render() {
    
    if (this.state.brewery === null) {
      return <div>One sec, just heading to the bar...</div>;
    }

    if (this.state.breweryBeers === null) {
      return <div>One sec, just heading to the bar...</div>;
    }

    const brewery = this.state.brewery

    return (
      <div className="brewDetails__main">

        <div className="brewDetails__box">
        
           
          <div className="brewDetails__top-box">
            <div className="brewDetails__image-box">
              <img
                className="brewDetails__image"
                src={brewery.image}
                alt="brewery"
                />
            </div>
            <div className="brewDetails__info-box">
              <h1 className="beername">{brewery.name}</h1>
              <h5>Established in {brewery.establisheddate}</h5>
              <div className="details__rating" >
                <Rating rating={brewery.rating}/>
              </div>
              <p> <a target="_blank" href={brewery.website}>{brewery.website}</a></p>
              <p className="settings">{brewery.address}</p>
              <h4 className="settings" onClick={this.handleShowSettings}>settings</h4>
              
            </div>
          </div>  
          
          {this.state.showSettings && (
                <div className="overflow settings-box">              
                  <UpdateBrewery brewery={this.state.brewery} handleChange={this.handlebreweryChange} handleClose={this.handleShowSettings}/>
                </div>
              )}   
          <div className="details__canned-options">
            <div onClick={this.handleDescription} className={`${this.state.beerList && "active"} flex-center details__link-bar-links`}><h2>Details</h2></div>
            <div onClick={this.handleBeerList} className={`${this.state.beerList || "active"} flex-center details__link-bar-links`}><h2>Beers</h2></div>
        </div>
        <div className="brewDetails__bottom-box overflow">

            {this.state.beerList ? (
              <div>
                <BeerList beerList={this.state.breweryBeers}/>
              </div>
            )
            : (<div className="details__description">
              <p>{brewery.description}</p>
            </div> )}   

        </div>
        <div onClick={this.props.closePopUp}><h2 className="thin back-to">back to map</h2></div>

                
        </div>
      </div>
    );
  }
}

export default BreweryDetails;
