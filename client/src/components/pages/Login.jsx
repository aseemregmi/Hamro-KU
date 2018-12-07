import React, { Component } from 'react';
import StudentLoginForm from './../auth/StudentLoginForm';
import TeacherLoginForm from './../auth/TeacherLoginForm';

class Login extends Component {
  constructor(props) {
    super(props);

    const formType = this.props.history.location.search.replace('?type=', '');

    if (formType === 'student') {
      this.state = {
        teacherForm: false
      };
    } else {
      this.state = {
        teacherForm: true
      };
    }
  }

  handleLoginFormChange = () => {
    if (this.state.teacherForm === true) {
      this.props.history.push({ pathname: '/login', search: '?type=student' });
      this.setState({ teacherForm: false });
    } else {
      this.props.history.push({ pathname: '/login', search: '?type=teacher' });
      this.setState({ teacherForm: true });
    }
    console.log(this.props.history);
  };

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div className="login-page">
        {!this.state.teacherForm ? <StudentLoginForm /> : <TeacherLoginForm />}
        <div
          className="btn btn--block btn--secondary"
          onClick={this.handleLoginFormChange}
        >
          {this.state.teacherForm
            ? 'Not A Teacher ? Click Here to Login for Student'
            : 'Not A Student ? Click Here to Login for Teacher'}
        </div>
      </div>
    );
  }
}

export default Login;
