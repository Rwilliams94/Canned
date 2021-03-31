import React, { Component } from "react";
import { Link } from "react-router-dom";
import withUser from "../Components/Auth/withUser";
import NewBeer from "./NewBeer";
import UpdateUser from "../Components/User/Forms/UpdateUser";
import UpdateReview from "../Components/Reviews/UpdateReview";
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

        const list = [...dbRes]

        list.sort((a,b)=> {
          return b.updated_at - a.updated_at
        })

        this.setState({reviews: list});
      })
      .catch((err) => console.log(err));

    // get user images

    apiHandler
      .getUserImages()
      .then((dbRes) => {
        const list = [...dbRes]

        list.sort((a,b)=> {
          return b.updated_at - a.updated_at
        })

        this.setState({images: list});
      })
      .catch((err) => console.log(err));
  }

  handleShowPhoto = () => {
    this.setState({
      imageBox: !this.state.imageBox
    })
  }
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
    const reviews = this.state.reviews.slice(0, 3);

    return (
      <div className="flex-center profile__main">
        {/* add beer search and form */}

        <NewBeer />

        {/* Profile Header */}
        <div className="flex-center profile__header">
          <h1>Welcome {user.userName} </h1>
          <p onClick={this.handleShowSettings}>settings</p>
          <h2>{user.city}</h2>
          <h2>Beer count: {this.state.beerCount}</h2>
          <Link exact to="/user-beer">
            <h3>Check your beers</h3>
          </Link>
        </div>
        {/* settings */}

        {this.state.showSettings && (
          <div className="flex-center profile__settings-box">
            <h2 onClick={this.handleLogout}>Logout</h2>
            <h2>Update your profile</h2>
            <UpdateUser handleClose={this.handleShowSettings} />
          </div>
        )}

        {/* Image scroller */}


        <h1>latest images</h1>
        <ImageScroller imagesList={this.state.images} onSelect={this.handleShowPhoto}/>
        
        {/* Review list */}

        <h1>latest reviews</h1>
        {this.state.reviewEdit && (
          <div className="flex-center profile__settings-box">
            <h2>Update this comment</h2>
            <UpdateReview
              review={this.state.reviewCLicked}
              handleClose={this.handleReviewClose}
            />
          </div>
        )}
        <ul>
          {reviews.map((review) => (
            <li>
              <Link exact to={`/beer-detail/${review.beerid}`}>
                <h3>
                  {review.beername} score: {review.rating}
                </h3>
              </Link>
              <h4 onClick={() => this.handleReviewClicked(review)}>edit</h4>
              <p>{review.comment}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default withUser(Profile);
