import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { setVideos } from "../redux/reducer";
import { getUserVideo } from "../redux/reducer";

class VideoForm extends Component {
  constructor() {
    super();
    this.state = {
      video_url: ""
    };
  }
  //where is video_url holding data?
  //in the user_video_link table

  handleChange = e => {
    let { name, value } = e.target;

    this.setState({
      [name]: value
    });
  };

  handleClick = () => {
    //  - In here you are submitting videos, and then you want to update redux state to show the user their videos. YOu'll need to update the backend route that this function is making a request to so that it returns user specific videos (using their id)
    axios.post("/api/videos", this.state).then(response => {
      //i updated the line abouve. to state.userId(not sure waht is was before)
      console.log(1212, this.state);
      //console.log
      console.log(1111, response.data);
      // ZACH - Update either this function (setVideos) right here so it updates userVideo on redux state or use a different function to do that.
      this.props.getUserVideo(response.data);
      // console.log(654, response.data);
      //JOE- I update thw above line from set videos to getUserVideo
      this.setState({
        video_url: ""
      });
      //console.log
      console.log(222, this.state);
    });
  };

  render() {
    return (
      <div>
        <h1>Submit cool video here in the VideoForm component</h1>
        <input
          type="text"
          name="VideoLink"
          value={this.state.video_url}
          onChange={this.handleChange}
          placeholder="VideoLink"
        />
        <textarea
          name="video_url"
          cols="30"
          rows="10"
          value={this.state.video_url}
          onChange={this.handleChange}
        />

        <button onClick={this.handleClick}>Submit</button>
      </div>
    );
  }
}

export default connect(
  null,
  { setVideos, getUserVideo }
)(VideoForm);
