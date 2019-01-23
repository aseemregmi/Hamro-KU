import React from 'react';
import axios from 'axios';

const TeacherProfile = props => {
  function handleVerification() {
    axios
      .patch(`/api/teachers/verify/${props.teacher._id}`, null, {
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
      .delete(`/api/teachers/${props.teacher._id}`, {
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
        <h1 className="heading1">Teacher Profile</h1>
        <div className="student-content">
          <span>Name : {props.teacher.name}</span>
          <span>E-mail : {props.teacher.email}</span>
          <span>Phone No : {props.teacher.phoneNo}</span>
          <span>Post : {props.teacher.post}</span>
          <span>Department : {props.teacher.department.name}</span>
          <span>Address : {props.teacher.address}</span>
          <button onClick={handleVerification} className="btn btn--primary">
            {props.teacher.verified ? 'UnVerify This Account' : 'Verify'}
          </button>
          <button className="btn btn--secondary" onClick={handleDelete}>
            Click Here To Delete This Teacher Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeacherProfile;
