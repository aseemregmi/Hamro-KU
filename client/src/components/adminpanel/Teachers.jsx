import React, { Component } from 'react';
import axios from 'axios';
import Table from './Table';
import TeacherProfile from './TeacherProfile';

class Teachers extends Component {
  state = {
    teachers: [],
    teachersToBeDisplayed: [],
    filterType: ['Verification', 'Department'],
    filterTypeValue: 'default',
    filterFields: [],
    filterFieldValue: 'default',
    displayModal: false,
    teacher: {}
  };

  componentDidMount() {
    this.fetchTeachers();
  }

  handleDataInModal = teacher => {
    this.setState({ teacher });
  };

  handleDisplayModal = () => {
    this.setState({ displayModal: !this.state.displayModal });
  };

  fetchTeachers = () => {
    return new Promise((resolve, reject) => {
      axios
        .get('/api/teachers', {
          headers: { token: this.props.token }
        })
        .then(res => {
          this.setState(
            {
              teachers: res.data,
              teachersToBeDisplayed: res.data
            },
            () => resolve()
          );
        })
        .catch(err => alert(err));
    });
  };

  resetData = () => {
    this.fetchTeachers().then(async () => {
      await this.handleSubmit();
      this.state.teachersToBeDisplayed.forEach(teacher => {
        if (teacher._id === this.state.teacher._id) {
          this.setState({ teacher });
        }
      });
    });
  };

  handleDataInModal = teacher => {
    this.setState({ teacher });
  };

  handleDisplayModal = () => {
    this.setState({ displayModal: !this.state.displayModal });
  };

  handleSubmit = () => {
    if (
      this.state.filterFieldValue === 'default' ||
      this.state.filterTypeValue === 'default'
    ) {
      return;
    }
    return new Promise((resolve, reject) => {
      switch (this.state.filterTypeValue) {
        case 'Department':
          const teachersDepartmentWise = this.state.teachers
            .slice()
            .filter(
              teacher => teacher.department.name === this.state.filterFieldValue
            );
          this.setState({ teachersToBeDisplayed: teachersDepartmentWise }, () =>
            resolve()
          );
          break;

        case 'Verification':
          const teachersVerificationWise = this.state.teachers
            .slice()
            .filter(teacher => {
              if (this.state.filterFieldValue === 'Verified') {
                return teacher.verified;
              } else {
                return !teacher.verified;
              }
            });
          this.setState(
            {
              teachersToBeDisplayed: teachersVerificationWise
            },
            () => resolve()
          );
          break;
        default:
          reject();
      }
    });
  };

  handleTeacherSearch = e => {
    const name = e.target.value;
    if (name === '') {
      this.setState({ teachersToBeDisplayed: this.state.teachers });
    } else {
      const name = e.target.value;
      const teachers = this.state.teachers.slice().filter(teacher => {
        if (teacher.name.toLowerCase().indexOf(name.toLowerCase()) >= 0) {
          return true;
        } else {
          return false;
        }
      });
      this.setState({ teachersToBeDisplayed: teachers });
    }
  };

  handleFilterTypeValue = option => {
    switch (option) {
      case 'Department':
        axios
          .get('/api/departments', {
            headers: { token: this.props.token }
          })
          .then(res =>
            this.setState({
              filterTypeValue: option,
              filterFields: res.data,
              filterFieldValue: 'default'
            })
          )
          .catch(err => alert(err));
        break;
      case 'Verification':
        this.setState({
          filterFields: ['Verified', 'Not Verified'],
          filterTypeValue: option,
          filterFieldValue: 'default'
        });
        break;
      default:
        return null;
    }
  };

  render() {
    return (
      <div className="students">
        {this.state.displayModal ? (
          <TeacherProfile
            handleDisplayModal={this.handleDisplayModal}
            teacher={this.state.teacher}
            resetData={this.resetData}
            token={this.props.token}
          />
        ) : null}
        <div className="students__filter-container">
          <span>Filter By : </span>

          <div className="filter-type">
            <select
              name="filterTypeValue"
              value={this.state.filterTypeValue}
              onChange={e => this.handleFilterTypeValue(e.target.value)}
            >
              <option disabled value="default">
                Select Filter Type
              </option>
              {this.state.filterType.map(option => {
                return (
                  <option key={option} value={option}>
                    {option}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="filter-fields">
            <select
              name="filterFieldValue"
              value={this.state.filterFieldValue}
              onChange={e => {
                this.setState(
                  {
                    filterFieldValue: e.target.value
                  },
                  () => this.handleSubmit()
                );
              }}
            >
              <option value="default" default>
                Select Filter Field
              </option>

              {this.state.filterFields.map(option => (
                <option
                  key={option.name || option}
                  value={option.name || option}
                >
                  {option.name || option}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="searchField">
          <input
            type="text"
            placeholder="Enter name of teacher to search"
            onChange={this.handleTeacherSearch}
          />
        </div>
        <Table
          headers={['Name', 'Email', 'Department', 'Verified']}
          teacherTable={true}
          data={this.state.teachersToBeDisplayed}
          handleDataInModal={this.handleDataInModal}
          handleDisplayModal={this.handleDisplayModal}
        />
      </div>
    );
  }
}

export default Teachers;
