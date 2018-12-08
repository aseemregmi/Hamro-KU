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
      loggedIn: true,
      news: [],
      notice: [],
      fetchingStatus: 'fetching'
    };
  }

  static getDerivedStateFromProps(props) {
    const loggedIn = props.auth ? true : false;
    return {
      loggedIn
    };
  }

  componentDidMount() {
    axios('/api/kunewsandevents')
      .then(res => {
        const { news, notice } = res.data;
        this.setState({ news, notice, fetchingStatus: 'fetched' });
      })
      .catch(() => this.setState({ fetchingStatus: 'failed' }));

    window.scrollTo(0, 0);
  }

  handleLogout = async () => {
    try {
      await axios.post('/api/tokens/delete', {
        token: this.props.auth.token
      });
      this.props.dispatch({ type: 'LOGOUT' });
    } catch (err) {
      alert(err);
    }
  };

  render() {
    return (
      <div className="home">
        <WelcomeBlock />
        <GettingStarted
          loggedIn={this.state.loggedIn}
          handleLogout={this.handleLogout}
        />
        <NewsAndEvents
          fetchingStatus={this.state.fetchingStatus}
          news={this.state.news}
          events={this.state.notice}
        />
      </div>
    );
  }
}

export default Home;
