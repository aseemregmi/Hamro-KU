import React, { Component } from 'react';
import Input from './../utility/Input';
import axios from 'axios';

class Subject extends Component {
  state = {
    name: '',
    subjectCode: '',
    credit: '',
    error: null,
    success: null,
    subjects: []
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  componentDidMount() {
    this.fetchSubjects();
  }

  fetchSubjects = () => {
    axios
      .get('/api/subjects')
      .then(res => this.setState({ subjects: res.data }))
      .catch(err => alert(err));
  };

  handleSubmit = e => {
    e.preventDefault();

    const { name, subjectCode, credit } = this.state;

    axios
      .post('/api/subjects', { name, subjectCode, credit })
      .then(() => {
        this.setState({
          success: 'You have Created a subject'
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
        <span className="heading1">Register A New Subject</span>
        <form className="form" onSubmit={this.handleSubmit}>
          {this.state.error ? (
            <p className="error-msg">{JSON.stringify(this.state.error)}</p>
          ) : null}
          {this.state.success ? (
            <p className="success-msg">{JSON.stringify(this.state.success)}</p>
          ) : null}
          <div className="form__group">
            <Input
              placeholder="Enter Subject Name"
              name="name"
              value={this.state.name}
              handleChange={this.handleChange}
            />
          </div>

          <div className="form__group">
            <Input
              placeholder="Enter Subject Code"
              name="subjectCode"
              value={this.state.subjectCode}
              handleChange={this.handleChange}
            />
          </div>

          <div className="form__group">
            <Input
              placeholder="Enter Subject Credit"
              name="credit"
              value={this.state.credit}
              handleChange={this.handleChange}
            />
          </div>
          <Input type="submit" value="Submit" />
        </form>
        <br />
        <br />

        <span className="heading2">Registered Subjects</span>
        <div className="registered-groups">
          {this.state.subjects.map(subject => (
            <span style={{ fontSize: '1.25rem' }} key={subject.subjectCode}>
              {subject.subjectCode}
            </span>
          ))}
        </div>
      </div>
    );
  }
}

export default Subject;
