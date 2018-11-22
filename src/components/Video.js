import React, { Component } from "react";
import axios from "axios";

class Video extends Component {
  constructor() {
    super();
    this.state = {
      video: {}
    };
  }

  componentDidMount() {
    // what does .match mean?
    let { id } = this.props.match.params.video;

    axios.get(`/api/videos/${id}`).then(response => {
      this.setState({
        video: response.data
      });
    });
  }
  render() {
    let { id, user_id, video_url } = this.state.video;
    return (
      <div>
        <h1>{Video}</h1>
      </div>
    );
  }
}

export default Video;
