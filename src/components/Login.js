import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

//dont forget to go to redux/reducer page and fill that shit out.
import { userLoggedIn } from "../redux/reducer";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      error: ""
    };
  }

  handleChange = e => {
    let { name, value } = e.target;

    this.setState({
      [name]: value
    });
  };

  handleClick = () => {
    console.log("something");
    axios
      .post("/auth/login", this.state)
      .then(response => {
        let user = response.data;
        this.props.userLoggedIn(user);
      })
      .catch(err => {
        console.log(err.response);
        this.setState({
          error: err.response.data
        });
      });
  };

  render() {
    return this.props.isAuthenticated ? (
      <Redirect to="/Profile" />
    ) : (
      <div>
        <h1>Login</h1>
        <input
          type="text"
          name="email"
          placeholder="email"
          value={this.state.email}
          onChange={this.handleChange}
        />
        <input
          type="text"
          name="password"
          placeholder="password"
          value={this.state.password}
          onChange={this.handleChange}
        />
        <button onClick={this.handleClick}>Submit</button>
        {this.state.error}
      </div>
    );
  }
}

function mapStateToProps(state) {
  let { isAuthenticated } = state;
  return {
    isAuthenticated
  };
}

export default connect(
  mapStateToProps,
  { userLoggedIn }
)(Login);