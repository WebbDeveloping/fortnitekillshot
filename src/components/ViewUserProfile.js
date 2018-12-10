import React, { Component } from "react";
import { Route } from "react-router-dom";
import axios from "axios";
import { setVideos } from "../redux/reducer";
import VideoForm from "../components/VideoForm";
import CustomVideoForm from "../components/CustomVideoForm";
import Videos from "../components/Videos";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import ReactPlayer from "react-player";
import { getUserVideo } from "../redux/reducer";
import Stars from "../components/Stars";
import "./ViewUserProfile.css";

class ViewUserProfile extends Component {
  componentDidMount() {
    console.log(777333, this.props);
    axios.get(`/api/videos`).then(response => {
      this.props.getUserVideo(response.data);
      // console.log(99997788, response.data);
      // console.log("getUserVideo", response.data);
    });
  }
  render() {
    // return this.props.isAuthenticated ? (
    console.log(666999, this.props);
    return (
      <div className="view-user-profile-page">
        {/* <div className="view-user-top-part"> */}
        <div className="view-user-gtag">
          <h2> {this.props.author}</h2>
        </div>
        <div className="view-user-image">
          <img src="assets/noSKin.jpg" className="profile-pic" />
        </div>
        <div className="view-user-social-links">
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

        {/* </div> */}
        <div className="star-rating">
          <Stars />
        </div>
        <div className="videos-component">
          {/* <Videos /> */}
          {/* <div className="all-video-player-wrapper"> */}
          <ReactPlayer
            className="all-video-react-player"
            url={this.props.userVideo}
            // width="50%"
            // height="50%"
            playing
            loop={true}
            volume={0}
            muted={true}
            controls={true}
          />
          {/* </div> */}
        </div>
      </div>
    );
    // ) : (
    //   <Redirect to="/login" />
    // );
  }
}

function mapStateToProps(state) {
  console.log(4411, state);
  let { userVideo, videos, isAuthenticated, user } = state;
  return {
    userVideo,
    videos,
    isAuthenticated,
    user
  };
}

export default connect(
  mapStateToProps,
  { getUserVideo }
)(ViewUserProfile);
