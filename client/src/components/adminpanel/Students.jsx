import React, { Component } from 'react';
import axios from 'axios';
import Table from './Table';
import StudentProfile from './StudentProfile';

class Students extends Component {
  state = {
    students: [],
    studentsToBeDisplayed: [],
    filterType: ['Verification', 'Group', 'Special Authority'],
    filterTypeValue: 'default',
    filterFields: [],
    filterFieldValue: 'default',
    displayModal: false,
    student: {}
  };

  componentDidMount() {
    this.fetchStudents();
  }

  fetchStudents = () => {
    return new Promise((resolve, reject) => {
      axios
        .get('/api/students', {
          headers: { token: this.props.token }
        })
        .then(res => {
          this.setState(
            {
              students: res.data,
              studentsToBeDisplayed: res.data
            },
            () => resolve()
          );
        })
        .catch(err => alert(err));
    });
  };

  resetData = () => {
    this.fetchStudents().then(async () => {
      if (this.state.filterFieldValue.length <= 15) {
        await this.handleSubmit();
      }
      this.state.studentsToBeDisplayed.forEach(student => {
        if (student._id === this.state.student._id) {
          this.setState({ student });
        }
      });
    });
  };

  handleDataInModal = student => {
    this.setState({ student });
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
        case 'Group':
          const studentsGroupWise = this.state.students
            .slice()
            .filter(
              student => student.group.shortForm === this.state.filterFieldValue
            );
          this.setState({ studentsToBeDisplayed: studentsGroupWise }, () =>
            resolve()
          );
          break;

        case 'Verification':
          const studentsVerificationWise = this.state.students
            .slice()
            .filter(student => {
              if (this.state.filterFieldValue === 'Verified') {
                return student.verified;
              } else {
                return !student.verified;
              }
            });
          this.setState(
            {
              studentsToBeDisplayed: studentsVerificationWise
            },
            () => resolve()
          );
          break;

        case 'Special Authority':
          const studentsAuthorityWise = this.state.students
            .slice()
            .filter(student => {
              if (this.state.filterFieldValue === 'Authorized') {
                return student.specialAuthority;
              } else {
                return !student.specialAuthority;
              }
            });
          this.setState(
            {
              studentsToBeDisplayed: studentsAuthorityWise
            },
            () => resolve()
          );
          break;
        default:
          reject();
      }
    });
  };

  handleStudentSearch = e => {
    const name = e.target.value;
    if (name === '') {
      this.setState({ studentsToBeDisplayed: this.state.students });
    } else {
      const name = e.target.value;
      const students = this.state.students.slice().filter(student => {
        if (student.name.toLowerCase().indexOf(name.toLowerCase()) >= 0) {
          return true;
        } else {
          return false;
        }
      });
      this.setState({ studentsToBeDisplayed: students });
    }
  };

  handleFilterTypeValue = option => {
    switch (option) {
      case 'Group':
        axios
          .get('/api/groups', {
            headers: { token: this.props.token }
          })
          .then(res =>
            this.setState({
              filterTypeValue: option,
              filterFields: res.data,
              filterFieldValue: 'default',
              studentsToBeDisplayed: this.state.students
            })
          )
          .catch(err => alert(err));
        break;

      case 'Verification':
        this.setState({
          filterFields: ['Verified', 'Not Verified'],
          filterTypeValue: option,
          filterFieldValue: 'default',
          studentsToBeDisplayed: this.state.students
        });
        break;

      case 'Special Authority':
        this.setState({
          filterFields: ['Authorized', 'Not Authorized'],
          filterTypeValue: option,
          filterFieldValue: 'default',
          studentsToBeDisplayed: this.state.students
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
          <StudentProfile
            handleDisplayModal={this.handleDisplayModal}
            student={this.state.student}
            resetData={this.resetData}
            token={this.props.token}
          />
        ) : null}
        <div className="students__filter-container">
          <span>Filter By : </span>
          <div className="filter-type">
            <select
              name="filterTypeValue"
              onChange={e => this.handleFilterTypeValue(e.target.value)}
              value={this.state.filterTypeValue}
            >
              <option disabled value="default">
                Select Filter Type
              </option>
              {this.state.filterType.map(option => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className="filter-fields">
            <select
              name="filterFieldValue"
              value={this.state.filterFieldValue}
              onChange={e =>
                this.setState(
                  {
                    filterFieldValue: e.target.value
                  },
                  () => this.handleSubmit()
                )
              }
            >
              <option disabled value="default">
                Select Filter Field Value`
              </option>
              {this.state.filterFields.map(option => (
                <option
                  key={option.shortForm || option}
                  value={option.shortForm || option}
                >
                  {option.shortForm || option}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="searchField">
          <input
            type="search"
            placeholder="Enter name of student to search"
            onChange={this.handleStudentSearch}
          />
        </div>
        <Table
          headers={['Name', 'Email', 'Group', 'SpecialAuthority', 'Verified']}
          studentTable={true}
          data={this.state.studentsToBeDisplayed}
          handleDataInModal={this.handleDataInModal}
          handleDisplayModal={this.handleDisplayModal}
        />
      </div>
    );
  }
}

export default Students;
