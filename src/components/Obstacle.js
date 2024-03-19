import React from 'react';

const Obstacle = ({ reference }) => {
  return (
    <div
      ref={reference}
      style={{
        position: 'absolute',
        bottom: '0',
        borderRadius: '500px',
        left: '-20px',
        width: '20px',
        height: '20px',
        backgroundColor: 'black',
      }}
    ></div>
  );
};

export default Obstacle;
