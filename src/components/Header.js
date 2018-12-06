import React, { Component } from "react";
import { connect } from "react-redux";
import { userLoggedOut } from "../redux/reducer";
import axios from "axios";
import { Link } from "react-router-dom";
import { Navbar, Nav, NavItem, MenuItem, NavDropdown } from "react-bootstrap";
import "./Header.css";

class Header extends Component {
  logout = () => {
    axios.get("/auth/logout").then(response => {
      this.props.userLoggedOut();
    });
  };

  render() {
    return (
      <div
        className="nav-bar"
        // style={{
        //   display: "flex",
        //   justifyContent: "space-between",
        //   alignItems: "center",
        //   borderBottom: "1px solid black",
        //   height: "90px",
        //   padding: "40px"
        // }}
      >
        <Navbar inverse collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#Profile">
                <img src="../assets/fortnitelogo.png" />
              </a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <NavItem eventKey={1} href="#AllVideos">
                AllVideos
              </NavItem>
              <NavItem
                eventKey={2}
                href="https://www.epicgames.com/fortnite/en-US/battle-pass/season-6"
              >
                EpicGames
              </NavItem>
              <NavDropdown
                eventKey={3}
                title="Dropdown"
                id="basic-nav-dropdown"
              >
                <MenuItem eventKey={3.1}>Action</MenuItem>
                <MenuItem eventKey={3.2}>Another action</MenuItem>
                <MenuItem eventKey={3.3}>Something else here</MenuItem>
                <MenuItem divider />
                <MenuItem eventKey={3.3}>Separated link</MenuItem>
              </NavDropdown>
            </Nav>
            <Nav pullRight>
              <NavItem eventKey={1} href="#register">
                Register
              </NavItem>
              {this.props.isAuthenticated ? (
                <NavItem onClick={this.logout}>Logout</NavItem>
              ) : (
                <NavItem>
                  <Link to="/login">login</Link>
                </NavItem>
              )}
              {/* <NavItem eventKey={2} href="#login">
                Login
              </NavItem> */}
            </Nav>
          </Navbar.Collapse>
          {/* <div id="logo">
            <Link to="/Profile">KillShot</Link>
          </div>
          <button>
            <Link to="/allvideos">ALL VIDEOS</Link>
          </button> */}
        </Navbar>
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
