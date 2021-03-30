  
import React, { Component } from "react";
import UserContext from "../Auth/UserContext";
import apiHandler from "../../API/apiHandler";
import ReviewRating from '../Reviews/ReviewRating'

// import "../../styles/form.css";

class ReviewForm extends Component {
  beerId = this.props.beerId
  static contextType = UserContext;

  state = {
      beerid: this.beerId,
  };

  handleChange = (event) => {
    const value = event.target.value;
    const key = event.target.name;
    this.setState({ [key]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    apiHandler
      .CreateReview(this.state)
      .then((data) => {
        console.log(data, "success");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleAddStars = (rating) => {
      this.setState({rating: rating})
  }


  render() {

    return (
      <section className="details__review-form">
        <header className="header">
          <h3>
            Add a Review of {this.props.beerName}
          </h3>
        </header>

        <form
          autoComplete="off"
          className="form"
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
        >

            
            <div className="form-group">
            <ReviewRating setRate={this.handleAddStars}/>
            </div>

            <div className="form-group">
              <input
                className="review-comment"
                id="comment"
                type="text"
                name="comment"
                placeholder="Write your thoughts"
              />
            </div>
          <button className="btn-submit">Review Can</button>
        </form>
      </section>
    );
  }
}

export default ReviewForm;