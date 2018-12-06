import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import VideoForm from "./VideoForm";
import axios from "axios";

import { setVideos } from "../redux/reducer";
import { getUserVideo } from "../redux/reducer";
// import { Player, ControlBar } from "video-react";
import ReactPlayer from "react-player";
import "./Videos.css";

class Videos extends Component {
  render() {
    // console.log(12344321, this.props.userVideo);

    return (
      <div>
        {this.props.isAuthenticated}
        {/* ZACH - You are currently mapping through userVideo coming from mapStateToProps. This is getting populated on the component did mount of the Profile component. */}
        {/* <h6>return in the videos component</h6> */}

        <div
        // style={{
        //   display: "grid",
        //   width: "100%",
        //   gridTemplateColumns: "repeat(2, 1fr)"
        // }}
        >
          {this.props.userVideo.map(video => {
            console.log(440, this.props);
            return (
              <div key={video.user_id.video_url}>
                <Link to={`/video/${video.id}`}>
                  <div className="player-wrapper">
                    <ReactPlayer
                      className="react-player"
                      url={video.video_url}
                      // width="75%"
                      // height="75%"
                      playing={true}
                      loop={true}
                    />
                  </div>
                </Link>

                {+this.props.user.id === +video.user_id && (
                  <div>
                    {/* <button>Update</button> */}

                    <button
                      className="delete-button"
                      onClick={() => {
                        axios
                          .delete(`/api/videos/${video.id}`)
                          .then(response => {
                            console.log(420, response);
                            this.props.getUserVideo(response.data);
                          });
                      }}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  //console.log
  console.log("state in videos", state);
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
)(Videos);
