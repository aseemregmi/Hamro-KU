import React, { Component } from 'react';
import axios from 'axios';

// Components
import Input from '../utility/Input';

class StudentSignupForm extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    group: 'default',
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

  // handleGroupChange = group => this.setState({ group });

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
        group,
        address
      })
      .then(() => {
        this.setState({
          success:
            'You successfully Signed Up. Please wait till we verify your account',
          name: '',
          email: '',
          password: '',
          phoneNo: '',
          registrationNo: '',
          group: 'default',
          address: ''
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
        <select
          style={{
            fontSize: '1.5rem',
            padding: '10px',
            boxShadow: '0rem 0.3rem 0.9rem #f7f7f7',
            border: 'none'
          }}
          name="group"
          value={this.state.group}
          onChange={this.handleChange}
        >
          <option value="default" disabled>
            Select Your Group
          </option>
          {this.state.groups.map(group => (
            <option key={group._id} value={group._id}>
              {group.shortForm}
            </option>
          ))}
        </select>

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
