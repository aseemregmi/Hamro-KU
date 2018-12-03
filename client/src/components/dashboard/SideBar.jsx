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
        <Link to="/dashboard/progress">My Progress</Link>
        <Link to="/dashboard/assignments">Assignments</Link>
        <Link to="/dashboard/notes">Notes</Link>
        <Link to="/dashboard/teachers">Teachers</Link>
        <Link to="/dashboard/teachers">Messages</Link>
        <Link to="/dashboard/chat-room">Class Chat Room</Link>
      </div>
    </div>
  );
};

export default SideBar;
