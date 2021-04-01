  
import React, { Component } from "react";
// import UserContext from "../Auth/UserContext";
import withUser from '../Auth/withUser'
import apiHandler from "../../API/apiHandler";
import ReviewRating from '../Reviews/ReviewRating';
import UploadWidget from '../UploadWidget'
import '../../Styles/Forms.css'

// import "../../styles/form.css";

class ReviewForm extends Component {
  // static contextType = UserContext;
  beerId = this.props.beerId
  userId = this.props.context.user._id
  beerName = this.props.beerName

  state = {
      beername: this.beerName,
      beerid: this.beerId,
      userid: this.userId,
  };

  


  imageRef = React.createRef();

  handleChange = (event) => {
    const value = event.target.value;
    const key = event.target.name;
    this.setState({ [key]: value });
    console.log(this.state);
  };

  handleSubmit = (event) => {
    event.preventDefault();
   
    const {beername, beerid, userid, rating, comment} = this.state;
    
    const newReview = {
      beerid,
      beername,
      userid,
      rating,
      comment,
    }




    const fd = new FormData();

    for (const key in this.state) {
      if (key === "image") continue;
      fd.append(key, this.state[key]);
    }

    for (var pair of fd.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }

    if (this.imageRef.current.files[0]) {
      fd.append("image", this.imageRef.current.files[0]);
    }
    
    apiHandler
      .CreateReview(newReview)
      .then((data) => {
        console.log(data, "success");
      })
      .catch((error) => {
        console.log(error);
      });

    if (this.imageRef.current.files[0]) {
      apiHandler
      .Createimage(fd)
      .then((data) => {
        console.log(data, "success");
      })
      .catch(err => console.log(err))
    }

    this.props.onComplete()
  };

  handleFileSelect = (temporaryURL) => {
    // Get the temporaryURL from the UploadWidget component and
    // set the state so we can have a visual feedback on what the image will look like :)
    this.setState({ tmpUrl: temporaryURL });
  };

  handleAddStars = (rating) => {
      this.setState({rating: rating})
  }


  render() {

    console.log(this.state);

    return (
      <section className="reivew__form-main">
        <header className="header">
          <h3>
            Add a Review of {this.props.beerName}
          </h3>
        </header>

        <form
          autoComplete="off"
          className="review__form"
          onSubmit={this.handleSubmit}
        >

          <div className="form-group">
            <ReviewRating setRate={this.handleAddStars}/>
          </div>

          <div className="form-group">
            <textarea
              className="review__comment"
              id="comment"
              type="text"
              name="comment"
              value={this.state.comment}
              placeholder="Write your thoughts"
              onChange={this.handleChange}
            ></textarea>
          </div>

            <div className="newbeer__image-output">
              <UploadWidget
                ref={this.imageRef}
                onFileSelect={this.handleFileSelect}
                name="image"
              >
                Upload image
              </UploadWidget>

              <div className="flex-center upload__image-box ">
                {!this.state.tmpUrl ? (
                  ""
                ) : (
                  <img className="upload__image" src={this.state.tmpUrl} alt="beer" />
                )}
              </div>
            </div>
          <button className="btn-submit">Review Can</button>
        </form>
      </section>
    );
  }
}

export default withUser(ReviewForm);