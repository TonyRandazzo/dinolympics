import React from 'react';

const Player = ({ selectedSprite }) => {
  return (
    <div>
      <div className={`sprite ${selectedSprite}`}></div>
    </div>
  );
}

export default Player;
