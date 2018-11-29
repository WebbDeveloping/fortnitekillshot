import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Grid, Col } from "react-bootstrap";

import { userLoggedIn } from "../redux/reducer";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      gamertag: "",
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
      <div>
        <form>
          {/* <Col xs={12} sm={8} smOffset={2}> */}
          <h1>Registration</h1>
          <div class="form-control">
            <input
              class="form-control"
              type="text"
              name="gamertag"
              placeholder="gamertag"
              value={this.state.gamertag}
              onChange={this.handleChange}
            />
          </div>
          <div class="form-control">
            <input
              class="form-control"
              type="text"
              name="email"
              placeholder="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </div>
          <div class="form-control">
            <input
              class="form-control"
              type="text"
              name="password"
              placeholder="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </div>
          <button class="btn btn-primary" onClick={this.handleClick}>
            submit
          </button>
          {this.state.error}
          {/* </Col> */}
        </form>
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
