import React, { Component } from 'react';
import StudentSignupForm from '../auth/StudentSignupForm';
import TeacherSignUpForm from '../auth/TeacherSignUpForm';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teacherForm: true
    };
  }
  handleSignUpFormChange = e => {
    this.setState({ teacherForm: !this.state.teacherForm });
  };
  render() {
    return (
      <div className="signup-page">
        {!this.state.teacherForm ? (
          <StudentSignupForm />
        ) : (
          <TeacherSignUpForm />
        )}

        <div className="btn btn--block" onClick={this.handleSignUpFormChange}>
          {this.state.teacherForm
            ? 'Not A Teacher ? Click Here to Sign Up for Student'
            : 'Not A Student ? Click Here to Sign Up for Teacher'}
        </div>
      </div>
    );
  }
}

export default SignUp;
