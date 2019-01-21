import React, { Component } from 'react';
import axios from 'axios';

class Classes extends Component {
  state = {
    classes: []
  };

  getDayFromNumber = num =>
    [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday'
    ][num];

  componentDidMount() {
    axios
      .get(`/api/classes?group=${this.props.student.group._id}`, {
        headers: { token: this.props.token }
      })
      .then(res => this.setState({ classes: res.data }));
  }

  render() {
    const { classes } = this.state;
    if (classes.length === 0) {
      return null;
    }
    return (
      <div className="classes">
        <h1 className="heading1">Current Classes</h1>
        <div className="currentclasseswrapper">
          {classes.length > 0
            ? classes.map(singleClass => {
                return (
                  <div
                    key={singleClass.subject.subjectCode}
                    className="currentclass"
                  >
                    <span>{singleClass.subject.name}</span>
                    <span>{singleClass.teacher.name}</span>
                    <div className="routinewrapper">
                      {singleClass.routine.map(routine => (
                        <div key={JSON.stringify(routine)}>
                          <span>{this.getDayFromNumber(routine.day)}</span> /{' '}
                          <span>{routine.startTime}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })
            : null}
        </div>
      </div>
    );
  }
}

export default Classes;
