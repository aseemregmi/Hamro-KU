import React, { Component } from 'react';
import StudentSignupForm from '../auth/StudentSignupForm';
import TeacherSignUpForm from '../auth/TeacherSignUpForm';

class SignUp extends Component {
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

  handleSignUpFormChange = () => {
    if (this.state.teacherForm === true) {
      this.props.history.push({ pathname: '/signup', search: '?type=student' });
      this.setState({ teacherForm: false });
    } else {
      this.props.history.push({ pathname: '/signup', search: '?type=teacher' });
      this.setState({ teacherForm: true });
    }
    console.log(this.props.history);
  };

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div className="signup-page">
        {!this.state.teacherForm ? (
          <StudentSignupForm />
        ) : (
          <TeacherSignUpForm />
        )}

        <div
          className="btn btn--block btn--secondary"
          onClick={this.handleSignUpFormChange}
        >
          {this.state.teacherForm
            ? 'Not A Teacher ? Click Here to Sign Up for Student'
            : 'Not A Student ? Click Here to Sign Up for Teacher'}
        </div>
      </div>
    );
  }
}

export default SignUp;
