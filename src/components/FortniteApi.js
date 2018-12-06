import React, { Component } from "react";

class FortniteApi extends Component {
  constructor(props) {
    super(props);
    this.state = {
      store: []
    };
  }

  componentDidMount() {
    axios
      .get("https://fortnite-public-api.theapinetwork.com/prod09/store/get")
      .then(response => {
        const store = res.data;
        this.setState({ store });
      });
  }
  render() {
    return (
      <div>
        {this.state.store.map(store => (
          <li>{store}</li>
        ))}
      </div>
    );
  }
}

export default FortniteApi;
