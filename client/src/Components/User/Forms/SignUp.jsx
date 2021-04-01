  
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
      <section className="auth__form-section">
        <header className="flex-center auth__header">
          <h1>
            Welcome to Canned!
          </h1>
        </header>

        <form
          autoComplete="off"
          className="flex-center auth__form"
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
        >


          <div className="auth__form-group">
            <input
              className="auth__input"
              id="userName"
              type="text"
              name="userName"
              placeholder="User Name"
            />
          </div>

          <div className="auth__form-group">
         
            <input 
              className="auth__input" 
              id="email" 
              type="email" 
              name="email" 
              placeholder="Email Address"
            />
          </div>

          <div className="auth__form-group">

            <input
              className="auth__input"
              id="password"
              type="password"
              name="password"
              placeholder="Password"
            />
          </div>

          
          <div className="auth__form-group">

            <input
              className="auth__input"
              id="city"
              type="text"
              name="city"
              placeholder="Home City"
            />
          </div>

          <button className="auth__btn">
            <h2>Sign up</h2>
          </button>
        </form>
      </section>
    );
  }
}

export default Signup;