import React, { Component } from "react";
import { withRouter } from "react-router-dom";
// import Button from "../Button";
import Button from '../Button'
import UploadWidget from "../UploadWidget";
import FeedBack from "../FeedBack";
import apiHandler from "../../API/apiHandler";
import UserContext from "../Auth/UserContext";
import BrewSearchBar from "../BrewSearchBar";
import ReviewRating from "../Reviews/ReviewRating";
import { buildFormData } from "../../utils";
// import "../../styles/form.css";

class UpdateBeer extends Component {
  static contextType = UserContext 

  state = {
    httpResponse: null,
  };

  imageRef = React.createRef();
  formRef = React.createRef();

  componentDidMount() {
    this.setState({
      beer: this.props.beer,
      isLoading: false
    })
  }

  handleChange = (event) => {
    const value =
      event.target.type === "file" ? event.target.files[0] : event.target.value;
    const key = event.target.name;
    this.setState({ [key]: value });
  };



  handleSubmit = (event) => {
    event.preventDefault();
    
      
    const fd = new FormData();

    const { httpRespons, ... data } = this.state;
    
    buildFormData(fd, data)

    apiHandler
      .editBeer(this.props.beer._id, fd)
      .then((data) => {
        
        this.setState({
          httpResponse: {
            status: "success",
            message: "beer successfully updated.",
          },
        });

        
        this.timeoutId = setTimeout(() => {
          this.setState({ httpResponse: null });
        }, 2000);

        
        this.props.handleChange(data)
        this.props.handleClose()

      })
      .catch((error) => {
        this.setState({
          httpResponse: {
            status: "failure",
            message:
              "Something bad happened while updating your beer, try again later",
          },
        });

        this.timeoutId = setTimeout(() => {
          this.setState({ httpResponse: null });
        }, 2000);
      });
  };

  // select image

  handleFileSelect = (tempURL, file) => {
    this.setState({ image: file });
  };

 // select brewery
  
  handleBrewerySelect = (brewery) => {
    this.setState({
      breweryname: brewery.name, 
      breweryid: brewery._id 
    });
  };

// select stars 

handleAddStars = (rating) => {
  this.setState({
      rating: rating
    });
};

handleDeleteBeer = (beerId) => {
  apiHandler
  .deleteBeer(beerId)
  .then(response => {
    console.log("success", response);
    this.props.history.push("/beer")
  })
  .catch(err => {console.log(err)})
  
}

  render() {
    console.log(this.props);

    const { httpResponse } = this.state;

    const {
      name,
      description,
      abv,
      breweryname,
      releasedate,
      breweryid,
      rating,
      date,
      _id,

    } = this.props.beer;

   

    return (
      <section className="updatebeer__form-main">
        <form autoComplete="off" className="beer__form" onSubmit={this.handleSubmit}>
          <h3 className="header">Edit this can <span onClick={this.props.handleClose}>X</span></h3>

          <div className="flex-center">
            <img
            className="upload__image"
              src={this.state.tmpUrl || this.props.beer.image}
              alt={name}
            />
          </div>
          <div className="newbeer__image-output">
            <UploadWidget
              // ref={this.imageRef}
              onFileSelect={this.handleFileSelect}
              name="image"
            >
              Change image
            </UploadWidget>
          </div>

          {httpResponse && (
            <FeedBack
              message={httpResponse.message}
              status={httpResponse.status}
            />
          )}

          <div className="form-group">
            <input
              className="form__input"
              id="name"
              type="text"
              name="name"
              onChange={this.handleChange}
              defaultValue={name}
            />
          </div>

          <div className="form-group">
         
            <textarea
              className="beer__description"
              id="description"
              type="text"
              name="description"
              defaultValue={description}
            ></textarea>
          </div>

          <label className="form__label" htmlFor="rating">
                Star rating
            </label>
            <ReviewRating setRate={this.handleAddStars} />
        


            <h2 className="form__label">Current brewery: {breweryname}</h2>
            <BrewSearchBar onSelect={this.handleBrewerySelect} />


            <label className="form__label" htmlFor="abv">
                ABV
              </label>
            <input
                  className="form__input"
                  onChange={this.handleChange}
                  defaultValue={abv}
                  type="number"
                  name="abv"
                  id="abv"
                />
         
         <label className="form__label" htmlFor="year">
                Release date
              </label>
           
            <input
              className="form__input"
              id="releasedate"
              type="number"
              name="releasedate"
              onChange={this.handleChange}
              defaultValue={releasedate}
            />
         
          <Button primary className="btn-submit">
            Save
          </Button>
        </form>

        <h3 className="settings">Or, if you're sure... <b onClick={() => this.handleDeleteBeer(_id)}>delete</b> this beer</h3>
      </section>
    );
  }
}

export default withRouter(UpdateBeer);