import React, { Component } from "react";
import Data from "../PassData/Data";
import { Redirect } from "react-router";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: "",
    };
  }

  handleChangeEmail = (event) => {
    this.setState({ email: event.target.value });
  };

  handleChangePassword = (event) => {
    this.setState({ password: event.target.value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    const user = {
      email: this.state.email,
      password: this.state.password,
    };
    Data.Login(user.email, user.password).then((res) => {
      if (res.status === 400) {
        this.setState({ error: res.data });
      } else {
        window.location.reload();
      }
    });
  };

  render() {
    if (Data.GetUser()) {
      return <Redirect to="/" />;
    }
    return (
      //login form
      <div class="container text-center mt-5 col-4 p-3 backcolorform">
        <form class="card-body">
          <div class="form-group">
            <label class="pb-2">Email :</label>
            <input
              type="email"
              class="form-control"
              placeholder="Enter Email"
              onChange={this.handleChangeEmail}
            ></input>
          </div>
          <div class="form-group">
            <label class="p-2">Mot de passe :</label>
            <input
              type="password"
              class="form-control"
              placeholder="Password"
              onChange={this.handleChangePassword}
            ></input>
          </div>
          <button
            type="button"
            class="btn button mt-3"
            onClick={this.handleSubmit}
          >
            Se connecter
          </button>
        </form>
        {this.state.error && (
          <h5 class="alert alert-info" role="alert">
            {" "}
            {this.state.error}{" "}
          </h5>
        )}
      </div>
    );
  }
}

export default Login;
