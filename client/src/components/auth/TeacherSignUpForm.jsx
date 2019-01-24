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
      department: 'default',
      post: ''
    };
  }

  componentDidMount() {
    axios
      .get('/api/departments')
      .then(res => this.setState({ departments: res.data }));
  }

  handleChange = e => {
    if (e.target.name === 'email') {
      e.target.value = e.target.value.toLowerCase();
    }
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

    if (name === '' || name.split(' ').length <= 1 || name.length < 9) {
      this.setState({ error: 'Enter Valid Name' });
      setTimeout(() => {
        this.setState({ error: null });
      }, 2000);
    } else if (password.length <= 6) {
      this.setState({ error: 'Password Should Be Larger Than 6 digits' });
      setTimeout(() => {
        this.setState({ error: null });
      }, 2000);
    } else if (parseInt(phoneNo).toString().length !== 10) {
      this.setState({ error: 'Enter Valid Phone Number' });
      setTimeout(() => {
        this.setState({ error: null });
      }, 2000);
    } else if (address.split(' ').length < 2 || address.length < 7) {
      this.setState({ error: 'Enter Valid Address' });
      setTimeout(() => {
        this.setState({ error: null });
      }, 2000);
    } else {
      axios
        .post('/api/teachers', {
          name,
          email,
          password,
          department,
          phoneNo,
          post,
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
            address: '',
            department: 'default',
            post: ''
          });
          setTimeout(() => {
            this.setState({
              success: null
            });
            this.props.history.push('/');
          }, 6000);
        })
        .catch(res => {
          if (res.response.data.indexOf('to be unique') > 0) {
            this.setState({
              error: 'You Already Signed Up With These Credentials'
            });
            setTimeout(() => {
              this.setState({ error: null });
            }, 2000);
          } else {
            this.setState({ error: 'Unknown Error Occurred' });
            setTimeout(() => {
              this.setState({ error: null });
            }, 2000);
          }
        });
    }
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

        <select
          style={{
            fontSize: '1.5rem',
            padding: '10px',
            boxShadow: '0rem 0.3rem 0.9rem #f7f7f7',
            border: 'none'
          }}
          name="department"
          value={this.state.department}
          onChange={this.handleChange}
        >
          <option disabled value="default">
            Select Your Department
          </option>

          {this.state.departments.map(department => (
            <option key={department._id} value={department._id}>
              {department.name}
            </option>
          ))}
        </select>

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
