import React, { Component } from "react";
import { withRouter } from "react-router-dom";
// import Button from "../Button";
import Button from '../Button'
import UploadWidget from "../UploadWidget";
import FeedBack from "../FeedBack";
import apiHandler from "../../API/apiHandler";
import UserContext from "../Auth/UserContext";
import AddressSearch from "../AddressSearch";
import ReviewRating from "../Reviews/ReviewRating";
import { buildFormData } from "../../utils";
// import "../../styles/form.css";

class UpdateBrewery extends Component {
  static contextType = UserContext 

  state = {
    httpResponse: null,
  };

  imageRef = React.createRef();
  formRef = React.createRef();

  componentDidMount() {
    this.setState({
      brewery: this.props.brewery,
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
      .editBrewery(this.props.brewery._id, fd)
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

 handleAddressSelect = (location) => {

  this.setState({
      address: location.place_name,
      longitude: location.geometry.coordinates[0],
      latitude: location.geometry.coordinates[1],
  });
};
// select stars 

handleAddStars = (rating) => {
  this.setState({
      rating: rating
    });
};





  render() {


    const { httpResponse } = this.state;

    const {
      name,
      description,
      website,
      establisheddate,
      address,
 
    } = this.props.brewery;

   

    return (
      <section className="updatebeer__form-main">
        <form autoComplete="off" className="brewery__form" onSubmit={this.handleSubmit}>
          <h3 className="header">Edit this brewery <span onClick={this.props.handleClose}>X</span></h3>

          <div className="flex-center">
            <img
              className="upload__image"
              src={this.state.tmpUrl || this.props.brewery.image}
              alt={name}
            />
          </div>
          <div className="form-group-uploadwidget">
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
          <label className="form__label" htmlFor="name">
              Name
            </label>
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

          <label className="form__label" htmlFor="description">
              Description
            </label>
          <div className="form-group">
         
            <textarea
              className="brewery__description"
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
          

        
            <h2 className="form__label">Current brewery address: {address}</h2>
            <AddressSearch onSelect={this.handleAddressSelect} />
         

            <label className="form__label" htmlFor="name">
              Website
            </label>
            <input
                  className="form__input"
                  onChange={this.handleChange}
                  defaultValue={website}
                  type="text"
                  name="website"
                  id="website"
                />
         
            
            <label className="form__label" htmlFor="year">
                Brewery established in
              </label>
            <input
              className="form__input-small"
              id="establisheddate"
              type="number"
              name="establisheddate"
              onChange={this.handleChange}
              defaultValue={establisheddate}
            />
         
          
          <Button  className="btn-submit" primary>
            Save
          </Button>
        </form>

       
      </section>
    );
  }
}

export default withRouter(UpdateBrewery);