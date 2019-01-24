import React, { Component } from 'react';
import axios from 'axios';

class StudentRecord extends Component {
  state = {
    classes: [],
    groupId: 'default',
    studentId: 'default',
    students: [],
    error: null,
    success: null,
    attendanceData: [],
    internalExamMarksData: []
  };

  componentDidMount() {
    axios
      .get(`/api/classes?teacher=${this.props.teacher._id}`, {
        headers: { token: this.props.token }
      })
      .then(res => this.setState({ classes: res.data }))
      .catch(err => {});
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    if (e.target.name === 'groupId') {
      axios
        .get(`/api/students?group=${e.target.value}`, {
          headers: { token: this.props.token }
        })
        .then(res =>
          this.setState({ students: res.data, studentId: 'default' })
        )
        .catch(err => {});
    }
  };

  getTotalClassDays = () => {
    const { attendanceData } = this.state;
    return attendanceData.length;
  };

  getTotalAttendedDays = () => {
    const { attendanceData } = this.state;

    return attendanceData.reduce((accumulator, currentValue) => {
      if (currentValue.status) {
        return accumulator + 1;
      } else {
        return accumulator;
      }
    }, 0);
  };

  handleSubmit = e => {
    e.preventDefault();
    const { groupId, studentId, classes } = this.state;
    if (groupId === 'default' && studentId === 'default') {
      this.setState({ error: 'Fill Up Form Properly' });
      setTimeout(() => {
        this.setState({ error: null });
      }, 2000);
    } else {
      let classId = '';

      classes.forEach(eachClass => {
        if (eachClass.group._id === groupId) {
          classId = eachClass._id;
        }
      });

      axios
        .get(`/api/attendances?class=${classId}&student=${studentId}`, {
          headers: { token: this.props.token }
        })
        .then(res => this.setState({ attendanceData: res.data }))
        .catch(err => {});

      axios
        .get(`/api/internalExamMarks?class=${classId}&student=${studentId}`, {
          headers: { token: this.props.token }
        })
        .then(res => this.setState({ internalExamMarksData: res.data }))
        .catch(err => {});
    }
  };

  getAverageInternalMark = () => {
    const { internalExamMarksData } = this.state;
    let totalObtainedMarks = internalExamMarksData.reduce(
      (accumulator, currentValue) => {
        return accumulator + currentValue.obtainedMarks;
      },
      0
    );
    let totalFullMarks = internalExamMarksData.reduce(
      (accumulator, currentValue) => {
        return accumulator + currentValue.fullMarks;
      },
      0
    );

    return (totalObtainedMarks / totalFullMarks) * 20;
  };

  render() {
    return (
      <div className="studentrecord">
        {this.state.error ? (
          <p className="error-msg">{JSON.stringify(this.state.error)}</p>
        ) : null}
        {this.state.success ? (
          <p className="success-msg">{JSON.stringify(this.state.success)}</p>
        ) : null}
        <h1 className="heading1">Student Record</h1>
        <form onSubmit={this.handleSubmit}>
          <select
            value={this.state.groupId}
            name="groupId"
            onChange={this.onChange}
          >
            <option disabled value="default">
              Select Class
            </option>
            {this.state.classes.length > 0
              ? this.state.classes.map(singleClass => (
                  <option
                    value={singleClass.group._id}
                    key={singleClass.group._id}
                  >
                    {singleClass.subject.subjectCode} /{' '}
                    {singleClass.group.shortForm}
                  </option>
                ))
              : null}
          </select>
          <select
            value={this.state.studentId}
            name="studentId"
            onChange={this.onChange}
          >
            <option disabled value="default">
              Select Student
            </option>
            {this.state.students.length > 0
              ? this.state.students.map(student => (
                  <option value={student._id} key={student._id}>
                    {student.name}
                  </option>
                ))
              : null}
          </select>
          <input
            type="submit"
            value="Get Record"
            className="btn btn--primary btn--submit"
            style={{
              width: '40%',
              fontSize: '1.5rem',
              padding: '7px',
              height: 'auto'
            }}
          />
        </form>

        <div className="recordWrapper">
          {this.state.attendanceData.length > 0 ? (
            <div>
              <h2 className="h2">
                Total Class Days : {this.getTotalClassDays()}
              </h2>
              <h2 className="h2">
                Total Present Days : {this.getTotalAttendedDays()}
              </h2>
              <h2 className="h2">
                Attendance Percentage :{' '}
                {(this.getTotalAttendedDays() / this.getTotalClassDays()) * 100}{' '}
                %
              </h2>
            </div>
          ) : null}
          {this.state.internalExamMarksData.length > 0 ? (
            <div className="internalExamMarkWrapper">
              {this.state.internalExamMarksData.map(internalExamMark => (
                <div key={internalExamMark._id} className="internalExamMark">
                  <h2 className="h2">Exam No : {internalExamMark.examNo}</h2>
                  <h2 className="h2">
                    Obtained Marks : {internalExamMark.obtainedMarks}
                  </h2>
                  <h2 className="h2">
                    Full Marks : {internalExamMark.fullMarks}
                  </h2>
                </div>
              ))}

              <div className="internalExamMark">
                <h2 className="h2">
                  Average : {this.getAverageInternalMark()} / 20
                </h2>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

export default StudentRecord;
