import React, { Component } from "react";
import SearchBar from "../Components/SearchBar";
import ReviewRating from "../Components/Reviews/ReviewRating";
import UploadWidget from "../Components/UploadWidget";
import UserContext from "../Components/Auth/UserContext";
import BrewSearchBar from "../Components/BrewSearchBar";
import "../Styles/NewBeer.css";
import apiHandler from "../API/apiHandler";
// import apiHandler from '../API/apiHandler'

export class NewBeer extends Component {
  static contextType = UserContext;

  state = {
    showSearch: false,
    showForm: false,
    selectedBeer: null,
    rating: null,
    name: "",
    description: "",
    abv: null,
    breweryname: "",
    breweryid: null,
    releasedate: null,
  };

  imageRef = React.createRef();

  handleChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({ [name]: value });
  };

  handleFormClick = () => {
    this.setState({ showForm: !this.state.showForm });
  };

  handleSearchClick = () => {
    this.setState({ showSearch: !this.state.showSearch });
    if (this.state.showForm) this.setState({ showForm: false });
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
      .CreateBeer(fd)
      .then((data) => {
        //log success

        console.log("success", data);

        //add beer to the user list

        apiHandler
          .addUserBeer(data._id)
          .then((response) => {
            console.log("success", response);
          })
          .catch((err) => {
            console.log(err);
          });

        // reset state

        this.setState({
          rating: null,
          name: "",
          description: "",
          abv: 0,
          breweryname: "",
          breweryid: null,
          releasedate: 2021,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleFileSelect = (temporaryURL) => {
    // Get the temporaryURL from the UploadWidget component and
    // set the state so we can have a visual feedback on what the image will look like :)
    this.setState({ tmpUrl: temporaryURL });
  };

  handleBeerSelect = (beer) => {
    this.setState({
      selectedBeer: beer,
      showSearch: false,
      showForm: false
    });

    apiHandler
    .addUserBeer(beer._id)
    .then(response => {
        console.log("success", response);
    })
    .catch(err => {
        console.log(err);
    })




  };

  handleBrewerySelect = (brewery) => {
    this.setState({
      breweryname: brewery.name,
      breweryid: brewery._id,
    });
  };

  handleAddStars = (rating) => {
    this.setState({ rating: rating });
  };

  render() {
    console.log(this.state);

    return (
      <div className="newbeer__main">
        <div className="newbeer__link flex-center">
          <h2 className="canned thin flex-center" onClick={this.handleSearchClick}>
            {!this.state.showSearch ? "+" : "-"} Add Beer
          </h2>
        </div>

        <div>
          {this.state.showSearch && (
            <div className="newbeer__search flex-center">
              <SearchBar onSelect={this.handleBeerSelect} />
              <h5 className="thin" onClick={this.handleFormClick}>
                {!this.state.showForm ? "+" : "-"} can't find it? Let's add it
                to the Canniverse
              </h5>
            </div>
          )}
        </div>
        {this.state.showForm && (
          <div className="beer__form-main">

          
          <form
            className="beer__form"
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
            <textarea
              className="beer__description"
              onChange={this.handleChange}
              value={this.state.description}
              type="text"
              name="description"
              id="description"
            ></textarea>

      
              <label className="form__label" htmlFor="abv">
                ABV
              </label>
              <input
                className="form__input"
                onChange={this.handleChange}
                value={this.state.abv}
                type="number"
                name="abv"
                id="abv"
              />

              <label className="form__label" htmlFor="year">
                Release date
              </label>
              <input
                className="form__input"
                onChange={this.handleChange}
                value={this.state.releasedate}
                type="number"
                name="releasedate"
                id="releasedate"
              />

            <label className="form__label" htmlFor="rating">
                Star rating
            </label>
            <ReviewRating setRate={this.handleAddStars} />
            
            <label className="form__label" htmlFor="address">
                Brewery search
            </label>
            <div className="beer__form-search flex-center">
        
            <BrewSearchBar onSelect={this.handleBrewerySelect} />
            </div>

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
                  <img className="upload__image"  src={this.state.tmpUrl} alt="beer" />
                )}
              </div>
            </div>

            <button className="btn-submit">ADD</button>
          </form>
          </div>
        )}
      </div>
    );
  }
}

export default NewBeer;
