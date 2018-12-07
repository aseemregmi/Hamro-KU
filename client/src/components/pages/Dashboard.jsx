import React, { Component } from 'react';
import SideBar from '../dashboard/SideBar';
import ChatRoom from '../dashboard/ChatRoom';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    if (!this.props.match.params.option) {
      this.props.history.push('/dashboard/progress');
    }
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div className="dashboard">
        <SideBar name="Aseem Regmi" />
        <div className="dashboard__main-section">
          {this.props.match.params.option === 'chat-room' ? <ChatRoom /> : null}
        </div>
      </div>
    );
  }
}

export default Dashboard;
