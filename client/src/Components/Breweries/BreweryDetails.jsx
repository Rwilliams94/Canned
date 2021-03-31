import React, { Component } from "react";
import apiHandler from '../../API/apiHandler'
// import withUser from '../Components/Auth/withUser'
import UpdateBrewery from './UpdateBrewery'
import Rating from '../../Components/Rating'
import '../../Styles/BeerDetails.css'
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
      <div className="details__main">

        <div className="details__box">
        <div onClick={this.props.closePopUp}><h2>back to map</h2></div>
          <div className="details__top-box">
            <div className="details__image-box">
              <img
                className="details__image"
                src={brewery.image}
                alt="brewery"
                />
            </div>
            <div className="details__info-box">
              <h1>{brewery.name}</h1>
              <h4 onClick={this.handleShowSettings}>settings</h4>
              <div className="details__rating" >
                <Rating rating={brewery.rating}/>
              </div>
              <h4>Established in {brewery.establisheddate}</h4>
              <h4>{brewery.address}</h4>
              <p>Check them out {brewery.website}</p>
              
            </div>
          </div>  

          {this.state.showSettings && (
                <div className="overflow settings-box">              
                  <UpdateBrewery brewery={this.state.brewery} handleChange={this.handlebreweryChange} handleClose={this.handleShowSettings}/>
                </div>
              )}   
          <div className="beer__list-type">
            <div onClick={this.handleDescription} className="beer__list-switch"><h2>Details</h2></div>
            <div onClick={this.handleBeerList} className="beer__list-switch"><h2>Beers</h2></div>
        </div>
            {this.state.beerList ? (
              <div>
                <BeerList beerList={this.state.breweryBeers}/>
              </div>
            )
            : (<div className="details__description">
              <p>{brewery.description}</p>
            </div> )}   

                
        </div>
      </div>
    );
  }
}

export default BreweryDetails;
