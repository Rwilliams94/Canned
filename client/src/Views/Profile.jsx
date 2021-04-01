import React, { Component } from "react";
import { Link } from "react-router-dom";
import withUser from "../Components/Auth/withUser";
import NewBeer from "./NewBeer";
import UpdateUser from "../Components/User/Forms/UpdateUser";
import UpdateReview from "../Components/Reviews/UpdateReview";
import Rating from "../Components/Rating";
import "../Styles/Profile.css";
// import "../styles/CardItem.css";
import apiHandler from "../API/apiHandler";
import ImageScroller from "../Components/ImageScroller";

class Profile extends Component {
  // authContext = this.props.context

  state = {
    user: null,
    beers: null,
    images: null,
    reviews: null,
    beerCount: null,
    reviewCLicked: null,
    showUserSettings: false,
    showSettings: false,
    reviewEdit: false,
    imageBox: false,
  };

  componentDidMount() {
    const { context } = this.props;
    const { user } = context;

    this.setState({ user: user });

    // get user beers

    apiHandler
      .getUserBeers()
      .then((dbRes) => {
        this.setState({
          beers: dbRes,
          beerCount: dbRes.length,
        });
      })
      .catch((err) => console.log(err));

    // get user reviews

    apiHandler
      .getUserReviews()
      .then((dbRes) => {
        const list = [...dbRes];

        list.sort((a, b) => {
          return b.updated_at - a.updated_at;
        });

        this.setState({ reviews: list });
      })
      .catch((err) => console.log(err));

    // get user images

    apiHandler
      .getUserImages()
      .then((dbRes) => {
        const list = [...dbRes];

        list.sort((a, b) => {
          return b.updated_at - a.updated_at;
        });

        this.setState({ images: list });
      })
      .catch((err) => console.log(err));
  }

  handleShowPhoto = () => {
    this.setState({
      imageBox: !this.state.imageBox,
    });
  };
  handleNextPhoto = () => {
    this.setState({ imageNumber: this.state.imageNumber + 1 });
  };

  handlePreviousPhoto = () => {
    this.setState({ imageNumber: this.state.imageNumber - 1 });
  };

  handleReviewClicked = (review) => {
    this.setState({
      reviewCLicked: review,
      reviewEdit: true,
    });
  };

  handleReviewClose = () => {
    this.setState({ reviewEdit: false });
  };

  handleShowSettings = () => {
    this.setState({
      showSettings: !this.state.showSettings,
    });
  };

  handleShowUserSettings = () => {
    this.setState({
      showUserSettings: !this.state.showUserSettings,
    });
  };


  handleLogout = () => {
    const { context } = this.props;

    apiHandler
      .logout()
      .then(() => {
        context.removeUser();
        this.props.history.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    if (this.state.user === null) {
      return <div>loading...</div>;
    }

    if (this.state.images === null) {
      return <div>loading...</div>;
    }

    if (this.state.reviews === null) {
      return <div>loading...</div>;
    }

    if (this.state.beers === null) {
      return <div>loading...</div>;
    }

    console.log(this.state);

    //latest photos/reviews/beers

    const user = this.state.user;
    const reviews = this.state.reviews.slice(0, 10);

    return (
      <div className="flex-center profile__main">
        {/* add beer search and form */}
        <div className="profile__top">
          <NewBeer />
        </div>
        <div className="profile__body overflow">
          {/* Profile Header */}
          <div className="flex-center profile__header">
            <h1 className="flex-center profile__username">{user.userName}</h1>
            <p className="settings" onClick={this.handleShowUserSettings}>
              settings
            </p>
            <div className="flex-center profile__beer-city-box">
              <div className="profile__organiser">
                <h2 className="profile__reivew-box flex-center thin">City</h2>
                <h2 className="profile__reivew-box flex-center thin">Beers</h2>
              </div>
              <div className="profile__organiser">
                <h3 className="profile__reivew-box flex-center thin">
                  {user.city}
                </h3>
                <h3 className="profile__reivew-box flex-center thin">
                  {this.state.beerCount}
                </h3>
              </div>
            </div>
            <div className="flex-center beers__link thin">
            <Link exact to="/user-beer">
              <h4 className="">Your Can List </h4>
            </Link>
            </div>
          </div>
          {/* settings */}

          {this.state.showUserSettings && (
            <div className="flex-center profile__settings-box">
              <h2 className="btn-submit" onClick={this.handleLogout}>Logout</h2>
              <UpdateUser handleClose={this.handleShowUserSettings} />
            </div>
          )}

          {/* Image scroller */}

          <h3 className="comments thin flex-center">latest images</h3>
          <ImageScroller
            imagesList={this.state.images}
            onSelect={this.handleShowPhoto}
          />

          {/* Review list */}

          <h3 className="comments thin flex-center">latest reviews</h3>
          {this.state.reviewEdit && (
            <div className="flex-center">
              <h2>Update this comment</h2>
              <UpdateReview
                review={this.state.reviewCLicked}
                handleClose={this.handleReviewClose}
              />
            </div>
          )}
          <ul>
            {reviews.map((review) => (
              <li className="beer__list-item flex-center">
                <Link exact to={`/beer-detail/${review.beerid}`}>
                  <div className="profile__review-name">
                    <div className="profile__reivew-box flex-center">
                      <h4>{review.beername} </h4>
                    </div>
                    <div className="profile__reivew-box flex-center">
                      <Rating rating={review.rating} />
                    </div>
                  </div>
                </Link>
                <p>{review.comment}</p>
                <p
                  className="settings"
                  onClick={() => this.handleReviewClicked(review)}
                >
                  edit
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default withUser(Profile);
