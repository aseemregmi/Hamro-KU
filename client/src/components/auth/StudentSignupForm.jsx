import React, { Component } from 'react';

// Components
import Input from '../utility/Input';

class StudentSignupForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      password: '',
      year: '',
      semester: '',
      department: ''
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
  };

  render() {
    return (
      <form className="form" onSubmit={this.handleSubmit}>
        <h1 className="page-title mb-6">Student Sign Up</h1>
        <Input
          placeholder="Name"
          value={this.state.name}
          handleChange={this.handleChange}
          name="name"
        />
        <Input
          placeholder="Email"
          value={this.state.email}
          handleChange={this.handleChange}
          name="email"
          type="email"
        />
        <Input
          placeholder="Password"
          value={this.state.password}
          handleChange={this.handleChange}
          type="password"
          name="password"
        />
        <Input
          placeholder="Year"
          value={this.state.year}
          name="year"
          handleChange={this.handleChange}
        />
        <Input
          placeholder="Semester"
          value={this.state.semester}
          handleChange={this.handleChange}
          name="semester"
        />
        <Input
          placeholder="Department"
          value={this.state.department}
          handleChange={this.handleChange}
          name="department"
        />
        <Input value="Sign Up" type="submit" />
      </form>
    );
  }
}

export default StudentSignupForm;
