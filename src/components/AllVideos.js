// this is similar to my PostWrapper i think
import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Switch, Route } from "react-router-dom";
import { setVideos } from "../redux/reducer";
import Videos from "./Videos";
import Video from "./Video";
import { Link } from "react-router-dom";
import ReactPlayer from "react-player";
import "./AllVideos.css";
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
        <h1>All Videos</h1>

        {this.props.videos.map(video => {
          return (
            <div className="video-container">
              <Link to={`/videos/${video.id}`}>
                {/* <iframe>
                  <h1>{video.video_url}</h1>
                </iframe> */}
                <div className="player-wrapper">
                  <ReactPlayer
                    className="react-player"
                    url={video.video_url}
                    width="50%"
                    height="50%"
                    playing
                    loop="true"
                  />
                </div>
              </Link>
            </div>
          );
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
