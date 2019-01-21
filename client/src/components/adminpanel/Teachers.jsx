import React, { Component } from 'react';
import axios from 'axios';
import Table from './Table';
import TeacherProfile from './TeacherProfile';

class Teachers extends Component {
  state = {
    teachers: [],
    teachersToBeDisplayed: [],
    filterType: ['Verification', 'Department'],
    filterTypeValue: 'Select Filter Type',
    filterFields: [],
    filterFieldValue: 'First Select Filter Type',
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
          return null;
      }
    });
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
                      key={option.name || option}
                      onClick={() => {
                        this.setState({
                          filterFieldValue: option.name || option
                        });
                      }}
                    >
                      {option.name || option}
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
