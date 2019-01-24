import React, { Component } from 'react';
import axios from 'axios';

class Notes extends Component {
  state = {
    classes: [],
    notes: []
  };

  componentDidMount() {
    axios
      .get(`/api/classes?group=${this.props.student.group._id}`, {
        headers: { token: this.props.token }
      })
      .then(res => this.setState({ classes: res.data }))
      .catch(err => {});
  }

  onChange = e => {
    axios
      .get(`/api/notes?classId=${e.target.value}`, {
        headers: { token: this.props.token }
      })
      .then(res => this.setState({ notes: res.data }))
      .catch(err => {});
  };

  render() {
    return (
      <div className="notes">
        <h1 className="heading1">Uploaded Notes</h1>
        <select
          className="selectclass2"
          name="classofOfNotesToBeDisplayed"
          defaultValue="default"
          onChange={this.onChange}
        >
          <option value="default" disabled>
            Select Class
          </option>
          {this.state.classes.map(singleClass => (
            <option key={singleClass._id} value={singleClass._id}>
              {singleClass.subject.name} / {singleClass.group.shortForm}
            </option>
          ))}
        </select>
        <div className="notesContainer">
          {this.state.notes.length > 0 ? (
            this.state.notes.map(notes => (
              <div key={notes.noteUrl}>
                <span className="noteinfo">
                  {notes.name} / {notes.classId.teacher.name}
                </span>
                <a
                  rel="noopener noreferrer"
                  target="_blank"
                  href={notes.noteUrl}
                  className="btn btn--primary"
                >
                  Download Note
                </a>
              </div>
            ))
          ) : (
            <h2 className="heading2">No Notes Uploaded</h2>
          )}
        </div>
      </div>
    );
  }
}

export default Notes;
