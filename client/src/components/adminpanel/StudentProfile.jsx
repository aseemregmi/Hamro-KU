import React from 'react';
import axios from 'axios';

const StudentProfile = props => {
  function handleSpecialAuthority() {
    axios
      .patch(`/api/students/specialAuthority/${props.student._id}`)
      .then(() => {
        props.resetData();
        props.handleDisplayModal();
      })
      .catch(err => alert(err));
  }

  function handleVerification() {
    axios
      .patch(`/api/students/verify/${props.student._id}`)
      .then(() => {
        props.resetData();
        props.handleDisplayModal();
      })
      .catch(err => alert(err));
  }

  function handleDelete() {
    axios
      .delete(`/api/students/${props.student._id}`)
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
          <span
            onClick={handleSpecialAuthority}
            style={{ cursor: 'pointer', color: 'red' }}
          >
            {props.student.specialAuthority
              ? 'This Student Has Special Authority in his/her class. Click Here If you want to cancel his/her authority'
              : "This Student doesn't have special authority in his/her class. Click Here If you want to grant him/her authority"}
          </span>
          <span
            onClick={handleVerification}
            style={{ cursor: 'pointer', color: 'red' }}
          >
            {props.student.verified
              ? 'This account is verified. Are There Some Mistakes. Click Here To UnVerify'
              : 'This account is not Verified. Click Here If The Informations Are Correct and You Need To Verify Account'}
          </span>
          <button className="btn btn--primary" onClick={handleDelete}>
            Click Here To Delete This Student Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
