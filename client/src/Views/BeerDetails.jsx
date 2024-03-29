import React, { Component } from "react";
// import { Link, NavLink } from "react-router-dom";
import apiHandler from "../API/apiHandler";
import withUser from "../Components/Auth/withUser";
import Rating from "../Components/Rating";
import ReviewForm from "../Components/Reviews/ReviewForm";
import ImageScroller from "../Components/ImageScroller";
import UpdateBeer from "../Components/Beers/UpdateBeer";
import "../Styles/Details.css";

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
    showSettings: false,
  };

  componentDidMount() {
    const { context } = this.props;
    const { user } = context;

    this.setState({
      user: user,
      userBeers: user.beers,
    });

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
      this.setState({ alreadyDrunk: true });
    }

    apiHandler
      .getBeerImages(this.beerId)
      .then((response) => {
        if (response.length > 0) {
          this.setState({ beerImages: response });
        } else {
          this.setState({ beerImages: [] });
        }
      })
      .catch((err) => {
        console.log(err);
      });

    apiHandler
      .getBeerReviews(this.beerId)
      .then((response) => {
        if (response.length > 0) {
          this.setState({ beerReviews: response });
        } else {
          this.setState({ beerReviews: [] });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleAddBeer = () => {
    apiHandler
      .addUserBeer(this.beerId)
      .then((response) => {
        console.log("success");
        this.setState({ alreadyDrunk: !this.state.alreadyDrunk });
      })
      .catch((err) => console.log(err));
  };

  handleRemoveBeer = () => {
    apiHandler
      .removeUserBeer(this.beerId)
      .then((response) => {
        console.log("success");
        this.setState({
          alreadyDrunk: !this.state.alreadyDrunk,
          reviewForm: false,
          imageForm: false,
        });
      })
      .catch((err) => console.log(err));
  };

  handleShowReview = () => {
    console.log("click");
    this.setState({ reviewForm: !this.state.reviewForm });
  };

  handleShowImage = () => {
    this.setState({ imageForm: !this.state.imageForm });
  };

  handleShowSettings = () => {
    this.setState({
      showSettings: !this.state.showSettings,
    });
  };

  handleBeerChange = (newBeer) => {
    this.setState({
      beer: newBeer,
    });
  };

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

    const beer = this.state.beer;

    return (
      <div className="details__main">
        <div className="details__link-bar">
          {this.state.alreadyDrunk ? (
            <div className="flex-center">
              <h3 className="flex-center midthin canned">Canned!</h3>

              <div className="details__canned-options">
                <h3 className={`${this.state.reviewForm && "active"} flex-center details__link-bar-links`} onClick={this.handleShowReview}>Review</h3>
                <h3 className={`flex-center details__link-bar-links`} onClick={this.handleRemoveBeer}>un-Can?</h3>
              </div>
            </div>
          ) : (
            <h3 className="flex-center midthin canned" onClick={this.handleAddBeer}>+ Can it!</h3>
          )}
          {this.state.reviewForm && (
            <ReviewForm
              beerName={beer.name}
              beerId={this.beerId}
              onComplete={this.handleShowReview}
            />
          )}
        </div>

        <div className={`details__box overflow ${this.state.alreadyDrunk && "can-move"}`}>
          <div className="details__top-box">
            <div className="flex-center details__image-box">
              <img className="details__image" src={beer.image} alt="beer" />
            </div>
            <div className="details__info-box">
              <h1 className="beername">{beer.name}</h1>
              <h4>{beer.breweryname}</h4>
              <div className="details__rating">
                <Rating rating={beer.rating} />
              </div>
              <p>{beer.abv}% ABV</p>
              <h4 className="settings" onClick={this.handleShowSettings}>settings</h4>
            </div>

            {/* settings */}

            {this.state.showSettings && (
              <div className="settings-box overflow">
                <UpdateBeer
                  beer={this.state.beer}
                  handleChange={this.handleBeerChange}
                  handleClose={this.handleShowSettings}
                />
              </div>
            )}
          </div>
         

          <div className="details__description">
            <p>{beer.description}</p>
          </div>
          
          <h3 className="comments midthin flex-center">Images</h3>
          <div className="details__image-scroll">
            {this.state.beerImages.length > 0 ? (
              <ImageScroller imagesList={this.state.beerImages} />
            ) : (
              <h1>The beer has no Can snaps yet!</h1>
            )}
          </div>

          <h3 className="comments midthin flex-center">Comments</h3>
          <ul>
            {this.state.beerReviews.map((review) => (
              <li className="beer__list-item flex-center">
                <Rating rating={review.rating} />
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
