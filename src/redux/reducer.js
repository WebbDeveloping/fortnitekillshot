const USER_LOGGED_IN = "USER_LOGGED_IN";
const USER_LOGGED_OUT = "USER_LOGGED_OUT";
const SET_VIDEOS = "SET_VIDEOS";
const GET_USER_VIDEO = "GET_USER_VIDEO";
const UPDATE_GAMERTAG = "UPDATE_GAMERTAG";

const initialState = {
  isAuthenticated: false,
  user: {},
  videos: [],
  userVideo: []
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case USER_LOGGED_IN:
      return { ...state, isAuthenticated: true, user: action.payload };
    case USER_LOGGED_OUT:
      return { ...state, isAuthenticated: false, user: {} };

    case SET_VIDEOS:
      return { ...state, videos: action.payload };

    case GET_USER_VIDEO:
      return { ...state, userVideo: action.payload };

    case UPDATE_GAMERTAG:
      return { ...state, user: { ...state.user, gamertag: action.payload } };

    default:
      return state;
  }
}

export function userLoggedIn(user) {
  return {
    type: USER_LOGGED_IN,
    payload: user
  };
}

export function userLoggedOut() {
  return {
    type: USER_LOGGED_OUT
  };
}

export function setVideos(videos) {
  return {
    type: SET_VIDEOS,
    payload: videos
  };
}

export function getUserVideo(userVideo) {
  return {
    type: GET_USER_VIDEO,
    payload: userVideo
  };
}

export function updateGamertag(gamertag) {
  return {
    type: UPDATE_GAMERTAG,
    payload: gamertag
  };
}
