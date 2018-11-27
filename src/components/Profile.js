import React, { Component } from "react";
import { Route } from "react-router-dom";
import axios from "axios";

import VideoForm from "../components/VideoForm";
import Videos from "../components/Videos";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { getUserVideo } from "../redux/reducer";

class Profile extends Component {
  componentDidMount() {
    //console.log
    //some how if i remove the ${} below it also gives me a server error finding current user???
    axios.get(`/api/videos/${this.props.user.id}`).then(response => {
      console.log(9898, this.props.user.id);
      this.props.getUserVideo(response.data);
      //console.log
      // console.log(123, this.props.user.id);
      console.log(666, response.data);
    });
  }
  render() {
    return this.props.isAuthenticated ? (
      <div>
        <p>
          Welcome to KillShot my super dope, super cool, incredibly amazing,
          freakin awesome website!!!!!!!!!!!! You are now inside your profile.(i
          actually think its like a comunity type profile?? how do i fix that so
          each user has thier own??? help? anybody?)
        </p>

        <Videos />
      </div>
    ) : (
      <Redirect to="/login" />
    );
  }
}

function mapStateToProps(state) {
  let { isAuthenticated, user } = state;
  return {
    isAuthenticated,
    user
  };
}

export default connect(
  mapStateToProps,
  { getUserVideo }
)(Profile);
