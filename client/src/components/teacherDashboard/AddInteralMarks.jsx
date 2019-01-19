import React, { Component } from 'react';
import axios from 'axios';

class AddInternalMarks extends Component {
  state = {
    classes: [],
    groupId: 'default',
    studentIdWithMarks: [],
    examNo: '',
    fullMarks: '',
    error: null,
    success: null
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    if (e.target.name === 'groupId') {
      axios
        .get(`/api/students/?group=${e.target.value}`)
        .then(res => {
          let studentIdWithMarks = [];
          res.data.forEach(student => {
            studentIdWithMarks.push({
              _id: student._id,
              name: student.name,
              registrationNo: student.registrationNo
            });
          });
          this.setState({ studentIdWithMarks });
        })
        .catch(err => console.log(err));
    }
  };

  componentDidMount() {
    axios
      .get(`/api/classes/?teacher=${this.props.teacher._id}`)
      .then(res => this.setState({ classes: res.data }))
      .catch(err => console.log(err));
  }

  handleMarksInput = (index, marks, id) => {
    const updatedArray = [...this.state.studentIdWithMarks];
    updatedArray[index]._id = id;
    updatedArray[index].marks = marks;
    this.setState({
      studentIdWithMarks: updatedArray
    });
  };

  handleSubmit = async e => {
    e.preventDefault();

    const {
      examNo,
      studentIdWithMarks,
      groupId,
      fullMarks,
      classes
    } = this.state;

    let classId = '';

    classes.forEach(eachClass => {
      if (eachClass.group._id === groupId) {
        classId = eachClass._id;
      }
    });

    console.log(classId);

    if (
      examNo === '' ||
      groupId === 'default' ||
      fullMarks == '' ||
      classId === ''
    ) {
      this.setState({
        error: 'Please Fill Up Form Properly Before Submitting'
      });

      setTimeout(() => {
        this.setState({ error: null });
      }, 2000);
    } else {
      axios
        .post('/api/students/internalexammarks', {
          examNo,
          studentIdWithMarks,
          groupId,
          fullMarks,
          classId
        })
        .then(res => {
          this.setState({
            success: 'Marks Addedd Successfully',
            groupId: 'default',
            studentIdWithMarks: [],
            examNo: '',
            fullMarks: ''
          });
          setTimeout(() => {
            this.setState({ success: null });
          }, 2000);
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  render() {
    if (this.state.classes.length === 0) return null;
    return (
      <div className="addinternalmarks">
        {this.state.error ? (
          <p className="error-msg">{JSON.stringify(this.state.error)}</p>
        ) : null}
        {this.state.success ? (
          <p className="success-msg">{JSON.stringify(this.state.success)}</p>
        ) : null}
        <h1 className="heading1">Add Internal Marks</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="grid3">
            <select
              name="groupId"
              value={this.state.groupId}
              onChange={this.onChange}
            >
              <option disabled value="default">
                Choose Class
              </option>
              {this.state.classes.map(singleClass => (
                <option key={singleClass._id} value={singleClass.group._id}>
                  {singleClass.subject.subjectCode} /{' '}
                  {singleClass.group.shortForm}
                </option>
              ))}
            </select>
            <input
              type="number"
              name="examNo"
              value={this.state.examNo}
              onChange={this.onChange}
              placeholder="Enter Exam Number"
            />
            <input
              type="number"
              name="fullMarks"
              value={this.state.fullMarks}
              onChange={this.onChange}
              placeholder="Enter FullMarks"
            />
          </div>

          <div className="marksInputWrapper">
            {this.state.studentIdWithMarks.length > 0
              ? this.state.studentIdWithMarks.map((student, index) => (
                  <div className="marksInput" key={index}>
                    <span>
                      {student.name} / {student.registrationNo}
                    </span>
                    <input
                      type="text"
                      placeholder="Enter marks of this student"
                      required
                      value={this.state.studentIdWithMarks[index].marks}
                      onChange={e =>
                        this.handleMarksInput(
                          index,
                          e.target.value,
                          student._id
                        )
                      }
                    />
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
              height: 'auto'
            }}
          />
        </form>
      </div>
    );
  }
}

export default AddInternalMarks;
