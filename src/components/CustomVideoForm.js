import React, { Component } from "react";
import ReactDOM from "react-dom";
import FileUploadProgress from "react-fileupload-progress";
import { connect } from "react-redux";
import axios from "axios";
import { setVideos } from "../redux/reducer";
import { getUserVideo } from "../redux/reducer";
import "./CustomVideoForm.css";
//allow react dev tools work
window.React = React;

const styles = {
  progressWrapper: {
    margin: "5px 5px 5px 5px",
    height: "50px",
    // marginTop: "10px",
    width: "400px",
    float: "left",
    overflow: "hidden",
    backgroundColor: "#f5f5f5",
    borderRadius: "4px",
    WebkitBoxShadow: "inset 0 1px 2px rgba(0,0,0,.1)",
    boxShadow: "inset 0 1px 2px rgba(0,0,0,.1)"
  },
  progressBar: {
    float: "left",
    width: "0",
    height: "100%",
    fontSize: "12px",
    lineHeight: "20px",
    color: "#fff",
    textAlign: "center",
    backgroundColor: "#5cb85c",
    WebkitBoxShadow: "inset 0 -1px 0 rgba(0,0,0,.15)",
    boxShadow: "inset 0 -1px 0 rgba(0,0,0,.15)",
    WebkitTransition: "width .6s ease",
    Otransition: "width .6s ease",
    transition: "width .6s ease",
    boxShadow: "2px 2px 3px black"
  },
  cancelButton: {
    marginTop: "5px",
    WebkitAppearance: "none",
    padding: 0,
    cursor: "pointer",
    background: "0 0",
    border: 0,
    float: "left",
    fontSize: "21px",
    fontWeight: 700,
    lineHeight: 1,
    color: "#000",
    textShadow: "0 1px 0 #fff",
    filter: "alpha(opacity=20)",
    opacity: ".2"
  },

  bslabel: {
    display: "block",
    maxWidth: "100%",
    margin: "5px 5px 5px 5px",
    fontWeight: 700
    // ,
    // boxShadow: "2px 2px 3px black"
  },

  bsHelp: {
    display: "block",
    marginTop: "5px",
    marginBottom: "10px",
    color: "#737373"
  },

  bsButton: {
    padding: "2px 5px 5px 5px",
    fontSize: "12px",
    lineHeight: "1.5",
    borderRadius: "3px",
    color: "#fff",
    backgroundColor: "#337ab7",
    borderColor: "#2e6da4",
    display: "inline-block",
    padding: "6px 12px",
    margin: "5px 5px 5px 5px",
    fontWeight: 400,
    textAlign: "center",
    whiteSpace: "nowrap",
    verticalAlign: "middle",
    touchAction: "manipulation",
    cursor: "pointer",
    WebkitUserSelect: "none",
    MozUserSelect: "none",
    msUserSelect: "none",
    userSelect: "none",
    backgroundImage: "none",
    border: "1px solid transparent",
    boxShadow: "2px 2px 3px black"
  }
};

class CustomVideoForm extends Component {
  constructor() {
    super();
    this.state = {
      file: ""
    };
  }

  formGetter() {
    return new FormData(document.getElementById("customForm"));
  }

  customFormRenderer(onSubmit) {
    return (
      <form
        id="customForm"
        // style={{ marginBottom: "15px" }}
        onSubmit={this.uploadFile}
      >
        <label style={styles.bslabel} htmlFor="exampleInputFile">
          SUBMIT KILLSHOT VIDEO
        </label>
        <input
          // style={{ display: "inline-block" }}
          type="file"
          name="file"
          id="exampleInputFile"
          onChange={this.fileSelectedHandler}
        />
        {/* <p style={styles.bsHelp}>This is custom form.</p> */}

        <button type="button" style={styles.bsButton} onClick={onSubmit}>
          Upload
        </button>
      </form>
    );
  }

  customProgressRenderer(progress, hasError, cancelHandler) {
    if (hasError || progress > -1) {
      let barStyle = Object.assign({}, styles.progressBar);
      barStyle.width = progress + "%";

      let message = <span>{barStyle.width}</span>;
      if (hasError) {
        barStyle.backgroundColor = "#d9534f";
        message = (
          <span style={{ color: "#a94442" }}>Failed to upload ...</span>
        );
      }
      if (progress === 100) {
        message = <span>This may take a moment</span>;
      }

      return (
        <div>
          <div style={styles.progressWrapper}>
            <div style={barStyle} />
          </div>
          <button style={styles.cancelButton} onClick={cancelHandler}>
            <span>&times;</span>
          </button>
          <div style={{ clear: "left" }}>{message}</div>
        </div>
      );
    } else {
      return;
    }
  }
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
      .then(response => {});
  };

  render() {
    return (
      <div>
        {/* <hr style={{ marginTop: "80px" }} /> */}

        {/* this was coppied straight over from videoform  */}
        {/* <form onSubmit={this.uploadFile}>
          <input
            class="d-flex p-2 bd-highlight"
            type="file"
            onChange={this.fileSelectedHandler}
          />
          <button type="submit">This One WOrks</button>
        </form> */}

        <FileUploadProgress
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
          formGetter={this.formGetter.bind(this)}
          formRenderer={this.customFormRenderer.bind(this)}
          progressRenderer={this.customProgressRenderer.bind(this)}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
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
)(CustomVideoForm);
