import React, { Component } from 'react';
import axios from 'axios';

class ManageAttendance extends Component {
  state = {
    classes: [],
    groupId: 'default',
    date: '',
    studentWithAttendance: [],
    error: null,
    success: null
  };

  componentDidMount() {
    axios
      .get(`/api/classes/?teacher=${this.props.teacher._id}`)
      .then(res => this.setState({ classes: res.data }))
      .catch(err => console.log(err));
  }

  handleSubmit = e => {
    e.preventDefault();

    const { classes, date, groupId, studentWithAttendance } = this.state;

    let classId = '';

    classes.forEach(eachClass => {
      if (eachClass.group._id === groupId) {
        classId = eachClass._id;
      }
    });

    axios
      .post('/api/students/attendance', {
        date,
        studentWithAttendance,
        classId
      })
      .then(() => {
        this.setState({
          success: 'Attendance Created Successfully',
          date: '',
          groupId: 'default',
          studentWithAttendance: []
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
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    if (e.target.name === 'groupId') {
      axios
        .get(`/api/students/?group=${e.target.value}`)
        .then(res => {
          let studentWithAttendance = [];
          res.data.forEach(student => {
            studentWithAttendance.push({
              _id: student._id,
              name: student.name,
              registrationNo: student.registrationNo,
              status: true
            });
          });
          this.setState({ studentWithAttendance });
        })
        .catch(err => console.log(err));
    }
  };

  handleAttendanceInput = (index, att, id) => {
    const updatedArray = [...this.state.studentWithAttendance];
    updatedArray[index]._id = id;
    updatedArray[index].status = att;
    this.setState({
      studentWithAttendance: updatedArray
    });
  };

  render() {
    return (
      <div className="manageattendance">
        {this.state.error ? (
          <p className="error-msg">{JSON.stringify(this.state.error)}</p>
        ) : null}
        {this.state.success ? (
          <p className="success-msg">{JSON.stringify(this.state.success)}</p>
        ) : null}
        <h1 className="heading1">Manage Attendance</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="grid2">
            <select
              value={this.state.groupId}
              name="groupId"
              onChange={this.handleChange}
            >
              <option disabled value="default">
                Select Class
              </option>
              {this.state.classes.length > 0
                ? this.state.classes.map(singleClass => (
                    <option value={singleClass.group._id} key={singleClass._id}>
                      {singleClass.subject.subjectCode} /{' '}
                      {singleClass.group.shortForm}
                    </option>
                  ))
                : null}
            </select>
            <input
              type="date"
              name="date"
              value={this.state.date}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="attendanceInputWrapper">
            {this.state.studentWithAttendance.length > 0
              ? this.state.studentWithAttendance.map((student, index) => (
                  <div className="attendanceInput" key={student._id}>
                    <span>
                      {student.name} / {student.registrationNo}
                    </span>
                    <div className="checkboxwithlabel">
                      <label>Is Present ?</label>
                      <input
                        type="checkbox"
                        checked={this.state.studentWithAttendance[index].status}
                        onChange={e =>
                          this.handleAttendanceInput(
                            index,
                            e.target.checked,
                            student._id
                          )
                        }
                      />
                    </div>
                  </div>
                ))
              : null}
          </div>
          <input
            type="submit"
            value="Submit"
            className="btn btn--primary btn--submit"
            style={{
              width: '40%',
              fontSize: '1.5rem',
              padding: '7px',
              height: 'auto',
              marginLeft: '30px'
            }}
          />
        </form>
      </div>
    );
  }
}

export default ManageAttendance;
