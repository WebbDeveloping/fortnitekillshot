import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { setVideos } from "../redux/reducer";
import { getUserVideo } from "../redux/reducer";

class VideoForm extends Component {
  constructor() {
    super();
    this.state = {
      file: ""
    };
  }
  //where is file holding data?
  //in the user_video_link table

  // handleChange = e => {
  //   let { name, value } = e.target;

  //   this.setState({
  //     [name]: value
  //   });
  // };

  // handleClick = () => {
  //   //  - In here you are submitting videos, and then you want to update redux state to show the user their videos. YOu'll need to update the backend route that this function is making a request to so that it returns user specific videos (using their id)
  //   axios.post("/api/videos", this.state).then(response => {
  //     //i updated the line abouve. to state.userId(not sure waht is was before)

  //     // ZACH - Update either this function (setVideos) right here so it updates userVideo on redux state or use a different function to do that.
  //     this.props.getUserVideo(response.data);
  //     this.setState({
  //       file: ""
  //     });
  //   });
  // };

  fileSelectedHandler = event => {
    this.setState({
      file: event.target.files[0]
    });
  };

  uploadFile = e => {
    e.preventDefault();
    const fd = new FormData();

    fd.append("video", this.state.file);
    axios
      .post("/api/videos", fd, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then(response => {
        console.log(5555555555555555, response);
      });
  };

  render() {
    return (
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-4">
            <h1>Submit cool video here.</h1>

            {/* <form>
              <textarea
                class="text-center"
                name="file"
                cols="30"
                rows="1"
                value={this.state.file}
                onChange={this.handleChange}
              />

              <button onClick={this.handleClick}>Submit</button>
              <input type="file" onClick={this.uploadFile} />
              <button onClick={this.handleClick}>Submit</button>
            </form> */}

            <form onSubmit={this.uploadFile}>
              <input
                class="form-control"
                type="file"
                onChange={this.fileSelectedHandler}
              />
              <button type="submit">upload</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default connect(
  null,
  { setVideos, getUserVideo }
)(VideoForm);
