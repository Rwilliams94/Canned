import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import UserContext from "../../Auth/UserContext";
import apiHandler from "../../../API/apiHandler";
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
      <section className="form-section">
        <header className="header">
          <h1>
            Welcome back Can Fan
          </h1>
        </header>

        <form autoComplete="off" className="form" onSubmit={this.handleSubmit}>
          <h2>Login</h2>

          <div className="form-group">
            <input
              onChange={this.handleChange}
              value={this.state.email}
              className="input"
              id="email"
              type="email"
              name="email"
              placeholder="Email Address"
            />
          </div>

          <div className="form-group">
            <input
              onChange={this.handleChange}
              value={this.state.password}
              className="input"
              id="password"
              type="password"
              name="password"
              placeholder="Password"
            />
          </div>

          <button className="btn-submit">Let's go!</button>
        </form>

        <div className="form-section link">
          <p>Not yet a fan of the can? </p>
          <Link to="/signup">Register</Link>
        </div>
      </section>
    );
  }
}

export default Signin;