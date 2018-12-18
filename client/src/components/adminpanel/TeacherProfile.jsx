import React from 'react';
import axios from 'axios';

const TeacherProfile = props => {
  function handleVerification() {
    axios
      .patch(`/api/teachers/verify/${props.teacher._id}`)
      .then(() => {
        props.resetData();
        props.handleDisplayModal();
      })
      .catch(err => alert(err));
  }

  function handleDelete() {
    axios
      .delete(`/api/teachers/${props.teacher._id}`)
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
        <h1 className="heading1">Teacher Profile</h1>
        <div className="student-content">
          <span>Name : {props.teacher.name}</span>
          <span>E-mail : {props.teacher.email}</span>
          <span>Phone No : {props.teacher.phoneNo}</span>
          <span>Post : {props.teacher.post}</span>
          <span>Department : {props.teacher.department.name}</span>
          <span>Address : {props.teacher.address}</span>
          <span
            onClick={handleVerification}
            style={{ cursor: 'pointer', color: 'red' }}
          >
            {props.teacher.verified
              ? 'This account is verified. Are There Some Mistakes. Click Here To UnVerify'
              : 'This account is not Verified. Click Here If The Informations Are Correct and You Need To Verify Account'}
          </span>
          <button className="btn btn--primary" onClick={handleDelete}>
            Click Here To Delete This Teacher Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeacherProfile;
