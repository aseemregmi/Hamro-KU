import React, { Component } from 'react';
import axios from 'axios';

// Components
import Input from '../utility/Input';

class StudentSignupForm extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    group: {},
    phoneNo: '',
    registrationNo: '',
    address: '',
    groups: [],
    success: null,
    error: null
  };

  componentDidMount() {
    axios.get('/api/groups').then(res => this.setState({ groups: res.data }));
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleGroupChange = group => this.setState({ group });

  handleSubmit = e => {
    e.preventDefault();

    const {
      name,
      email,
      password,
      group,
      phoneNo,
      registrationNo,
      address
    } = this.state;

    axios
      .post('/api/students', {
        name,
        email,
        password,
        phoneNo,
        registrationNo,
        group: group._id,
        address
      })
      .then(() => {
        this.setState({
          success:
            'You successfully Signed Up. Please wait till we verify your account'
        });
        setTimeout(() => {
          this.setState({ success: null });
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
        <h1 className="page-title mb-6">Student Sign Up</h1>
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
            {this.state.group.shortForm || 'Select Your Group'}
            &nbsp;&nbsp;&nbsp;
            <i className="fas fa-arrow-down" />
          </span>
          <div className="options">
            {this.state.groups.map(group => (
              <span
                key={group.shortForm}
                onClick={() => this.handleGroupChange(group)}
              >
                {group.shortForm}
              </span>
            ))}
          </div>
        </div>

        <Input
          placeholder="Phone No"
          value={this.state.phoneNo}
          name="phoneNo"
          handleChange={this.handleChange}
        />
        <Input
          placeholder="Registration No"
          value={this.state.registrationNo}
          handleChange={this.handleChange}
          name="registrationNo"
        />
        <Input
          placeholder="Address"
          value={this.state.address}
          handleChange={this.handleChange}
          name="address"
        />
        <Input value="Sign Up" type="submit" />
      </form>
    );
  }
}

export default StudentSignupForm;
