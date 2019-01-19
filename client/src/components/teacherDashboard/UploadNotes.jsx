import React, { Component } from 'react';
import axios from 'axios';

class UploadNotes extends Component {
  state = { classes: [], noteUrl: '', classId: 'default', name: '' };

  uploadButtonRef = React.createRef();

  componentDidMount() {
    axios.get(`/api/classes/?teacher=${this.props.teacher._id}`).then(res => {
      console.log(res.data);
      this.setState({ classes: res.data });
    });
  }

  handleNotesUpload = e => {
    e.preventDefault();

    const data = new FormData();
    data.append('file', e.target.files[0]);

    axios
      .post('/fileupload', data)
      .then(res => console.log(res))
      .catch(err => console.log(err));

    // return new Promise((resolve, reject) => {
    //   const xhr = new XMLHttpRequest();
    //   xhr.open('POST', '/imageupload');
    //   const data = new FormData();
    //   data.append('image', file);
    //   xhr.send(data);
    //   xhr.addEventListener('load', () => {
    //     const response = JSON.parse(xhr.responseText);
    //     resolve(response);
    //   });
    //   xhr.addEventListener('error', () => {
    //     const error = JSON.parse(xhr.responseText);
    //     reject(error);
    //   });
    // });
  };

  handleSubmit = e => {
    e.preventDefault();
  };

  render() {
    return (
      <div className="uploadnotes">
        <h1 className="heading1">Upload Notes</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            ref={this.uploadButtonRef}
            style={{ display: 'none' }}
            type="file"
            onChange={this.handleNotesUpload}
          />
          <button onClick={() => this.uploadButtonRef.current.click()}>
            Upload Note For This Subject
          </button>
        </form>
      </div>
    );
  }
}

export default UploadNotes;
