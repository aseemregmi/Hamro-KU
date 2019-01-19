import React, { Component } from 'react';
import axios from 'axios';

class MyClasses extends Component {
  state = {
    classes: []
  };

  componentDidMount() {
    axios
      .get(`/api/classes/?teacher=${this.props.teacher._id}`)
      .then(res => this.setState({ classes: res.data }))
      .catch(err => console.log(err));
  }

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

  render() {
    const { classes } = this.state;
    if (classes.length === 0) {
      return null;
    }
    return (
      <div className="myclasses">
        <h1 className="heading1">My Classes</h1>
        <div className="classesContainer">
          {classes.map(singleClass => (
            <div className="eachClass" key={JSON.stringify(singleClass)}>
              <span>
                {singleClass.subject.subjectCode} /{' '}
                {singleClass.group.shortForm}
              </span>
              <div className="routinescontainer">
                {singleClass.routine.map(routine => (
                  <span key={JSON.stringify(routine)} className="singleroutine">
                    {this.getDayFromNumber(routine.day)} / {routine.startTime}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default MyClasses;
