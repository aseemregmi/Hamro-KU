import React, { Component } from 'react';
import axios from 'axios';

// Components
import Input from '../utility/Input';

class TeacherSignupForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      password: '',
      phoneNo: '',
      address: '',
      departments: [],
      department: {},
      post: ''
    };
  }

  componentDidMount() {
    axios
      .get('/api/departments')
      .then(res => this.setState({ departments: res.data }));
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleDepartmentChange = department => this.setState({ department });

  handleSubmit = e => {
    e.preventDefault();

    const {
      name,
      email,
      password,
      department,
      phoneNo,
      post,
      address
    } = this.state;

    axios
      .post('/api/teachers', {
        name,
        email,
        password,
        department: department._id,
        phoneNo,
        post,
        address
      })
      .then(() => {
        this.setState({
          success:
            'You successfully Signed Up. Please wait till we verify your account'
        });
        setTimeout(() => {
          this.setState({
            success: null,
            name: '',
            email: '',
            password: '',
            phoneNo: '',
            address: '',
            department: {},
            post: ''
          });
        }, 2000);
      })
      .catch(res => {
        this.setState({ error: res.response.data });
        setTimeout(() => {
          this.setState({ error: null });
        }, 2000);
      });
  };

  render() {
    return (
      <form className="form" onSubmit={this.handleSubmit}>
        <h1 className="page-title mb-6">Teacher Sign Up</h1>
        {this.state.error ? (
          <p className="error-msg">{JSON.stringify(this.state.error)}</p>
        ) : null}
        {this.state.success ? (
          <p className="success-msg">{JSON.stringify(this.state.success)}</p>
        ) : null}
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
        <div className="dropdown">
          <span>
            {this.state.department.name || 'Select Your Department'}
            &nbsp;&nbsp;&nbsp;
            <i className="fas fa-arrow-down" />
          </span>
          <div className="options">
            {this.state.departments.map(department => (
              <span
                key={department.name}
                onClick={() => this.handleDepartmentChange(department)}
              >
                {department.name}
              </span>
            ))}
          </div>
        </div>
        <Input
          placeholder="Post"
          value={this.state.post}
          handleChange={this.handleChange}
          name="post"
        />
        <Input
          placeholder="Address"
          value={this.state.address}
          handleChange={this.handleChange}
          name="address"
        />
        <Input
          placeholder="Phone No."
          value={this.state.phoneNo}
          handleChange={this.handleChange}
          name="phoneNo"
        />
        <Input value="Sign Up" type="submit" />
      </form>
    );
  }
}

export default TeacherSignupForm;
