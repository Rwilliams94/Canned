import React, { Component } from "react";
import { Link, NavLink } from 'react-router-dom'
import apiHandler from '../API/apiHandler'
import withUser from '../Components/Auth/withUser'
import Rating from '../Components/Rating'
import ReviewForm from '../Components/Reviews/ReviewForm';
import ImageScroller from '../Components/ImageScroller';
import '../Styles/BeerDetails.css'

export class BreweryDetails extends Component {

    state = {
      brewery: null,
      brewryBeers: null,
      beerList: false,
    };


  componentDidMount() {
    const breweryId = this.props.breweryId
 
    // get brewery 

    apiHandler
    .getOneBrewery(breweryId)
    .then(response => {
      this.setState({brewery: response})
    })
    .catch((err) => {
      console.log(err);
    });
    
    // get brewery beers

    apiHandler
    .getBreweryBeers(breweryId)
    .then(response => {
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

  handleShowBeers = () => {
    this.setState({beerList: !this.state.beerList})
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

        {/* <div className="details__link-bar">
          {this.state.beerList ? 

            (
              <div className="flex-center">
                <h3>Canned!</h3>

                <div className="details__canned-options">
                  <h3 onClick={this.handleShowReview}>Review</h3>
                  <h3 onClick={this.handleRemoveBeer}>un-Can?</h3>
                 
                </div>
              </div>
            ) : 
            (<h3 onClick={this.handleAddBeer}>Tried this one before? Can it!</h3> )}
            {this.state.reviewForm && <ReviewForm  beerName={beer.name} beerId={this.beerId} onComplete={this.handleShowReview}/>}

        </div> */}

        <div className="details__box">
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
              <div className="details__rating" >
                <Rating rating={brewery.rating}/>
              </div>
              <h4>Established in {brewery.establisheddate}</h4>
              <h4>{brewery.address}</h4>
              <p>Check them out {brewery.website}</p>
              
            </div>
          </div>     

            <div className="details__description">
              <p>{brewery.description}</p>
            </div>          
        </div>
      </div>
    );
  }
}

export default withUser(BeerDetails);
