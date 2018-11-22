import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import VideoForm from "./VideoForm";
import axios from "axios";

import { setVideos } from "../redux/reducer";
import { getUserVideo } from "../redux/reducer";

class Videos extends Component {
  // componentDidMount() {
  //   //what the fuck is going on witht he code below? what the shit is that inside the ${}??? why cant i console log what ever it is.
  //   // axios.get(`/api/videos/${this.props.user.id}`).then(response => {
  //   //   //console.log
  //   //   console.log(414, response.data);

  //   //   this.props.getUserVideo(response.data);
  //   //   //console.log
  //   //   console.log(765, this.props.getUserVideo(response.data));
  //   // });
  //   axios.get(`/api/videos/${this.state}`, this.state).then(response => {
  //     this.props.setVideo(response.data);
  //     // //console.log
  //     console.log(123, this.props.user.id);
  //     console.log(666, response.data);
  //   });
  // }
  render() {
    //console.log
    console.log("render in the videos.js", this.props.userVideo);

    return (
      <div>
        {this.props.isAuthenticated && <VideoForm />}
        {/* ZACH - You are currently mapping through userVideo coming from mapStateToProps. This is getting populated on the component did mount of the Profile component. */}
        <h6>return in the videos component</h6>
        {/* what is this video in the arrow function below?? its the whole table from the user_video_link */}
        {this.props.userVideo.map(video => {
          return (
            <div key={video.user_id.video_url}>
              {/* <div key={video.video_url}> */}
              {/* <div key={user_id.video_url}> */}
              {/* //why the shit is video_url defined but user_id is not????? */}
              {console.log(555, video)}
              <Link to={`/videos/${video.id}`}>
                <h1>{video.video_url}</h1>
              </Link>
              {/* //console.log */}
              {console.log(323, video.video_url)}
              {+this.props.user.id === +video.user_id && (
                <div>
                  <button>Update</button>

                  <button
                    onClick={() => {
                      axios.delete(`/api/videos/${video.id}`).then(response => {
                        this.props.setVideos(response.data);
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
    );
  }
}

//why does Video_url have preloaded info on it when i log in? how to i add more to video_url after i submit and relog in.

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
