import React, { Component } from 'react';
// import { Link } from 'react-router';

export default class TwitchAuthenticate extends Component {
  render() {
    const clientID = 'rpj60fikezo717h9d7lka7zq7r1w97';
    return (
      <div className="twitch-auth">
        <a
          className="twitch-button"
          href={`https://api.twitch.tv/kraken/oauth2/authorize?response_type=code&client_id=${clientID}&redirect_uri=http://localhost:3000/redirect&scope=user_read`}
        >
          Log in with Twitch
        </a>
      </div>
    );
  }
}
