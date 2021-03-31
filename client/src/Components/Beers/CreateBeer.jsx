  
import React, { Component } from "react";
import { Link, Redirect, withRouter } from "react-router-dom";
import UserContext from "../Auth/UserContext";
import apiHandler from "../../API/apiHandler";
// import "../../styles/form.css";

class CreateBeer extends Component {
  static contextType = UserContext;
  state = {};

  handleChange = (event) => {
    const value = event.target.value;
    const key = event.target.name;
    this.setState({ [key]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    apiHandler
      .CreateBeer(this.state)
      .then((data) => {
        console.log(data)
        return <Redirect to="/" />;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
 
    return (
      <section className="form-section">
        <header className="header">
          <h1>
            Add a New Brew!
          </h1>
        </header>

        <form
          autoComplete="off"
          className="form"
          onSubmit={this.handleSubmit}
        >

          <div className="form-group text">
            <input
              className="input"
              id="name"
              type="text"
              name="name"
              placeholder="Name"
            />
          </div>

          <div className="form-group">
            <UploadWidget
              ref={this.imageRef}
              onFileSelect={this.handleFileSelect}
              name="profileImg"
            >
              Change profile image
            </UploadWidget>
          </div>

          {httpResponse && (
            <FeedBack
              message={httpResponse.message}
              status={httpResponse.status}
            />
          )}

          <div className="form-group description">
         
            <input 
              className="input" 
              id="description" 
              type="text" 
              name="description" 
              placeholder="Description"
            />
          </div>

          <div className="form-group number">

          <label className="label" htmlFor="abv">
              ABV.
            </label>
          

            <input
              className="input"
              id="abv"
              type="number"
              name="abv"
              placeholder="abv"
            />
          </div>

          
          <div className="form-group text">

            <input
              className="input"
              id="breweryId"
              type="text"
              name="breweryId"
              placeholder="Brewery"
            />
          </div>

          <div className="form-group text">

            <label className="label" htmlFor="releaseDate">
              Release Date
            </label>
          

            <input
            className="input"
            id="releaseDate"
            type="date"
            name="releaseDate"
            
            />

          </div>



          <button className="btn-submit">Let's go!</button>
        </form>

        <div className="form-section link">
          <p>Already a Can Fan? What are you doing here?</p>
          <Link to="/signin">Log in</Link>
        </div>
      </section>
    );
  }
}

export default withRouter(CreateBeer);