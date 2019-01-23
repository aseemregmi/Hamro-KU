import React from 'react';
import axios from 'axios';

const StudentProfile = props => {
  function handleSpecialAuthority() {
    axios
      .patch(`/api/students/specialAuthority/${props.student._id}`, null, {
        headers: { token: props.token }
      })
      .then(() => {
        props.resetData();
        props.handleDisplayModal();
      })
      .catch(err => alert(err));
  }

  function handleVerification() {
    axios
      .patch(`/api/students/verify/${props.student._id}`, null, {
        headers: { token: props.token }
      })
      .then(() => {
        props.resetData();
        props.handleDisplayModal();
      })
      .catch(err => alert(err));
  }

  function handleDelete() {
    axios
      .delete(`/api/students/${props.student._id}`, {
        headers: { token: props.token }
      })
      .then(() => {
        props.resetData();
        props.handleDisplayModal();
      })
      .catch(err => alert(err));
  }

  return (
    <div className="student-profile-modal">
      <div className="close-btn" onClick={props.handleDisplayModal}>
        <i className="fas fa-times" />
      </div>
      <div className="contents">
        <h1 className="heading1">Student Profile</h1>
        <div className="student-content">
          <span>Name : {props.student.name}</span>
          <span>E-mail : {props.student.email}</span>
          <span> Registration No : {props.student.registrationNo}</span>
          <span>Phone No : {props.student.phoneNo}</span>
          <span>Group : {props.student.group.groupName}</span>
          <span>Year : {props.student.group.year}</span>
          <span>School : {props.student.group.school}</span>
          <span>Phone No : {props.student.phoneNo}</span>
          <button className="btn btn--primary" onClick={handleSpecialAuthority}>
            {props.student.specialAuthority
              ? 'Remove Special Authority'
              : 'Provide Special Authority'}
          </button>
          <button className="btn btn--primary" onClick={handleVerification}>
            {props.student.verified ? 'UnVerify This Account' : 'Verify'}
          </button>
          <button className="btn btn--secondary" onClick={handleDelete}>
            Click Here To Delete This Student Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
