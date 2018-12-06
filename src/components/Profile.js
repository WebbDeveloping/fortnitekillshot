import React, { Component } from "react";
import { Route } from "react-router-dom";
import axios from "axios";

import VideoForm from "../components/VideoForm";
import CustomVideoForm from "../components/CustomVideoForm";
import Videos from "../components/Videos";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { getUserVideo } from "../redux/reducer";
import "./Profile.css";

class Profile extends Component {
  componentDidMount() {
    //console.log
    //some how if i remove the ${} below it also gives me a server error finding current user???
    axios.get(`/api/videos/${this.props.user.id}`).then(response => {
      // console.log(9898, this.props);
      this.props.getUserVideo(response.data);
      //console.log
      // console.log(123, this.props.user.id);
      // console.log(666, response.data);
    });
  }
  render() {
    return this.props.isAuthenticated ? (
      <div className="profile-page">
        <div className="gt-and-pic">
          {/* how do i add margin to this bitch?? */}
          <div className="gtag">
            <h2>"Welcome {this.props.user.gamertag}"</h2>
          </div>
          <div className="social-links">
            <a
              className="facebook"
              class="btn btn-primary btn-xs"
              href="https://www.facebook.com/"
              role="button"
            >
              Facebook
            </a>

            <a
              className="instagram"
              class="btn btn-primary btn-xs"
              href="https://www.instagram.com"
              role="button"
            >
              Instagram
            </a>

            <a
              className="twitch"
              class="btn btn-primary btn-xs"
              href="https://www.twitch.tv/"
              role="button"
            >
              Twitch
            </a>
            <a
              className="twitter"
              class="btn btn-primary btn-xs"
              href="https://twitter.com/login?lang=en"
              role="button"
            >
              Twitter
            </a>
          </div>
          <img src="assets/galaxyskin.jpg" className="profile-pic" />
        </div>

        <div className="components">
          <div className="video-form">
            <CustomVideoForm />
          </div>
          <div className="videos-component">
            <hr />
            <Videos />
          </div>
        </div>
      </div>
    ) : (
      <Redirect to="/login" />
    );
  }
}

function mapStateToProps(state) {
  let { isAuthenticated, user } = state;
  return {
    isAuthenticated,
    user
  };
}

export default connect(
  mapStateToProps,
  { getUserVideo }
)(Profile);
