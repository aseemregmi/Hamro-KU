import React from 'react';
import Map from './../Map';

const Explore = props => {
  window.scrollTo(0, 0);

  return (
    <div className="explore">
      <Map />
    </div>
  );
};

export default Explore;
