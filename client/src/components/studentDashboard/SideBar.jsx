import React from 'react';
import { Link } from 'react-router-dom';

function getInitials(props) {
  let initials = '';
  props.student.name.split(' ').forEach(name => {
    initials += name.slice(0, 1) + ' ';
  });
  return initials.trim();
}

const SideBar = props => {
  return (
    <div className="dashboard__sidebar">
      <div className="personal-details">
        <div className="avatar-tag">{getInitials(props)}</div>
        <div className="name">{props.student.name}</div>
      </div>
      <div className="menus">
        <Link to="/dashboard/progress">My Progress</Link>
        <Link to="/dashboard/notes">Notes</Link>
        <Link to="/dashboard/classes">Classes</Link>
        <Link to="/dashboard/notice">Notices</Link>
        <Link to="/dashboard/chat-room">Class Chat Room</Link>
        {props.student.specialAuthority ? (
          <Link to="/dashboard/manage-class-routines">
            Manage Classes / Routines
          </Link>
        ) : null}
      </div>
    </div>
  );
};

export default SideBar;
