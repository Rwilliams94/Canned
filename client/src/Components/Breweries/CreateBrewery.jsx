import React, { Component } from "react";
import AddressSearch from "../AddressSearch";
import ReviewRating from "../../Components/Reviews/ReviewRating";
import UploadWidget from "../../Components/UploadWidget";
import UserContext from "../../Components/Auth/UserContext";
import "../../Styles/Forms.css";
import apiHandler from "../../API/apiHandler"
// import apiHandler from '../API/apiHandler'

export class CreateBrewery extends Component {
  static contextType = UserContext;

  state = {
    selectedBeer: null,
    rating: null,
    name: null,
    description: null,
    website: null,
    establisheddate: null,
    address: null,
    latitude: null,
    longitude: null,
  };

  imageRef = React.createRef();

  handleChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({ [name]: value });
  };

  handleOnSubmit = (event) => {
    event.preventDefault();

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
      .CreateBrewery(fd)
      .then((data) => {
        //log success

        console.log("success", data);

        // reset state

        this.setState({
          rating: null,
          name: null,
          description: null,
          website: null,
          establisheddate: 2021,
          address: null,
          latitude: null,
          longitude: null,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleFileSelect = (temporaryURL) => {
    this.setState({ tmpUrl: temporaryURL });
  };

  handleAddressSelect = (location) => {
    console.log(location);
    this.setState({
        address: location.place_name,
        longitude: location.geometry.coordinates[0],
        latitude: location.geometry.coordinates[1],
    });
  };


  handleAddStars = (rating) => {
    this.setState({ rating: rating });
  };

  render() {

    return (
      <div className="brewery__form-main">
          <form
            className="brewery__form"
            onSubmit={this.handleOnSubmit}
          >
            <label className="form__label" htmlFor="name">
              Name
            </label>
            <input
              className="form__input"
              onChange={this.handleChange}
              value={this.state.name}
              type="text"
              name="name"
              id="name"
            />

            <label className="form__label" htmlFor="description">
              Description
            </label>

            <div className="form-group">
            <textarea
              className="brewery__description"
              id="description"
              type="text"
              name="description"
              value={this.state.comment}
              placeholder="Describe this home of beer"
              onChange={this.handleChange}
            ></textarea>
          </div>
                   
            <label className="form__label" htmlFor="name">
              Website
            </label>
            <input
              className="form__input"
              onChange={this.handleChange}
              value={this.state.website}
              type="text"
              name="website"
              id="website"
            />


            <label className="form__label" htmlFor="year">
                Brewery established in
              </label>
              <input
                className="form__input-small"
                onChange={this.handleChange}
                value={this.state.establisheddate}
                type="number"
                name="establisheddate"
                id="establisheddate"
              />

            <label className="form__label" htmlFor="rating">
                Star rating
            </label>

            <ReviewRating setRate={this.handleAddStars} />

            <label className="form__label" htmlFor="address">
                Address search
            </label>

            <AddressSearch onSelect={this.handleAddressSelect} />

            <div className="newbeer__image-output">
              <UploadWidget
                ref={this.imageRef}
                onFileSelect={this.handleFileSelect}
                name="image"
              >
                Upload image
              </UploadWidget>

              <div className="flex-center">
                {!this.state.tmpUrl ? (
                  ""
                ) : (
                  <img className="upload__image" src={this.state.tmpUrl} alt="beer" />
                )}
              </div>
            </div>

            <button className="btn-submit">ADD</button>
          </form>
      </div>
    );
  }
}

export default CreateBrewery;
