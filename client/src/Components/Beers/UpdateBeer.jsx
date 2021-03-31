import React, { Component } from "react";
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

  render() {

    const { httpResponse } = this.state;

    const {
      name,
      description,
      abv,
      breweryname,
      releasedate,
      breweryid,
      rating,
      date

    } = this.props.beer;

   

    return (
      <section className="form-section">
        <form autoComplete="off" className="form" onSubmit={this.handleSubmit}>
          <h1 className="header">Edit this can</h1>

          <div className="round-image widget-image">
            <img
              src={this.state.tmpUrl || this.props.beer.image}
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

          <div className="form-group">
            <input
              className="input"
              id="name"
              type="text"
              name="name"
              onChange={this.handleChange}
              defaultValue={name}
            />
          </div>

          <div className="form-group">
         
            <textarea
              className="input"
              id="description"
              type="text"
              name="description"
              defaultValue={description}
            ></textarea>
          </div>

          <div className="form-group">
            <ReviewRating setRate={this.handleAddStars} />
          </div>

          <div className="form-group">
            <h2>Current brewery: {breweryname}</h2>
            <BrewSearchBar onSelect={this.handleBrewerySelect} />
          </div>

          <div className="form-group">
            <input
                  className="form__input"
                  onChange={this.handleChange}
                  defaultValue={abv}
                  type="number"
                  name="abv"
                  id="abv"
                />
           </div>
          <div className="form-group">
           
            <input
              className="input"
              id="releasedate"
              type="number"
              name="releasedate"
              onChange={this.handleChange}
              defaultValue={releasedate}
            />
         
          </div>
          <Button primary>
            Save
          </Button>
        </form>
      </section>
    );
  }
}

export default UpdateBeer;