import React, { Component } from 'react';
import Input from './../utility/Input';
import axios from 'axios';

class Group extends Component {
  state = {
    groupName: '',
    year: '',
    shortForm: '',
    school: '',
    error: null,
    success: null,
    groups: []
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  componentDidMount() {
    this.fetchGroups();
  }

  fetchGroups = () => {
    axios
      .get('/api/groups', {
        headers: { token: this.props.token }
      })
      .then(res => this.setState({ groups: res.data }))
      .catch(err => alert(err));
  };

  handleSubmit = e => {
    e.preventDefault();

    const { groupName, year, shortForm, school } = this.state;

    axios
      .post(
        '/api/groups',
        { groupName, year, shortForm, school },
        {
          headers: { token: this.props.token }
        }
      )
      .then(() => {
        this.setState({
          success: 'You have Created a group'
        });
        this.fetchGroups();
        setTimeout(() => {
          this.setState({ success: null });
        }, 1500);
      })
      .catch(err => {
        this.setState({
          error: err.response.data
        });
        console.log(err.response.data);
        setTimeout(() => {
          this.setState({ error: null });
        }, 1500);
      });
  };

  render() {
    return (
      <div className="group">
        <span className="heading1">Register A New Group</span>
        <form className="form" onSubmit={this.handleSubmit}>
          {this.state.error ? (
            <p className="error-msg">{JSON.stringify(this.state.error)}</p>
          ) : null}
          {this.state.success ? (
            <p className="success-msg">{JSON.stringify(this.state.success)}</p>
          ) : null}
          <div className="form__group">
            <Input
              placeholder="Enter Group Name"
              name="groupName"
              value={this.state.groupName}
              handleChange={this.handleChange}
            />
          </div>

          <div className="form__group">
            <Input
              placeholder="Enter Group Year"
              name="year"
              value={this.state.year}
              handleChange={this.handleChange}
            />
          </div>

          <div className="form__group">
            <Input
              placeholder="Enter Group ShortForm"
              name="shortForm"
              value={this.state.shortForm}
              handleChange={this.handleChange}
            />
          </div>
          <div className="form__group">
            <Input
              placeholder="Enter Group School"
              name="school"
              value={this.state.school}
              handleChange={this.handleChange}
            />
          </div>
          <Input type="submit" value="Submit" />
        </form>
        <br />
        <br />

        <span className="heading2">Registered Groups</span>
        <div className="registered-groups">
          {this.state.groups.map(group => (
            <span style={{ fontSize: '1.25rem' }} key={group.shortForm}>
              {group.shortForm}
            </span>
          ))}
        </div>
      </div>
    );
  }
}

export default Group;
