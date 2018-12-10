import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import "./UserProfile.css";
import ReactS3Uploader from "react-s3-uploader";
// import FileUploadProgress from "react-fileupload-progress";
import { updateGamertag } from "../redux/reducer";

class UserProfile extends Component {
  constructor() {
    super();

    this.state = {
      user: {},
      editing: false,
      uploading: false,
      gamerTag: "",
      userImage: ""
    };
  }

  componentDidMount() {
    axios.get("/auth/currentuser").then(response => {
      console.log(24455, response);
      this.setState({
        user: response.data,
        gamerTag: response.data.gamertag
      });
    });
  }

  handleChange = input => {
    this.setState({
      gamerTag: input
    });
  };

  toggleEdit = () => {
    this.setState({
      editing: !this.state.editing
    });
  };

  toggleUpload = () => {
    this.setState({
      uploading: !this.state.uploading
    });
  };

  handleCancel = () => {
    this.setState({
      gamerTag: this.state.user.gamertag
    });
    this.toggleEdit();
  };

  handleKeyPress = event => {
    if (event.key === "Enter") {
      this.updateGamertag(this.state.gamerTag);
    }
  };

  updateGamertag = gamertag => {
    console.log(4589, this.state.user);
    let { id } = this.state.user;
    axios
      .put("/api/updategamertag", { gamertag, id })
      .then(response => {
        console.log(666777, response);
        this.props.updateGamertag(response.data.gamertag);
        console.log(555, response.data);
        this.setState({
          user: response.data,
          editing: false
        });
        this.componentDidMount();
      })
      .catch(error => {
        console.log(error);
      });
  };
  updateUserImage = userImage => {
    console.log(4589, this.state.user);
    let { id } = this.state.user;
    axios
      .put("/api/updateimage", { userImage, id })
      .then(response => {
        console.log(666777, response);
        this.props.updateUserImage(response.data.userImage);
        console.log(555, response.data);
        this.setState({
          userImage: response.data,
          editing: false
        });
        this.componentDidMount();
      })
      .catch(error => {
        console.log(error);
      });
  };

  // onFinish = res => {
  //   let { fileKey } = res;
  //   let { id } = this.state.user;
  //   console.log(9999999, this.state.user);
  //   let uploadedImage = `https://s3.us-east-2.amazonaws.com/fortnitekillshot/fortnitekillshot/1543335658270-lg.jpg/${fileKey}`;

  //   axios.put("/api/updateimage", { uploadedImage, id }).then(response => {
  //     console.log(888888, response.data);
  //     this.setState({
  //       user: response.data,
  //       uploading: false
  //     });
  //   });
  // };

  uploadFile = e => {
    console.log(e);
    e.preventDefault();
    const fd = new FormData();
    console.log(334455, fd);

    fd.append("userImage", this.state.userImage);
    console.log(556699, this.state.userImage, fd);
    axios
      .post("/api/updateimage", fd, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then(response => {
        console.log(2222222, response);
      });
  };

  fileSelectedHandler = event => {
    console.log(776655, event.target.files);
    this.setState({
      userImage: event.target.files[0]
    });
  };

  render(onSubmit) {
    return (
      <div className="profile-form">
        {this.state.uploading ? (
          <div className="image-div uploading-true">
            <div />
            <div>
              {/* <ReactS3Uploader
                signingUrl="/s3/sign"
                signingUrlMethod="GET"
                accept="image/*"
                s3path="pictures/"
                preprocess={this.onUploadStart}
                onSignedUrl={this.onSignedUrl}
                onProgress={this.onProgress}
                onError={this.onUploadError}
                onFinish={this.uploadFile}
                signingUrlWithCredentials={false} // in case when need to pass authentication credentials via CORS
                uploadRequestHeaders={{ "x-amz-acl": "public-read" }} // this is the default
                contentDisposition="auto"
                scrubFilename={filename =>
                  filename.replace(/[^\w\d_\-.]+/gi, "")
                }
                inputRef={cmp => (this.uploadInput = cmp)}
                autoUpload={true}
                className="image-uploader"
              /> */}
              {/* <FileUploadProgress
                key="ex2"
                url="/api/videos"
                onProgress={(e, request, progress) => {
                  console.log("progress", e, request, progress);
                }}
                onLoad={(e, request) => {
                  this.props.getUserVideo(JSON.parse(request.response));

                  console.log("load", e, request.response);
                }}
                onError={(e, request) => {
                  console.log("error", e, request);
                }}
                onAbort={(e, request) => {
                  console.log("abort", e, request);
                }}
              /> */}

              <form>
                <input
                  // onSubmit={this.uploadFile}
                  class="d-flex p-2 bd-highlight"
                  type="file"
                  name="file"
                  onChange={this.fileSelectedHandler}
                />
              </form>

              <button onClick={this.uploadFile} type="submit">
                upload
              </button>
              <button onClick={this.toggleUpload} className="cancel-button">
                Cancel
              </button>
            </div>
          </div>
        ) : this.state.user.profileimage ? (
          <div className="image-div">
            <img
              src={`${this.state.user.profileimage}`}
              alt=""
              className="user-image"
            />
            <button onClick={this.toggleUpload} className="upload-button">
              Upload new picture
            </button>
          </div>
        ) : (
          <div className="image-div">
            <img src="assets/galaxyskin.jpg" alt="" className="user-image" />
            <button onClick={this.toggleUpload} className="upload-button">
              Upload new picture
            </button>
          </div>
        )}

        <div className="profile-info">
          {this.state.editing ? (
            <div>
              <div className="editing">
                <div>
                  <h2 className="profile-form-item">Gamer Tag: </h2>
                  <input
                    onChange={e => this.handleChange(e.target.value)}
                    value={this.state.gamerTag}
                    onKeyPress={this.handleKeyPress}
                    className="edit-input"
                  />
                </div>
                <div>
                  <button
                    onClick={() => this.updateGamertag(this.state.gamerTag)}
                    className="update-button"
                  >
                    Save
                  </button>
                  <button onClick={this.handleCancel} className="update-button">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="not-editing">
              <div>
                <h2 className="profile-form-item">GamerTag: </h2>
                <h3 className="profile-form-item">
                  {this.state.user.gamertag}
                </h3>
              </div>
              <button className="edit-button" onClick={this.toggleEdit}>
                <i className="fas fa-edit" />
              </button>
            </div>
          )}
        </div>

        <div className="profile-info">
          <div>
            <h2 className="profile-form-item">Email: </h2>
            <h3 className="profile-form-item">{this.state.user.email}</h3>
          </div>
          <hr />
          <div>
            <h2 className="profile-form-item">Twitch-Link: </h2>
            <h3 className="profile-form-item">twitch.com</h3>
          </div>
          <hr />
          <div>
            <h2 className="profile-form-item">Twitter-Link: </h2>
            <h3 className="profile-form-item">twitter.com</h3>
          </div>
          <hr />
          <div>
            <h2 className="profile-form-item">Facebook-Link: </h2>
            <h3 className="profile-form-item">Facebook.com</h3>
          </div>
          <hr />
          <div>
            <h2 className="profile-form-item">instagram-Link: </h2>
            <h3 className="profile-form-item">instagram.com</h3>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  // console.log(78787878, state.user);
  return {
    user: state.user
  };
}

export default connect(
  mapStateToProps,
  { updateGamertag }
)(UserProfile);
