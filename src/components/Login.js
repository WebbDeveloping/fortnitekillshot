import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Grid, Col } from "react-bootstrap";
import "./Login.css";

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
  anotherFunction = e => {
    this.handleAudio();
    this.handleClick();
  };

  handleAudio = e => {
    console.log("audio working almost?");
    var audio = new Audio("assets/sd-sfx.wav");
    audio.play();
  };

  handleChange = e => {
    let { name, value } = e.target;

    this.setState({
      [name]: value
    });
  };

  handleClick = () => {
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
      <div className="login-page">
        {/* <Grid> */}
        {/* <Col xs={12} sm={8} smOffset={2} className="login-table"> */}
        <h2 className="form-header">Login</h2>
        <div className="form-control">
          <h3 className="input-header">Email</h3>
          <input
            className="input-form"
            type="text"
            name="email"
            placeholder="email"
            value={this.state.email}
            onChange={this.handleChange}
          />
        </div>
        <div className="form-control">
          <h3 className="input-header">Password</h3>
          <input
            className="input-form"
            type="text"
            name="password"
            placeholder="password"
            value={this.state.password}
            onChange={this.handleChange}
          />
        </div>
        <button onClick={this.anotherFunction} className="register-btn">
          Submit
        </button>
        {this.state.error}
        {/* </Col> */}
        {/* </Grid> */}
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
