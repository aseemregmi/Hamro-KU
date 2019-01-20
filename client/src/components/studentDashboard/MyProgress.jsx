import React, { Component } from 'react';
import axios from 'axios';
import Chart from 'react-apexcharts';

class MyProgress extends Component {
  state = {
    student: null,
    _id: 'default',
    totalAttendanceSeries: [],
    totalAttendanceOptions: {
      plotOptions: {
        pie: {
          expandOnClick: false
        }
      },
      labels: ['AttendedDays', 'Not Attended Days'],
      legend: {
        show: false
      }
    },
    totalInternalExamMarkOptions: {
      labels: ['Internal Exam Marks']
    },
    totalInternalExamMarkSeries: [],
    classes: [],
    columnChartAttendanceOptions: {},
    columnChartAttendanceSeries: [],
    columnChartInternalExamMarksOptions: {},
    columnChartInternalExamMarksSeries: []
  };

  getAttendedDays = classId => {
    const { attendance } = this.state.student;

    return attendance.reduce((accumulator, currentAttendance) => {
      if (currentAttendance.class._id === classId && currentAttendance.status) {
        return accumulator + 1;
      } else {
        return accumulator;
      }
    }, 0);
  };

  getTotalDays = classId => {
    const { attendance } = this.state.student;
    return attendance.reduce((accumulator, currentAttendance) => {
      if (currentAttendance.class._id === classId) {
        return accumulator + 1;
      } else {
        return accumulator;
      }
    }, 0);
  };

  getAbsentDays = classId => {
    const { attendance } = this.state.student;
    return attendance.reduce((accumulator, currentAttendance) => {
      if (
        currentAttendance.class._id === classId &&
        !currentAttendance.status
      ) {
        return accumulator + 1;
      } else {
        return accumulator;
      }
    }, 0);
  };

  getObtainedMarks = (classId, examNo) => {
    const { internalExamMarks } = this.state.student;
    let examMark;

    internalExamMarks.forEach(internalExam => {
      if (internalExam.examNo === examNo && internalExam.class._id === classId)
        examMark = internalExam.obtainedMarks;
    });

    return examMark;
  };

  getNoOfExamsHeldTillNow = () => {
    let noOfExams = 0;
    const { internalExamMarks } = this.state.student;
    internalExamMarks.forEach(internalExam => {
      if (internalExam.examNo > noOfExams) noOfExams = internalExam.examNo;
    });

    let dummyArray = new Array(noOfExams).fill(null);

    return dummyArray;
  };

