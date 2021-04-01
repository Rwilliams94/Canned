import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import UserContext from "../../Auth/UserContext";
import apiHandler from "../../../API/apiHandler";
import '../../../Styles/Auth.css'
// import "../../styles/form.css";

class Signin extends Component {
  static contextType = UserContext;

  state = {
    email: "",
    password: "",
  };

  handleChange = (event) => {
    const value = event.target.value;
    const key = event.target.name;
    this.setState({ [key]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    apiHandler
      .signin(this.state)
      .then((data) => {
        this.context.setUser(data); // update the context
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    if (this.context.isLoggedIn) {
      console.log("already signed in");
      return <Redirect to="/" />;
    }

    return (
      <section className="auth__form-section">
        <header className="flex-center auth__header">
          <h1>
            Welcome back Can Fan
          </h1>
        </header>

        <form autoComplete="off" className=" flex-center auth__form" onSubmit={this.handleSubmit}>


          <div className="auth__form-group">
            <input
              onChange={this.handleChange}
              value={this.state.email}
              className="auth__input"
              id="email"
              type="email"
              name="email"
              placeholder="Email Address"
            />
          </div>

          <div className="auth__form-group">
            <input
              onChange={this.handleChange}
              value={this.state.password}
              className="auth__input"
              id="password"
              type="password"
              name="password"
              placeholder="Password"
            />
          </div>

          <button className="auth__btn">
            <h2>Sign in</h2>
          </button>
        </form>
      </section>
    );
  }
}

export default Signin;