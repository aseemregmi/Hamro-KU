import React, { Component } from 'react';
import StudentDashboard from './../studentDashboard';
import TeacherDashboard from './../teacherDashboard';

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
    if (this.props.auth) {
      if (this.props.auth.userType === 'student') {
        return <StudentDashboard {...this.props} />;
      }

      if (this.props.auth.userType === 'teacher') {
        return <TeacherDashboard {...this.props} />;
      }
    } else {
      return null;
    }

    return null;
  }
}

export default Dashboard;