  async componentDidMount() {
    const { data } = await axios.get(
      `/api/students/withalldata?_id=${this.props.student._id}`
    );
    this.setState({ student: data }, () => {
      this.setState({
        totalAttendanceSeries: [
          this.getTotalAttendedDays(),
          this.getTotalClassDays() - this.getTotalAttendedDays()
        ],
        totalInternalExamMarkSeries: [
          Math.round(
            (this.getTotalObtainedMarks() / this.getTotalFullMarks()) * 100
          )
        ]
      });
    });

    console.log(this.getNoOfExamsHeldTillNow());

    axios
      .get(`/api/classes/?group=${this.props.student.group._id}`)
      .then(res =>
        this.setState({ classes: res.data }, () => {
          let columnChartAttendanceSeries = this.getNoOfExamsHeldTillNow().map(
            (data, index) => {
              return {
                name: `Exam ${index + 1}`,
                data: this.state.classes.map(singleClass =>
                  this.getObtainedMarks(singleClass._id, index + 1)
                )
              };
            }
          );

          if (
            columnChartAttendanceSeries === undefined ||
            columnChartAttendanceSeries.length == 0
          ) {
            columnChartAttendanceSeries = [{ name: 'Exam 1', data: [] }];
          }

          this.setState({
            columnChartAttendanceSeries: [
              {
                name: 'Absent Days',
                data: this.state.classes.map(singleClass =>
                  this.getAbsentDays(singleClass._id)
                )
              },
              {
                name: 'Present Days',
                data: this.state.classes.map(singleClass =>
                  this.getAttendedDays(singleClass._id)
                )
              },
              {
                name: 'Total Class Days',
                data: this.state.classes.map(singleClass =>
                  this.getTotalDays(singleClass._id)
                )
              }
            ],
            columnChartInternalExamMarksSeries: columnChartAttendanceSeries,
            columnChartAttendanceOptions: {
              plotOptions: {
                bar: {
                  horizontal: false,
                  endingShape: 'rounded',
                  columnWidth: '55%'
                }
              },
              dataLabels: {
                enabled: true
              },
              stroke: {
                show: true,
                width: 2,
                colors: ['transparent']
              },
              xaxis: {
                categories: this.state.classes.map(
                  singleClass => singleClass.subject.subjectCode
                )
              },
              yaxis: {
                title: {
                  text: ' No of Days '
                }
              },
              fill: {
                opacity: 1
              },
              tooltip: {
                y: {
                  formatter: function(val) {
                    return val + ' days';
                  }
                }
              }
            },
            columnChartInternalExamMarksOptions: {
              plotOptions: {
                bar: {
                  horizontal: false,
                  endingShape: 'rounded',
                  columnWidth: '55%'
                }
              },
              dataLabels: {
                enabled: true
              },
              stroke: {
                show: true,
                width: 2,
                colors: ['transparent']
              },
              xaxis: {
                categories: this.state.classes.map(
                  singleClass => singleClass.subject.subjectCode
                )
              },
              yaxis: {
                title: {
                  text: ' Marks '
                }
              },
              fill: {
                opacity: 1
              },
              tooltip: {
                y: {
                  formatter: function(val) {
                    return val + ' marks';
                  }
                }
              }
            }
          });
        })
      )
      .catch(err => console.log(err));
  }

  getTotalClassDays = () => {
    const { attendance } = this.state.student;
    return attendance.length;
  };

  getTotalAttendedDays = () => {
    const { attendance } = this.state.student;

    return attendance.reduce((accumulator, currentAttendance) => {
      if (currentAttendance.status) {
        return accumulator + 1;
      } else {
        return accumulator;
      }
    }, 0);
  };

  getTotalObtainedMarks = () => {
    const { internalExamMarks } = this.state.student;
    return internalExamMarks.reduce(
      (accumulator, currentExam) => accumulator + currentExam.obtainedMarks,
      0
    );
  };

  getTotalFullMarks = () => {
    const { internalExamMarks } = this.state.student;
    return internalExamMarks.reduce(
      (accumulator, currentExam) => accumulator + currentExam.fullMarks,
      0
    );
  };

  render() {
    if (!this.state.student && this.state.totalAttendanceSeries.length === 0)
      return null;
    return (
      <div className="myprogress">
        <h1 className="heading1">My Progress</h1>
        <hr className="horizontallinedivider" />
        <div className="progressContainer">
          <div>
            <h2 className="heading2">Total Attendance Progress</h2>
            <Chart
              type="donut"
              options={this.state.totalAttendanceOptions}
              series={this.state.totalAttendanceSeries}
              width="400"
            />
          </div>
          <div>
            <h2 className="heading2">
              Average Progress In Internal Examinations
            </h2>
            <Chart
              type="radialBar"
              options={this.state.totalInternalExamMarkOptions}
              series={this.state.totalInternalExamMarkSeries}
              width="400"
            />
          </div>
        </div>

        <div className="fullRecordWrapper">
          <div>
            <h2 className="heading2">Attendance Progress</h2>
            <Chart
              type="bar"
              options={this.state.columnChartAttendanceOptions}
              series={this.state.columnChartAttendanceSeries}
              height="400"
            />
          </div>
          <div>
            <h2 className="heading2">Internal Exam Progress</h2>
            <Chart
              type="bar"
              options={this.state.columnChartInternalExamMarksOptions}
              series={this.state.columnChartInternalExamMarksSeries}
              height="400"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default MyProgress;
