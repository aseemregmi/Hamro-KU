import React from 'react';
import { Link } from 'react-router-dom';

const SideBar = props => {
  return (
    <div className="adminpanel__sidebar">
      <div className="menus">
        <Link to="/adminpanel/students">Students</Link>
      </div>
    </div>
  );
};

export default SideBar;
