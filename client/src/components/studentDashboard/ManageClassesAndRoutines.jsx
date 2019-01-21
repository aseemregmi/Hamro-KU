import React, { Component } from 'react';
import axios from 'axios';

class ManageClassesAndRoutines extends Component {
  state = {
    teachers: [],
    subjects: [],
    classes: [],
    teacher: 'default',
    subject: 'default',
    modal: false,
    modalData: null,
    startTime: '',
    duration: '',
    day: 'default'
  };

  componentDidMount() {
    axios
      .get(`/api/classes?group=${this.props.student.group._id}`, {
        headers: { token: this.props.token }
      })
      .then(res => this.setState({ classes: res.data }));

    axios
      .get(`/api/teachers`, {
        headers: { token: this.props.token }
      })
      .then(res => this.setState({ teachers: res.data }));

    axios
      .get(`/api/subjects`, {
        headers: { token: this.props.token }
      })
      .then(res => this.setState({ subjects: res.data }));
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

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleNewClassSubmit = e => {
    e.preventDefault();

    const { teacher, subject } = this.state;
    axios
      .post(
        '/api/classes',
        {
          teacher,
          subject,
          group: this.props.student.group._id
        },
        {
          headers: { token: this.props.token }
        }
      )
      .then(res => {
        this.componentDidMount();
      })
      .catch(err => console.log(err));
  };

  handleModal = modalData => {
    this.setState({ modal: !this.state.modal, modalData });
  };

  handleRoutineSubmit = e => {
    e.preventDefault();

    const { startTime, duration, day, modalData } = this.state;

    axios
      .post(
        '/api/routines',
        {
          startTime,
          duration,
          day,
          classId: modalData._id
        },
        {
          headers: { token: this.props.token }
        }
      )
      .then(res => {
        console.log(res);
        this.setState({ modal: false });
        this.componentDidMount();
      })
      .catch(err => console.log(err));
  };

  render() {
    const { teachers, classes, subjects, modal, modalData } = this.state;
    if (teachers.length === 0 || subjects.length === 0) {
      return null;
    }
    return (
      <div className="manageClassRoutines">
        {modal ? (
          <div className="modal">
            <div
              className="close-btn"
              onClick={() => this.setState({ modal: false })}
            >
              X
            </div>
            <div className="contents">
              <h1 className="heading1">Class Details</h1>
              <div className="classdetails">
                <span>{modalData.subject.name}</span>
                <span>{modalData.teacher.name}</span>
              </div>

              <h2 className="heading2">Routine</h2>
              <div className="routinewrapper">
                {modalData.routine.map(routine => (
                  <div key={JSON.stringify(routine)}>
                    <span>{this.getDayFromNumber(routine.day)}</span> /{' '}
                    <span>{routine.startTime}</span>
                  </div>
                ))}
              </div>
              <h1 className="heading1">Add Routine To This Class</h1>
              <form className="addroutine" onSubmit={this.handleRoutineSubmit}>
                <div>
                  <label style={{ padding: '10px', fontSize: '1.5rem' }}>
                    Enter Start Time
                  </label>
                  <input
                    type="time"
                    value={this.state.startTime}
                    onChange={this.onChange}
                    name="startTime"
                    placeholder="Enter start time"
                  />
                </div>
                <div>
                  <input
                    placeholder="Enter duration"
                    type="text"
                    value={this.state.duration}
                    onChange={this.onChange}
                    name="duration"
                  />
                </div>
                <div>
                  <select
                    name="day"
                    onChange={this.onChange}
                    value={this.state.day}
                  >
                    <option disabled value="default">
                      Choose Day
                    </option>
                    <option value={0}>Sunday</option>
                    <option value={1}>Monday</option>
                    <option value={2}>Tuesday</option>
                    <option value={3}>Wednesday</option>
                    <option value={4}>Thursday</option>
                    <option value={5}>Friday</option>
                    <option value={6}>Saturday</option>
                  </select>
                </div>
                <div />
                <div>
                  <input type="submit" value="Add Routine" />
                </div>
              </form>
            </div>
          </div>
        ) : null}
        <div>
          <h1 className="heading1">Current Classes</h1>
          <div className="currentclasseswrapper">
            {classes.length > 0
              ? classes.map(singleClass => {
                  return (
                    <div
                      onClick={() => this.handleModal(singleClass)}
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
        <div>
          <h1 className="heading1">Add a New Class</h1>
          <form className="addnewclass" onSubmit={this.handleNewClassSubmit}>
            <select
              onChange={this.onChange}
              name="subject"
              value={this.state.subject}
            >
              <option disabled value="default">
                Choose Subject
              </option>
              {subjects.map(subject => (
                <option value={subject._id} key={subject.subjectCode}>
                  {subject.subjectCode}
                </option>
              ))}
            </select>
            <select
              onChange={this.onChange}
              value={this.state.teacher}
              name="teacher"
            >
              <option disabled value="default">
                Choose Teacher
              </option>
              {teachers.map(teacher => (
                <option value={teacher._id} key={teacher._id}>
                  {teacher.name}
                </option>
              ))}
            </select>
            <input type="submit" value="Add New Class" />
          </form>
        </div>
      </div>
    );
  }
}

export default ManageClassesAndRoutines;
