import React, { Component } from 'react';
import axios from 'axios';
import SideBar from './SideBar';
import ChatRoom from './ChatRoom';
import ManageClassesAndRoutines from './ManageClassesAndRoutines';
import Classes from './Classes';
import Notes from './Notes';
import Notices from './Notices';

class StudentDashboard extends Component {
  constructor(props) {
    super(props);
    if (!this.props.match.params.option) {
      this.props.history.push('/dashboard/progress');
    }

    this.state = {
      student: {}
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    axios
      .post('/api/tokens/token-user', { token: this.props.auth.token })
      .then(res => this.setState({ student: res.data }))
      .catch(err => console.log(err));
  }

  render() {
    if (!this.state.student.name) {
      return null;
    }
    return (
      <div className="dashboard">
        <SideBar student={this.state.student} />
        <div className="dashboard__main-section">
          {this.props.match.params.option === 'chat-room' ? (
            <ChatRoom student={this.state.student} />
          ) : null}
          {this.props.match.params.option === 'classes' ? (
            <Classes student={this.state.student} />
          ) : null}
          {this.props.match.params.option === 'notes' ? (
            <Notes student={this.state.student} />
          ) : null}
          {this.props.match.params.option === 'notice' ? (
            <Notices student={this.state.student} />
          ) : null}
          {this.props.match.params.option === 'manage-class-routines' &&
          this.state.student.specialAuthority ? (
            <ManageClassesAndRoutines student={this.state.student} />
          ) : null}
        </div>
      </div>
    );
  }
}

export default StudentDashboard;
