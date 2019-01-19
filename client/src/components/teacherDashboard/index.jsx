import React, { Component } from 'react';
import axios from 'axios';
import SideBar from './SideBar';
import MyClasses from './MyClasses';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    if (!this.props.match.params.option) {
      this.props.history.push('/dashboard/classes');
    }
    this.state = { teacher: null };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    axios
      .post('/api/tokens/token-user', { token: this.props.auth.token })
      .then(res => this.setState({ teacher: res.data }))
      .catch(err => console.log(err));
  }

  render() {
    if (!this.state.teacher) {
      return null;
    }
    return (
      <div className="dashboard">
        <SideBar name={this.state.teacher.name} />
        <div className="dashboard__main-section">
          {this.props.match.params.option === 'classes' ? (
            <MyClasses teacher={this.state.teacher} />
          ) : null}
        </div>
      </div>
    );
  }
}

export default Dashboard;
