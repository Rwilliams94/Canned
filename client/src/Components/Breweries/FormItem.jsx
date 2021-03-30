import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import LocationAutoComplete from "../LocationAutoComplete";
import "../../styles/form.css";
import api from '../../API/apiHandler'

class ItemForm extends Component {
  state = {};

 
  handleChange = (event) => {
    const value =
      event.target.type === "file" ? event.target.files[0] : event.target.value;

    const key = event.target.name;

    this.setState({ [key]: value });
    console.log(this.state);
  };

  handleImage = (event) => {
    const file = event.target.files[0];
    console.log(file);
    this.setState({image: file})
    console.log(this.state);
  }


  handleSubmit = (event) => {
    event.preventDefault();

    function buildFormData(formData, data, parentKey) {
      if (data && typeof data === 'object' && !(data instanceof Date) && !(data instanceof File)) {
        Object.keys(data).forEach(key => {
          buildFormData(formData, data[key], parentKey ? `${parentKey}[${key}]` : key);
        });
      } else {
        const value = data == null ? '' : data;
        formData.append(parentKey, value);
      }
    }
    
    function jsonToFormData(data) {
      const formData = new FormData();
      
      buildFormData(formData, data);
      
      return formData;
    }

    // formData.append("name", this.state.name)
    // formData.append("image", this.state.image)
    // formData.append("category", this.state.category)
    // formData.append("quantity", this.state.quantity)
    // formData.append("address", this.state.address)
    // formData.append("location", this.state.location)
    // formData.append("formattedAddress", this.state.formattedAddress)
    // formData.append("id_user", )

    const formData = jsonToFormData(this.state)
   
    for (var pair of formData.entries()) {
      console.log(pair[0]+ ', ' + pair[1]); 
    }

    api
      .CreateItem(formData)
      .then((response) => {
        this.props.history.push("/");
  
      })
      .catch((error) => {
        console.log(error);
       
      });

      this.setState({
      
      })


    // In order to send back the data to the client, since there is an input type file you have to send the
    // data as formdata.
    // The object that you'll be sending will maybe be a nested object, in order to handle nested objects in our form data
    // Check out the stackoverflow solution below : )

    // Nested object into formData by user Vladimir "Vladi vlad" Novopashin @stackoverflow : ) => https://stackoverflow.com/a/42483509
  };

  handlePlace = (place) => {
    // This handle is passed as a callback to the autocomplete component.
    // Take a look at the data and see what you can get from it.
    // Look at the item model to know what you should retrieve and set as state.
    this.setState({
      location: place.geometry,
      address: place.place_name,
      formattedAddress: place.place_name,
    })
    console.log(place);
  };

  render() {
    return (
      <div className="ItemForm-container">
        <form className="form" onSubmit={this.handleSubmit}>
          <h2 className="title">Add Item</h2>

          <div className="form-group">
            <label className="label" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              className="input"
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
              placeholder="What are you giving away ?"
            />
          </div>

          <div className="form-group">
            <label className="label" htmlFor="category">
              Category
            </label>

            <select id="category" defaultValue="-1" name="category" value={this.state.category} onChange={this.handleChange}>
              <option value="-1" disabled>
                Select a category
              </option>
              <option value="Plant">Plant</option>
              <option value="Kombucha">Kombucha</option>
              <option value="Vinegar">Vinegar</option>
              <option value="Kefir">Kefir</option>
            </select>
          </div>

          <div className="form-group">
            <label className="label" htmlFor="quantity">
              Quantity
            </label>
            <input className="input" id="quantity" name="quantity" value={this.state.quantity} type="number" onChange={this.handleChange}/>
          </div>

          <div className="form-group">
            <label className="label" htmlFor="location">
              Address
            </label>
            <LocationAutoComplete onSelect={this.handlePlace} />
          </div>

          <div className="form-group">
            <label className="label" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              className="text-area"
              value={this.state.description}
              placeholder="Tell us something about this item"
              onChange={this.handleChange}
            ></textarea>
          </div>

          <div className="form-group">
            <label className="custom-upload label" htmlFor="image">
              Upload image
            </label>
            <input className="input" name="image" id="image" type="file" onChange={this.handleImage}/>
          </div>

          <h2>Contact information</h2>

          <div className="form-group">
            <label className="label" htmlFor="contact">
              How do you want to be reached?
            </label>
            <div>
              <input type="radio" />
              user email
            </div>
            <input type="radio" />
            contact phone number
          </div>

          <p className="message">
            <img src="/media/info.svg" alt="info" />
            Want to be contacted by phone? Add your phone number in your
            personal page.
          </p>

          <button className="btn-submit">Add Item</button>
        </form>
      </div>
    );
  }
}

export default withRouter(ItemForm);
