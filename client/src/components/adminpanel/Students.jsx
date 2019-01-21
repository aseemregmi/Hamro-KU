import React, { Component } from 'react';
import axios from 'axios';
import Table from './Table';
import StudentProfile from './StudentProfile';

class Students extends Component {
  state = {
    students: [],
    studentsToBeDisplayed: [],
    filterType: ['Verification', 'Group'],
    filterTypeValue: 'Select Filter Type',
    filterFields: [],
    filterFieldValue: 'First Select Filter Type',
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
    if (this.state.filterFieldValue.length > 15) {
      alert('Choose Filter Options Wisely');
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
        default:
          return null;
      }
    });
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
              filterFieldValue: 'Select Filter Field'
            })
          )
          .catch(err => alert(err));
        break;

      case 'Verification':
        this.setState({
          filterFields: ['Verified', 'Not Verified'],
          filterTypeValue: option,
          filterFieldValue: 'Select Filter Field'
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
            {this.state.filterTypeValue}
            <div className="options">
              {this.state.filterType.map(option => {
                return (
                  <span
                    key={option}
                    onClick={() => {
                      this.handleFilterTypeValue(option);
                    }}
                  >
                    {option}
                  </span>
                );
              })}
            </div>
            &nbsp;&nbsp;&nbsp;
            <i className="fas fa-arrow-down" />
          </div>

          <div className="filter-fields">
            {
              <React.Fragment>
                {this.state.filterFieldValue}
                &nbsp;&nbsp;&nbsp;
                <i className="fas fa-arrow-down" />
                <div className="filter-items-container">
                  {this.state.filterFields.map(option => (
                    <span
                      key={option.shortForm || option}
                      onClick={() => {
                        this.setState({
                          filterFieldValue: option.shortForm || option
                        });
                      }}
                    >
                      {option.shortForm || option}
                    </span>
                  ))}
                </div>
              </React.Fragment>
            }
          </div>

          <button className="btn btn--primary" onClick={this.handleSubmit}>
            Submit
          </button>
        </div>

        <Table
          headers={['Name', 'Email', 'Group', 'Verified']}
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
