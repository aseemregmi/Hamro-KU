import React, { Component } from 'react';
import SideBar from '../dashboard/SideBar';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    if (!this.props.match.params.option) {
      this.props.history.push('/dashboard/info');
    }
  }
  render() {
    return (
      <div className="dashboard">
        <SideBar name="Aseem Regmi" />
        <div className="dashboard__main-section">Main-Content</div>
      </div>
    );
  }
}

export default Dashboard;
