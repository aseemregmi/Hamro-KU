import React from 'react';
import { Link } from 'react-router-dom';

const WelcomeBlock = () => {
  return (
    <div className="welcome-block">
      <div className="title-container">
        <p className="heading2">Welcome to</p>
        <p className="heading1">Kathmandu University</p>
      </div>

      <Link to="/explore" className="btn btn--large btn--primary">
        Explore Now
      </Link>
    </div>
  );
};

export default WelcomeBlock;
