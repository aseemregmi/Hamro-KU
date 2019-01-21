import React, { Component } from 'react';
import axios from 'axios';
import SideBar from './SideBar';
import MyClasses from './MyClasses';
import UploadNotes from './UploadNotes';
import AddInternalMarks from './AddInteralMarks';
import ManageAttendance from './ManageAttendance';
import StudentRecord from './StudentRecord';
import SendNotice from './SendNotice';

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
      .catch(err => {
        this.props.dispatch({ type: 'REMOVE_TOKEN_FROM_LOCALSTORAGE' });
      });
  }

  render() {
    if (!this.state.teacher) {
      return null;
    }

    const { token } = this.props.auth;

    return (
      <div className="dashboard">
        <SideBar name={this.state.teacher.name} />
        <div className="dashboard__main-section">
          {this.props.match.params.option === 'classes' ? (
            <MyClasses teacher={this.state.teacher} token={token} />
          ) : null}
          {this.props.match.params.option === 'internal-marks' ? (
            <AddInternalMarks token={token} teacher={this.state.teacher} />
          ) : null}
          {this.props.match.params.option === 'attendance' ? (
            <ManageAttendance token={token} teacher={this.state.teacher} />
          ) : null}
          {this.props.match.params.option === 'student' ? (
            <StudentRecord token={token} teacher={this.state.teacher} />
          ) : null}
          {this.props.match.params.option === 'notes' ? (
            <UploadNotes token={token} teacher={this.state.teacher} />
          ) : null}
          {this.props.match.params.option === 'notice' ? (
            <SendNotice token={token} teacher={this.state.teacher} />
          ) : null}
        </div>
      </div>
    );
  }
}

export default Dashboard;
