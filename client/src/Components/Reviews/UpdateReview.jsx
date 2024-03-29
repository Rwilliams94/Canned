import React, { Component } from "react";
import { withRouter } from "react-router-dom";
// import Button from "../Button";
import Button from "../Button";
import apiHandler from "../../API/apiHandler";
import UserContext from "../Auth/UserContext";
import ReviewRating from "../Reviews/ReviewRating";
// import { buildFormData } from "../../utils";
import '../../Styles/Forms.css'

class UpdateBrewery extends Component {
  static contextType = UserContext;

  state = {};

  componentDidMount() {
   const review = this.props.review;
    this.setState({
      userid: review.userid,
      beerid: review.beerid,
      beername: review.beername, 
      breweryid: review.breweryid,
      rating: review.rating,
      comment: review.comment,
    });
  }

  handleChange = (event) => {
    const value = event.target.value;
    const key = event.target.name;
    this.setState({ [key]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { 
        userid,
        beerid,
        beername,
        breweryid,
        rating,
        comment } = this.state;

    const reviewUpdate = { 
        userid,
        beerid,
        beername,
        breweryid,
        rating,
        comment }

        console.log(reviewUpdate);

    apiHandler
      .editReview(this.props.review._id, reviewUpdate)
      .then((data) => {
        console.log("success", data);
        this.props.handleClose();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // select stars

  handleAddStars = (rating) => {
    this.setState({
      rating: rating,
    });
  };

  handleDeleteBeer = (reviewId) => {
    apiHandler
    .deleteReview(reviewId)
    .then(response => {
      console.log("success", response);
      this.props.handleClose();
      this.props.history.push("/profile")
    })
    .catch(err => {console.log(err)})
    
  }

  render() {
  

    return (
      <section className="reivew__form-main">
        <form autoComplete="off" className="reivew__form flex-center" onSubmit={this.handleSubmit}>
          <h1 className="flex-center">
            Edit your review <span onClick={this.props.handleClose}>X</span>
          </h1>

          <div className="form-group">
            <textarea
              className="review__comment"
              id="comment"
              type="text"
              name="comment"
              onChange={this.handleChange}
              defaultValue={this.state.comment}
            ></textarea>
          </div>

          <div className="form-group">
            <ReviewRating setRate={this.handleAddStars} />
          </div>

          <Button primary>Save</Button>
        </form>

        <h3 className="settings">Or, if you're sure... <b onClick={() => this.handleDeleteReview(this.props.review._id)}>delete</b> this review</h3>
      </section>
    );
  }
}

export default withRouter(UpdateBrewery);
