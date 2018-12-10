import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
// import { Grid, Col } from "react-bootstrap";
import "./Register.css";

import { userLoggedIn } from "../redux/reducer";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      gamertag: "",
      email: "",
      password: "",
      confirmPassword: "",
      error: "",
      loading: false
    };
  }

  handleAudio = e => {
    console.log("audio working almost?");
    var audio = new Audio("assets/sd-sfx.wav");
    audio.play();
  };
  anotherFunction = e => {
    this.handleAudio();
    this.handleClick();
  };

  handleChange = e => {
    let { name, value } = e.target;

    this.setState({
      [name]: value
    });
  };

  handleKeyPress = event => {
    if (event.key === "Enter") {
      this.handleClick();
    }
  };

  handleErrorClick = () => {
    this.setState({
      error: ""
    });
  };

  handleClick = e => {
    this.setState({
      loading: true
    });
    // e.preventDefault();
    axios
      .post("/auth/register", this.state)
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
      <div className="content">
        {this.state.errorMessage ? (
          <div className="error-message-div error-message">
            <p>{this.state.errorMessage}</p>
            <button onClick={this.handleErrorClick} className="error-button">
              X
            </button>
          </div>
        ) : (
          <div />
        )}
        <div className="register-page">
          {/* <form className="register-form"> */}
          <h2 className="form-header">Register</h2>
          <div className="form-control">
            <h3 className="input-header">Username</h3>
            <input
              className="input-form"
              type="text"
              name="gamertag"
              placeholder="gamertag"
              value={this.state.gamertag}
              onKeyPress={this.handleKeyPress}
              onChange={this.handleChange}
            />
          </div>

          <div className="form-control">
            <h3 className="input-header">Email</h3>
            <input
              className="input-form"
              // type="text"
              name="email"
              placeholder="email"
              value={this.state.email}
              onChange={this.handleChange}
              onKeyPress={this.handleKeyPress}
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
              onKeyPress={this.handleKeyPress}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-control">
            <h3 className="input-header">Confirm password</h3>
            <input
              name="confirmPassword"
              placeholder="confirm password"
              value={this.state.confirmPassword}
              onKeyPress={this.handleKeyPress}
              onChange={this.handleChange}
              className="input-form"
              type="password"
            />
          </div>
          {/* <button
              className="register-button"
              class="btn btn-primary"
              onClick={this.handleClick}
            >
              submit
            </button>
            {this.state.error} */}

          {this.state.loading ? (
            <p className="saving">
              <span>.</span>
              <span>.</span>
              <span>.</span>
            </p>
          ) : (
            <div>
              <button onClick={this.anotherFunction} className="register-btn">
                Submit
              </button>
            </div>
          )}

          <p style={{ marginTop: 20 }}>
            Already have an account? <Link to="/login">Log in here...</Link>
          </p>
        </div>
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
)(Register);
