import React, { Component } from "react";
import axios from "axios";
import ReactPlayer from "react-player";

import { setVideos } from "../redux/reducer";
import { getUserVideo } from "../redux/reducer";
import { connect } from "react-redux";
import "./Video.css";

class Video extends Component {
  constructor() {
    super();
    this.state = {
      video: {}
    };
  }

  // componentDidMount() {
  //   let { id } = this.props.match.params.video;
  //   console.log(2060, this.props);

  //   axios.get(`/api/videos/${id}`).then(response => {
  //     this.setState({
  //       video: response.data
  //     });
  //   });
  // }
  //update componetnt didmount then go to render and look at
  componentDidMount() {
    // console.log(this.props.match.params.id);
    axios
      .get(`/api/videos/info/${this.props.match.params.id}`)
      .then(response => {
        this.setState(response.data);
        // console.log("getUserVideo", response.data);
      });
  }

  render() {
    // let { id, user_id, video_url } = this.state.video;
    // console.log(9988, this.state);
    return (
      <div className="video-js">
        <h1>Video uploaded by - {this.props.user.gamertag}</h1>
        <div
          className="display-video"
          // style={{
          //   display: "grid",
          //   width: "auto"
          // }}
        >
          <div className="video-container">
            <div className="player-wrapper">
              <ReactPlayer
                className="react-player"
                url={this.state.video_url}
                // width="50%"
                // height="50%"
                playing
                loop={true}
              />
              {/* <h2>{this.props.video_url}</h2> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  //console.log

  let { videos, isAuthenticated, user, userVideo } = state;
  return {
    videos,
    isAuthenticated,
    userVideo,
    user
  };
}

export default connect(
  mapStateToProps,
  { setVideos, getUserVideo }
)(Video);
