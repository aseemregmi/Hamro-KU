import React, { Component } from 'react';
import axios from 'axios';

class SendNotice extends Component {
  state = {
    classes: [],
    class: 'default',
    body: '',
    noticeDeadline: '',
    error: null,
    success: null,
    notices: [],
    class2: 'default'
  };

  componentDidMount() {
    axios
      .get(`/api/classes?teacher=${this.props.teacher._id}`, {
        headers: { token: this.props.token }
      })
      .then(res => this.setState({ classes: res.data }))
      .catch(err => {});
  }

  handleSubmit = e => {
    e.preventDefault();

    if (this.state.class === 'default') {
      this.setState({ error: 'Fill Up Form Properly' });
      setTimeout(() => {
        this.setState({ error: null });
      }, 2000);
    } else {
      axios
        .post(
          `/api/notices`,
          {
            noticeDeadline: this.state.noticeDeadline,
            classId: this.state.class,
            body: this.state.body
          },
          {
            headers: { token: this.props.token }
          }
        )
        .then(() => {
          this.setState({
            success: 'Notice Sent Successfully',
            class: 'default',
            body: '',
            noticeDeadline: ''
          });
          setTimeout(() => {
            this.setState({ success: null });
          }, 2000);
        })
        .catch(err => {
          this.setState({ error: err });
          setTimeout(() => {
            this.setState({ error: null });
          }, 2000);
        });
    }
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    if (e.target.name === 'class2') {
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
      <div className="sendnotice">
        <h1 className="heading1">Send Notice</h1>

        <form onSubmit={this.handleSubmit}>
          {this.state.error ? (
            <p className="error-msg">{JSON.stringify(this.state.error)}</p>
          ) : null}
          {this.state.success ? (
            <p className="success-msg">{JSON.stringify(this.state.success)}</p>
          ) : null}
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
                    {' '}
                    {singleClass.subject.subjectCode} /{' '}
                    {singleClass.group.shortForm}{' '}
                  </option>
                ))
              : null}
          </select>
          <div>
            <label>Place date of notice deadline</label>
            <input
              type="date"
              name="noticeDeadline"
              onChange={this.handleChange}
              value={this.state.noticeDeadline}
              required
            />
          </div>
          <input
            type="text"
            name="body"
            value={this.state.body}
            placeholder="Enter Notice Body"
            onChange={this.handleChange}
            required
          />
          <input
            type="submit"
            value="Send Notice"
            className="btn btn--submit btn--secondary"
            style={{ height: 'auto' }}
          />
        </form>
        <div>
          <h1 className="heading1">Sent Notices</h1>
          <div className="selectClassWrapper">
            <select
              name="class2"
              value={this.state.class2}
              onChange={this.handleChange}
            >
              <option disabled value="default">
                Select Class
              </option>
              {this.state.classes.length > 0
                ? this.state.classes.map(singleClass => (
                    <option value={singleClass._id} key={singleClass._id}>
                      {' '}
                      {singleClass.subject.subjectCode} /{' '}
                      {singleClass.group.shortForm}{' '}
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
      </div>
    );
  }
}

export default SendNotice;
