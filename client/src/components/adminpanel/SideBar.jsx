import React from 'react';
import { Link } from 'react-router-dom';

const SideBar = props => {
  return (
    <div className="adminpanel__sidebar">
      <div className="menus">
        <Link to="/adminpanel/students">Students</Link>
        <Link to="/adminpanel/teachers">Teachers</Link>
        <Link to="/adminpanel/subjects">Subject</Link>
        <Link to="/adminpanel/groups">Group</Link>
      </div>
    </div>
  );
};

export default SideBar;
