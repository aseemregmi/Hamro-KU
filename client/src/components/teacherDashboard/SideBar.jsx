import React from 'react';
import { Link } from 'react-router-dom';

const SideBar = props => {
  function getInitials() {
    let initials = '';
    props.name.split(' ').forEach(name => {
      initials += name.slice(0, 1) + ' ';
    });
    return initials.trim();
  }
  return (
    <div className="dashboard__sidebar">
      <div className="personal-details">
        <div className="avatar-tag">{getInitials()}</div>
        <div className="name">{props.name}</div>
      </div>
      <div className="menus">
        <Link to="/dashboard/classes">My Classes</Link>
        <Link to="/dashboard/notice">Send Notice</Link>
        <Link to="/dashboard/student">Student Record</Link>
        <Link to="/dashboard/notes">Upload Notes</Link>
        <Link to="/dashboard/internal-marks">Add Internal Marks</Link>
        <Link to="/dashboard/attendance">Manage Attendance</Link>
      </div>
    </div>
  );
};

export default SideBar;
