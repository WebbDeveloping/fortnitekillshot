// this is similar to my PostWrapper i think
import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Switch, Route } from "react-router-dom";
import { setVideos } from "../redux/reducer";
import Videos from "./Videos";
import Video from "./Video";
// look into both above components make sure everythibng is set up videO & videoS

class AllVideos extends Component {
  componentDidMount() {
    axios.get("/api/videos").then(response => {
      this.props.setVideos(response.data);
      // console.log("setvideos", response.data);
    });
  }
  render() {
    return (
      <div>
        <h1>All Videos - only when logged in right now</h1>

        {this.props.videos.map(video => {
          console.log("allVideos component-video", video);
          return <div>{video.video_url}</div>;
        })}
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log("allVideos-state", state);
  let { videos } = state;

  return { videos };
}

export default connect(
  mapStateToProps,
  { setVideos }
)(AllVideos);
