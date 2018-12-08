import React, { Component } from 'react';
import StudentLoginForm from './../auth/StudentLoginForm';
import TeacherLoginForm from './../auth/TeacherLoginForm';
import AdminLoginForm from '../auth/AdminLoginForm';

class Login extends Component {
  constructor(props) {
    super(props);

    const formType = this.props.history.location.search.replace('?type=', '');

    if (formType === 'student') {
      this.state = {
        teacherForm: false,
        studentForm: true
      };
    } else if (formType === 'teacher') {
      this.state = {
        teacherForm: true,
        studetForm: false
      };
    } else if (formType === 'admin') {
      this.state = {
        adminForm: true,
        teacherForm: false,
        studetForm: false
      };
    }
  }

  handleLoginFormChange = () => {
    if (this.state.teacherForm === true) {
      this.props.history.push({ pathname: '/login', search: '?type=student' });
      this.setState({ teacherForm: false, studentForm: true });
    } else if (this.state.studentForm === true) {
      this.props.history.push({ pathname: '/login', search: '?type=teacher' });
      this.setState({ teacherForm: true, studentForm: false });
    }
  };

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div className="login-page">
        {this.state.teacherForm ? <TeacherLoginForm /> : null}
        {this.state.studentForm ? <StudentLoginForm /> : null}
        {this.state.adminForm ? <AdminLoginForm /> : null}
        {!this.state.adminForm ? (
          <div
            className="btn btn--block btn--secondary"
            onClick={this.handleLoginFormChange}
          >
            {this.state.teacherForm
              ? 'Not A Teacher ? Click Here to Login for Student'
              : 'Not A Student ? Click Here to Login for Teacher'}
          </div>
        ) : null}
      </div>
    );
  }
}

export default Login;
