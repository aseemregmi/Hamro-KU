import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import axios from 'axios';

import GettingStarted from '../GettingStarted';
import WelcomeBlock from '../WelcomeBlock';
import NewsAndEvents from '../NewsAndEvents';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      news: [],
      notice: []
    };
  }

  componentDidMount() {
    axios('/api/kunewsandevents').then(res => {
      const { news, notice } = res.data;
      this.setState({ news, notice });

      console.log();
    });
  }

  render() {
    return (
      <div className="home">
        <WelcomeBlock />
        <GettingStarted loggedIn={this.state.loggedIn} />
        <NewsAndEvents news={this.state.news} events={this.state.notice} />
      </div>
    );
  }
}

export default Home;
