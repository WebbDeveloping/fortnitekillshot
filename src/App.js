import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import { connect } from "react-redux";
import { userLoggedIn } from "./redux/reducer";
import { HashRouter } from "react-router-dom";
import { Button } from "react-bootstrap";

import { Route, Switch } from "react-router-dom";
import AllVideos from "./components/AllVideos";
import Video from "./components/Video";

import Login from "./components/Login";
import Register from "./components/Register";
import Header from "./components/Header";
import Profile from "./components/Profile";
import UserProfile from "./components/UserProfile";
import ViewUserProfile from "./components/ViewUserProfile";

class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false
    };
  }

  componentDidMount() {
    axios.get("/auth/currentUser").then(response => {
      if (response.data) {
        this.props.userLoggedIn(response.data);
      }

      this.setState({
        isLoading: false
      });
    });
  }
  render() {
    return this.state.isLoading ? (
      <div />
    ) : (
      <HashRouter>
        <div>
          <Header />

          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route exact path="/" component={Register} />
            <Route path="/Profile" component={Profile} />
            <Route path="/video/:id" component={Video} />
            <Route path="/user" component={UserProfile} />
            <Route path="/ViewUser" component={ViewUserProfile} />

            <Route path="/AllVideos" component={AllVideos} />
          </Switch>
        </div>
      </HashRouter>
    );
  }
}

export default connect(
  null,
  { userLoggedIn }
)(App);
