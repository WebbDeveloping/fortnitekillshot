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
      console.log(9898, this.props);
      this.props.getUserVideo(response.data);
      //console.log
      // console.log(123, this.props.user.id);
      console.log(666, response.data);
    });
  }
  render() {
    return this.props.isAuthenticated ? (
      <div className="profile-page">
        <div class="text-right">
          {/* how do i add margin to this bitch?? */}

          <h2 className="gtag">{this.props.user.gamertag}</h2>
          <img src="assets/galaxyskin.jpg" className="profile-pic" />
          <hr />
          <div className="social-links">
            <a class="btn btn-primary btn-xs" href="#profile" role="button">
              Facebook
            </a>
            <a class="btn btn-primary btn-xs" href="#profile" role="button">
              Instagram
            </a>
            <a class="btn btn-primary btn-xs" href="#profile" role="button">
              Twitch
            </a>
            <a class="btn btn-primary btn-xs" href="#profile" role="button">
              Twitter
            </a>
          </div>
        </div>
        <hr />

        <div className="video-form">
          {/* <VideoForm /> */}
          <CustomVideoForm />
        </div>
        <div className="videos-component">
          <Videos />
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
