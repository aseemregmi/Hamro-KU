import React, { Component } from 'react';
import Input from './../utility/Input';
import axios from 'axios';

class Departments extends Component {
  state = {
    name: '',
    description: '',
    lattitude: '',
    longitude: '',
    error: null,
    success: null,
    departments: []
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  componentDidMount() {
    this.fetchSubjects();
  }

  fetchSubjects = () => {
    axios
      .get('/api/departments', {
        headers: { token: this.props.token }
      })
      .then(res => this.setState({ departments: res.data }))
      .catch(err => alert(err));
  };

  handleSubmit = e => {
    e.preventDefault();

    const { name, description, lattitude, longitude } = this.state;

    axios
      .post(
        '/api/departments',
        { name, description, lattitude, longitude },
        {
          headers: { token: this.props.token }
        }
      )
      .then(() => {
        this.setState({
          success: 'You have Created a Department'
        });
        this.fetchSubjects();
        setTimeout(() => {
          this.setState({ success: null });
        }, 1500);
      })
      .catch(err => {
        this.setState({
          error: err.response.data
        });
        setTimeout(() => {
          this.setState({ error: null });
        }, 1500);
      });
  };

  render() {
    return (
      <div className="group">
        <span className="heading1">Register A New Department</span>
        <form className="form" onSubmit={this.handleSubmit}>
          {this.state.error ? (
            <p className="error-msg">{JSON.stringify(this.state.error)}</p>
          ) : null}
          {this.state.success ? (
            <p className="success-msg">{JSON.stringify(this.state.success)}</p>
          ) : null}
          <div className="form__group">
            <Input
              placeholder="Enter Department Name"
              name="name"
              value={this.state.name}
              handleChange={this.handleChange}
            />
          </div>

          <div className="form__group">
            <Input
              placeholder="Enter Department Description"
              name="description"
              value={this.state.description}
              handleChange={this.handleChange}
            />
          </div>

          <div className="form__group">
            <Input
              placeholder="Enter Lattitude of Department"
              name="lattitude"
              value={this.state.lattitude}
              handleChange={this.handleChange}
            />
          </div>
          <div className="form__group">
            <Input
              placeholder="Enter longitude of Department"
              name="longitude"
              value={this.state.longitude}
              handleChange={this.handleChange}
            />
          </div>
          <Input type="submit" value="Submit" />
        </form>
        <br />
        <br />

        <span className="heading2">Registered Departments</span>
        <div className="registered-groups">
          {this.state.departments.map(department => (
            <span style={{ fontSize: '1.25rem' }} key={department.lattitude}>
              {department.name}
            </span>
          ))}
        </div>
      </div>
    );
  }
}

export default Departments;
