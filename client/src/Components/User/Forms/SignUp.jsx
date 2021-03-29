  
import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import UserContext from "../../Auth/UserContext";
import apiHandler from "../../../API/apiHandler";
// import "../../styles/form.css";

class Signup extends Component {
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
      .signup(this.state)
      .then((data) => {
        this.context.setUser(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    if (this.context.isLoggedIn) {
      return <Redirect to="/" />;
    }

    return (
      <section className="form-section">
        <header className="header">
          <h1>
            Welcome to Canned!
          </h1>
        </header>

        <form
          autoComplete="off"
          className="form"
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
        >
          <h2>Let's get you involved</h2>

          <div className="form-group">
            <input
              className="input"
              id="userName"
              type="text"
              name="userName"
              placeholder="User Name"
            />
          </div>

          <div className="form-group">
         
            <input 
              className="input" 
              id="email" 
              type="email" 
              name="email" 
              placeholder="Email Address"
            />
          </div>

          <div className="form-group">

            <input
              className="input"
              id="password"
              type="password"
              name="password"
              placeholder="Email Address"
            />
          </div>

          
          <div className="form-group">

            <input
              className="input"
              id="city"
              type="text"
              name="city"
              placeholder="Home City"
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

export default Signup;