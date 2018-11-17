import React, { Component } from "react";
import { connect } from "react-redux";
import { userLoggedOut } from "../redux/reducer";
import axios from "axios";
import { Link } from "react-router-dom";

class Header extends Component {
  logout = () => {
    axios.get("/auth/logout").then(response => {
      this.props.userLoggedOut();
    });
  };

  render() {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid black",
          height: "90px",
          padding: "40px"
        }}
      >
        <div id="logo">
          <h1>KillShot</h1>
        </div>
        {this.props.isAuthenticated ? (
          <button onClick={this.logout}>Logout</button>
        ) : (
          <button>
            <Link to="/login">login</Link>
          </button>
        )}
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
  { userLoggedOut }
)(Header);
