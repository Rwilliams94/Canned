import React, { Component } from "react";
// import Button from "../Button";
import UploadWidget from "../UploadWidget";
import FeedBack from "../FeedBack";
import apiHandler from "../../API/apiHandler";
import UserContext from "../Auth/UserContext";
// import "../../styles/form.css";

class FormProfile extends Component {
  static contextType = UserContext;
  state = {
    user: null,
    tmpUrl: "",
    httpResponse: null,
    isLoading: true,
  };

  imageRef = React.createRef();

  componentDidMount() {
    apiHandler
      .getUser()
      .then((data) => {
        this.setState({ user: data, isLoading: false });
      })
      .catch((error) => {
        this.setState({
          isLoading: false,
          httpResponse: {
            status: "failure",
            message: "Something bad happened, please try again later",
          },
        });
      });
  }

  handleChange = (event) => {
    const key = event.target.name;
    const value = event.target.value;
    this.setState({ user: { ...this.state.user, [key]: value } });
  };

  isValidInput = (key) => {
    if (this.state.user[key] === "") {
      return false;
    } else return true;
  };

  checkError = () => {
    for (const key in this.state.user) {
      if (this.state[key] === "") {
        return true;
      }
    }
    return false;
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const fd = new FormData();

    for (const key in this.state.user) {
      if (key === "profileImg") continue;
      fd.append(key, this.state.user[key]);
    }

    if (this.imageRef.current.files[0]) {
      fd.append("profileImg", this.imageRef.current.files[0]);
    }

    apiHandler
      .editUser(fd)
      .then((data) => {
        this.context.setUser(data);
        this.setState({
          httpResponse: {
            status: "success",
            message: "Profile successfully updated.",
          },
        });

        this.timeoutId = setTimeout(() => {
          this.setState({ httpResponse: null });
        }, 2000);
      })
      .catch((error) => {
        this.setState({
          httpResponse: {
            status: "failure",
            message:
              "Something bad happened while updating your profile, try again later",
          },
        });

        this.timeoutId = setTimeout(() => {
          this.setState({ httpResponse: null });
        }, 2000);
      });
  };

  handleFileSelect = (temporaryURL) => {
    this.setState({ tmpUrl: temporaryURL });
  };

  render() {
    const { httpResponse } = this.state;

    if (this.state.isLoading) return <div>Loading...</div>;

    return (
      <section className="form-section">
        <form autoComplete="off" className="form" onSubmit={this.handleSubmit}>
          <h1 className="header">Edit your profile</h1>

          <div className="round-image user-image">
            <img
              src={this.state.tmpUrl || this.state.user.profileImg}
              alt={this.state.user.userName}
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

          <div className="form-group">
            <input
              className="input"
              id="firstName"
              type="text"
              name="firstName"
              onChange={this.handleChange}
              value={this.state.user.userName}
            />
            {!this.isValidInput("userName") && (
              <p className="input-error">Invalid input</p>
            )}
          </div>

          <div className="form-group">
         
            <input
              className="input"
              id="email"
              type="email"
              name="email"
              value={this.state.user.email}
              disabled
            />
          </div>

          <div className="form-group">
           
            <input
              className="input"
              id="city"
              type="text"
              name="city"
              onChange={this.handleChange}
              value={this.state.user.city}
            />
            {!this.isValidInput("city") && (
              <p className="input-error">Invalid input</p>
            )}
          </div>
          <Button primary disabled={this.checkError()}>
            Save
          </Button>
        </form>
      </section>
    );
  }
}

export default FormProfile;