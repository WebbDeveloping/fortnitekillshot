// import React, { Component } from "react";
// import { connect } from "react-redux";
// import axios from "axios";
// import { setVideos } from "../redux/reducer";
// import { getUserVideo } from "../redux/reducer";
// import FileUploadProgress from "react-fileupload-progress";

// class VideoForm extends Component {
//   constructor() {
//     super();
//     this.state = {
//       file: ""
//     };
//   }
//   //where is file holding data?
//   //in the user_video_link table

//   // handleChange = e => {
//   //   let { name, value } = e.target;

//   //   this.setState({
//   //     [name]: value
//   //   });
//   // };

//   // handleClick = () => {
//   //   //  - In here you are submitting videos, and then you want to update redux state to show the user their videos. YOu'll need to update the backend route that this function is making a request to so that it returns user specific videos (using their id)
//   //   axios.post("/api/videos", this.state).then(response => {
//   //     //i updated the line abouve. to state.userId(not sure waht is was before)

//   //     // ZACH - Update either this function (setVideos) right here so it updates userVideo on redux state or use a different function to do that.
//   //     this.props.getUserVideo(response.data);
//   //     this.setState({
//   //       file: ""
//   //     });
//   //   });
//   // };

//   fileSelectedHandler = event => {
//     this.setState({
//       file: event.target.files[0]
//     });
//   };

//   uploadFile = e => {
//     console.log(e);
//     e.preventDefault();
//     const fd = new FormData();

//     fd.append("video", this.state.file);
//     axios
//       .post("/api/videos", fd, {
//         headers: {
//           "Content-Type": "multipart/form-data"
//         },
//         onUploadProgress: progressEvent => {
//           console.log(
//             "Upload Progress: " +
//               Math.round((progressEvent.loaded / progressEvent.total) * 100) +
//               "%"
//           );
//         }
//       })
//       .then(response => {
//         console.log(5555555555555555, response);
//       });
//   };

//   render() {
//     return (
//       <div class="container-fluid">
//         <div class="row">
//           <div class="col-md-4">
//             <h4>Submit cool video here.</h4>

//             {/* <form>
//               <textarea
//                 class="text-center"
//                 name="file"
//                 cols="30"
//                 rows="1"
//                 value={this.state.file}
//                 onChange={this.handleChange}
//               />

//               <button onClick={this.handleClick}>Submit</button>
//               <input type="file" onClick={this.uploadFile} />
//               <button onClick={this.handleClick}>Submit</button>
//             </form> */}

//             <form onSubmit={this.uploadFile}>
//               <input
//                 class="d-flex p-2 bd-highlight"
//                 type="file"
//                 onChange={this.fileSelectedHandler}
//               />
//               <button type="submit">upload</button>

//               {/* <FileUploadProgress
//               key="ex2"
//               url="http://localhost:3000/api/upload"
//               onProgress={(e, request, progress) => {
//                 console.log("progress", e, request, progress);
//               }}
//               onLoad={(e, request) => {
//                 console.log("load", e, request);
//               }}
//               onError={(e, request) => {
//                 console.log("error", e, request);
//               }}
//               onAbort={(e, request) => {
//                 console.log("abort", e, request);
//               }}
//               formGetter={this.formGetter.bind(this)}
//               formRenderer={this.customFormRenderer.bind(this)}
//               progressRenderer={this.customProgressRenderer.bind(this)}
//             /> */}
//             </form>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }
// export default connect(
//   null,
//   { setVideos, getUserVideo }
// )(VideoForm);
