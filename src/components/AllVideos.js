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
import Stars from "../components/Stars";
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
      <div className="all-videos-page">
        {/* <h1>All Videos</h1> */}
        <div
          className="all-video-grid"
          style={{
            display: "grid",
            width: "auto",
            gridTemplateColumns: "repeat(2, 1fr)"
          }}
        >
          {this.props.videos.map(video => {
            console.log(78787878, this.props.videos);
            return (
              <div className="all-video-video-container">
                <Link to={`/video/${video.id}`}>
                  <h1 className="all-video-author">
                    <Link to={`/ViewUser/:${video.user_id}`}>
                      "Uploaded by {video.author}"
                    </Link>
                  </h1>
                  <div className="all-video-player-wrapper">
                    <ReactPlayer
                      className="all-video-react-player"
                      url={video.video_url}
                      // width="50%"
                      // height="50%"
                      playing
                      loop={true}
                      volume={0}
                      muted={true}
                      controls={true}
                    />
                  </div>
                </Link>
                <div className="star-rating">
                  <Stars />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  // console.log("allVideos-state", state);
  let { videos } = state;

  return { videos };
}

export default connect(
  mapStateToProps,
  { setVideos }
)(AllVideos);
