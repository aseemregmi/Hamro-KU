import React, { Component } from 'react';
import axios from 'axios';

class UploadNotes extends Component {
  state = {
    classes: [],
    classId: 'default',
    name: '',
    error: null,
    success: null,
    classofOfNotesToBeDisplayed: 'default',
    notesToBeDisplayed: [],
    uploadedPercentage: null
  };

  uploadButtonRef = React.createRef();

  componentDidMount() {
    axios
      .get(`/api/classes/?teacher=${this.props.teacher._id}`, {
        headers: { token: this.props.token }
      })
      .then(res => {
        this.setState({ classes: res.data });
      });
  }

  handleNotesUpload = e => {
    if (this.state.classId === 'default' || this.state.name === '') {
      this.setState({ error: 'Select Class And Give Name first' });
      setTimeout(() => {
        this.setState({ error: null });
      }, 2000);
    } else if (e.target.files[0].size >= 25000000) {
      this.setState({ error: 'File should be smaller than 25 MB' });
      setTimeout(() => {
        this.setState({ error: null });
      }, 2000);
    } else {
      const data = new FormData();
      data.append('file', e.target.files[0]);
      axios
        .post('/fileupload', data, {
          headers: { token: this.props.token },
          onUploadProgress: progressEvent => {
            this.setState({
              uploadedPercentage: Math.round(
                (progressEvent.loaded / progressEvent.total) * 100
              )
            });
          }
        })
        .then(res => {
          this.setState({ uploadedPercentage: null });
          let noteUrl = res.data.data.link;
          axios
            .post(
              '/api/notes',
              {
                noteUrl,
                name: this.state.name,
                classId: this.state.classId
              },
              {
                headers: { token: this.props.token }
              }
            )
            .then(res => {
              this.setState({
                success: 'Successfully Uploaded Note',
                classId: 'default',
                name: ''
              });
              setTimeout(() => {
                this.setState({ success: null });
              }, 2000);
            })
            .catch(err => {
              this.setState({ error: 'Failed To Upload Note' });
              setTimeout(() => {
                this.setState({ error: null });
              }, 2000);
            });
        })
        .catch(err => {
          this.setState({ error: 'Failed To Upload Note' });
          setTimeout(() => {
            this.setState({ error: null });
          }, 2000);
        });
    }
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    if (e.target.name === 'classofOfNotesToBeDisplayed') {
      axios
        .get(`/api/notes?classId=${e.target.value}`, {
          headers: { token: this.props.token }
        })
        .then(res => this.setState({ notesToBeDisplayed: res.data }))
        .catch(err => {});
    }
  };

  handleSubmit = e => {
    e.preventDefault();
  };

  render() {
    if (this.state.classes.length === 0) {
      return null;
    }
    return (
      <div className="uploadnotes">
        {this.state.error ? (
          <p className="error-msg">{JSON.stringify(this.state.error)}</p>
        ) : null}
        {this.state.success ? (
          <p className="success-msg">{JSON.stringify(this.state.success)}</p>
        ) : null}
        <h1 className="heading1">Upload Note</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.onChange}
            placeholder="Enter Name Of Note"
          />
          <select
            name="classId"
            value={this.state.classId}
            onChange={this.onChange}
          >
            <option disabled value="default">
              Select Class
            </option>
            {this.state.classes.map(singleClass => (
              <option key={singleClass._id} value={singleClass._id}>
                {singleClass.subject.name} / {singleClass.group.shortForm}
              </option>
            ))}
          </select>
          <div>
            <input
              ref={this.uploadButtonRef}
              style={{ display: 'none' }}
              type="file"
              onChange={this.handleNotesUpload}
            />
            <button
              style={{ cursor: 'pointer' }}
              onClick={() => this.uploadButtonRef.current.click()}
            >
              Upload Note For This Class
            </button>
          </div>

          {this.state.uploadedPercentage ? (
            <h3> Uploaded Percentage : {this.state.uploadedPercentage} %</h3>
          ) : null}
        </form>

        <div>
          <h1 className="heading1">Uploaded Notes</h1>
          <select
            className="selectclass2"
            name="classofOfNotesToBeDisplayed"
            value={this.state.classofOfNotesToBeDisplayed}
            onChange={this.onChange}
          >
            <option disabled value="default">
              Select Class
            </option>
            {this.state.classes.map(singleClass => (
              <option key={singleClass._id} value={singleClass._id}>
                {singleClass.subject.name} / {singleClass.group.shortForm}
              </option>
            ))}
          </select>
          <div className="notesContainer">
            {this.state.notesToBeDisplayed.length > 0 ? (
              this.state.notesToBeDisplayed.map(notes => (
                <div key={notes.noteUrl}>
                  <span className="noteinfo">{notes.name}</span>
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
      </div>
    );
  }
}

export default UploadNotes;
