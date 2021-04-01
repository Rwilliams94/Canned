import React, { Component } from "react";
import Button from "../../Button";
import { withRouter } from "react-router-dom";
import UploadWidget from "../../UploadWidget";
import FeedBack from "../../FeedBack";
import apiHandler from "../../../API/apiHandler";
import UserContext from "../../Auth/UserContext";
// import "../../styles/form.css";

class UpdateUser extends Component {
  static contextType = UserContext;

  state = {
    userName: null,
    email: null,
    city: null,
    tmpUrl: "",
    httpResponse: null,
    isLoading: true,

  };

  imageRef = React.createRef();

  componentDidMount() {
    apiHandler
      .getUser()
      .then((data) => {
        this.setState({ 
          userName: data.userName, 
          email: data.email, 
          city: data.city, 
          isLoading: false 
        });
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
    this.setState({ [key]: value });
  };

  isValidInput = (key) => {
    if (this.state[key] === "") {
      return false;
    } else return true;
  };

  checkError = () => {
    for (const key in this.state) {
      if (this.state[key] === "") {
        return true;
      }
    }
    return false;
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const fd = new FormData();

    for (const key in this.state) {
      // if (key === "profileImg") continue;
      fd.append(key, this.state[key]);
    }

    // if (this.imageRef.current.files[0]) {
    //   fd.append("profileImg", this.imageRef.current.files[0]);
    // }

    apiHandler
      .editUser(fd)
      .then(() => {
        
        apiHandler.getUser()
        .then( user => {
            this.context.setUser(user)
        })

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

  handleDeleteUser = () => {
    apiHandler
    .deleteUser()
    .then(response => {
      console.log("success", response);
      this.props.history.push("/")
    })
    .catch(err => {console.log(err)})
    
  }
  // handleFileSelect = (temporaryURL) => {
  //   this.setState({ tmpUrl: temporaryURL });
  // };

  render() {
    const { httpResponse } = this.state;
    
    if (this.state.isLoading) return <div>Loading...</div>;
    console.log();

    return (
      <section className="form-section">
        <form autoComplete="off" className="form" onSubmit={this.handleSubmit}>
          <h1 className="header">Edit your profile <span onClick={this.props.handleClose}>X</span></h1>

          {httpResponse && (
            <FeedBack
              message={httpResponse.message}
              status={httpResponse.status}
            />
          )}

          <div className="form-group">
            <input
              className="form__input"
              id="userName"
              type="text"
              name="userName"
              onChange={this.handleChange}
              defaultValue={this.state.userName}
            />
            {!this.isValidInput("userName") && (
              <p className="input-error">Invalid input</p>
            )}
          </div>

          <div className="form-group">
         
            <input
              className="form__input"
              id="email"
              type="email"
              name="email"
              defaultValue={this.state.email}
            
            />
          </div>

          <div className="form-group">
           
            <input
              className="form__input"
              id="city"
              type="text"
              name="city"
              onChange={this.handleChange}
              defaultValue={this.state.city}
            />
            {!this.isValidInput("city") && (
              <p className="input-error">Invalid input</p>
            )}
          </div>
          <Button primary >
            Save
          </Button>
        </form>

        {/* <h3>Or, if you're sure... <b onClick={this.handleDeleteUser}>delete</b> this account</h3> */}
      </section>
    );
  }
}

export default withRouter(UpdateUser);