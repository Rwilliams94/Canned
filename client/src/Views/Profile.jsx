import React, { Component } from "react";
import { Link } from "react-router-dom";
import withUser from "../Components/Auth/withUser";
import NewBeer from './NewBeer';
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

    
 
  };

  componentDidMount() {
    const { context } = this.props;
    const { user } = context;

    this.setState({ user: user});

    
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
        this.setState({ reviews: dbRes });
      })
      .catch((err) => console.log(err));

    // get user images

    apiHandler
      .getUserImages()
      .then((dbRes) => {
        this.setState({ images: dbRes });
      })
      .catch((err) => console.log(err));
  }

  handleNextPhoto = () => {
    this.setState({imageNumber: this.state.imageNumber+1})
  }

  handlePreviousPhoto = () => {
    this.setState({imageNumber: this.state.imageNumber-1})
  }


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

    console.log(this.state.beers);

    //latest photos/reviews/beers

    const user = this.state.user;
    const reviews = this.state.reviews.slice(0, 3);

    return (
      <div className="flex-center profile__main">

        {/* add beer search and form */}

        <NewBeer/>
        <h2 onClick={this.handleLogout}>Logout</h2>
        
        {/* Profile Header */}
        <div className="flex-center profile__header">
          <h1>Welcome {user.userName}</h1>
          <h2>{user.city}</h2>
          <h2>Beer count: {this.state.beerCount}</h2>
          <Link exact to="/user-beer">
          <h3>Check your beers</h3>
          </Link>

        </div>

        {/* Image scroller */}

        <h1>latest images</h1>
        <ImageScroller imagesList={this.state.images}/> 

        <h1>latest reviews</h1>
        <ul>
          {reviews.map((review) => (
            <li>
              <h3>
                {review.beername} score: {review.rating}
              </h3>
              <p>{review.comment}</p>
            </li>
          ))}
        </ul>

        {/* <h2 style={{ fontSize: "1.5rem", marginBottom: "10px" }}>
          This is profile, it's protected !
        </h2>
        <p>
          Checkout the<b>ProtectedRoute</b> component in
          <code>./components/ProtectRoute.jsx</code>
        </p>
        <a
          style={{ color: "dodgerblue", fontWeight: "bold" }}
          target="_blank"
          rel="noopener noreferrer"
          href="https://reacttraining.com/react-router/web/example/auth-workflow"
        >
          React router dom Demo of a protected route
        </a> */}

        {/* <section className="Profile">
          <div className="user-image round-image">
            <img src={user.profileImg} alt={user.firstName} />
          </div>
          <div className="user-presentation">
            <h2>
              {user.firstName} {user.lastName}
            </h2>
            <Link className="link" to="/profile/settings">
              Edit profile
            </Link>
          </div>

          {/* phone number active box */}
        {/* 
          {user.phoneNumber ? (
            <h1>{user.phoneNumber}</h1>
          ) : (
            <div className="user-contact">
              <h4>Add a phone number</h4>

              <form className="form">
                <div className="form-group">
                  <label className="label" htmlFor="phoneNumber">
                    Phone number
                  </label>
                  <input
                    className="input"
                    id="phoneNumber"
                    type="text"
                    name="phoneNumber"
                    placeholder="Add phone number"
                  />
                </div>
                <button className="form__button">Add phone number</button>
              </form>
            </div>
          )} */}

        {/* Break whatever is belo  */}
        {/* 
          {this.state.items === "empty" ? (
            <div className="CardItem">
              <div className="item-empty">
                <div className="round-image">
                  <img src="/media/personal-page-empty-state.svg" alt="" />
                </div>
                <p>You don't have any items :(</p>
              </div>
            </div>
          ) : (
            <div className="CardItem">
              <h3>Your items</h3>

            {this.state.items.map(item => (
              <div className="item" key={item._id}>
                <div className="round-image">
                  <img
                    src={item.image}
                    alt="item"
                  />
                </div>
                <div className="description">
                  <h2>{item.name}</h2>
                  <h4>Quantity: {item.quantity} </h4>
                  <p>{item.description}</p>
                  <div className="buttons">
                    <span>
                      <button className="btn-secondary">Delete</button>
                    </span>
                    <span>
                      <button className="btn-primary">Edit</button>
                    </span>
                  </div>
                </div>
              </div>
            ))}
            </div>
          )}
        </section>  */}
      </div>
    );
  }
}

export default withUser(Profile);
