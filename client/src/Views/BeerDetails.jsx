import React, { Component } from "react";
import { Link, NavLink } from 'react-router-dom'
import apiHandler from '../API/apiHandler'
import withUser from '../Components/Auth/withUser'
import Rating from '../Components/Rating'
import ReviewForm from '../Components/Reviews/ReviewForm';
import ImageScroller from '../Components/ImageScroller';
import '../Styles/BeerDetails.css'

export class BeerDetails extends Component {
  
  beerId = this.props.match.params.id;

    state = {
      user: null,
      beer: null,
      userBeers: null,
      alreadyDrunk: false,
      reviewForm: false,
      imageForm: false,
      beerImages: null,
      beerReviews: null,
    };


  componentDidMount() {
    const {context} = this.props
    const {user} = context


    this.setState({
      user: user,
      userBeers: user.beers
    })
  
    apiHandler
      .getOneBeer(this.beerId)
      .then((response) => {
        if (response.name === undefined) this.props.history.push("/*");
        this.setState({ beer: response });
      })
      .catch((err) => {
        console.log(err);
      });

      if (user.beers.includes(this.beerId)) {
        this.setState({alreadyDrunk: true})
      } 

    apiHandler
    .getBeerImages(this.beerId)
    .then(response => {
      if(response.length>0) {
        this.setState({beerImages: response})
      } else {
        this.setState({beerImages: []})
      }
    })
    .catch((err) => {
      console.log(err);
    });

    apiHandler
    .getBeerReviews(this.beerId)
    .then(response => {
      if(response.length>0) {
        this.setState({beerReviews: response})
      }  else {
        this.setState({beerReviews: []})
      }
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

  handleShowReview = () => {
    console.log("click");
    this.setState({reviewForm: !this.state.reviewForm})
  }

  handleShowImage = () => {
    this.setState({imageForm: !this.state.imageForm})
  }


  render() {
    
    if (this.state.user === null) {
      return <div>One sec, just heading to the bar...</div>;
    }

    if (this.state.beer === null) {
      return <div>One sec, just heading to the bar...</div>;
    }

    if (this.state.beerImages === null) {
      return <div>One sec, just heading to the bar...</div>;
    }

    if (this.state.beerReviews === null) {
      return <div>One sec, just heading to the bar...</div>;
    }



    const beer = this.state.beer

    return (
      <div className="details__main">
        <div className="details__link-bar">
          {this.state.alreadyDrunk ? 

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

        </div>

        <div className="details__box">
          <div className="details__top-box">
            <div className="details__image-box">
              <img
                className="details__image"
                src={beer.image}
                alt="beer"
                />
            </div>
            <div className="details__info-box">
              <h1>{beer.name}</h1>
              <h4>{beer.breweryname}</h4>
              <div className="details__rating" >
                <Rating rating={beer.rating}/>
              </div>
              <p>{beer.abv}% ABV</p>
              
            </div>
          </div>
          <div className="details__image-scroll">
            {this.state.beerImages.length>0 ? 
            (<ImageScroller imagesList={this.state.beerImages}/> )
            :
            (<h1>The beer has no Can snaps yet!</h1>)
            }
          </div>
        

            <div className="details__description">
              <p>{beer.description}</p>
            </div>
            <Link
                exact
                to={`/beers/edit/${this.beerID}`}
                className="home__link"
              >
                <h3>Edit this beer</h3> 
            </Link>

            <h3>Comments</h3>
            <ul>
            {this.state.beerReviews.map(review => (
              <li>
                <Rating rating={review.rating}/>
                <p>{review.comment}</p>
              </li>
            ))}
            </ul>

          
        </div>
      </div>
    );
  }
}

export default withUser(BeerDetails);
