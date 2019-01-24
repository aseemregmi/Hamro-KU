import React, { Component } from 'react';
import axios from 'axios';

class Notices extends Component {
  state = {
    notices: [],
    classes: [],
    class: 'default'
  };

  componentDidMount() {
    axios
      .get(`/api/classes?group=${this.props.student.group._id}`, {
        headers: { token: this.props.token }
      })
      .then(res => this.setState({ classes: res.data }))
      .catch(err => {});
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });

    if (e.target.name === 'class') {
      axios
        .get(`/api/notices?classId=${e.target.value}`, {
          headers: { token: this.props.token }
        })
        .then(res => this.setState({ notices: res.data }))
        .catch(err => {});
    }
  };

  render() {
    return (
      <div className="notice">
        <h1 className="heading1">Notices</h1>
        <div className="selectClassWrapper">
          <select
            name="class"
            value={this.state.class}
            onChange={this.handleChange}
          >
            <option disabled value="default">
              Select Class
            </option>
            {this.state.classes.length > 0
              ? this.state.classes.map(singleClass => (
                  <option value={singleClass._id} key={singleClass._id}>
                    {singleClass.subject.subjectCode}
                  </option>
                ))
              : null}
          </select>
        </div>

        <div className="noticesWrapper">
          {this.state.notices.length > 0 ? (
            this.state.notices.map(notice => (
              <div className="noticeWrapper" key={notice._id}>
                <span>
                  Date : {new Date(notice.noticeDate).toLocaleDateString()}
                </span>
                <span>{notice.body}</span>
                <span>
                  End Date :{' '}
                  {new Date(notice.noticeDeadline).toLocaleDateString()}
                </span>
              </div>
            ))
          ) : (
            <h2 className="heading2">No Notices</h2>
          )}
        </div>
      </div>
    );
  }
}

export default Notices;
