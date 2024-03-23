import React from 'react';

const Player3 = ({ position, selectedSprite }) => {

    
  const { x, y } = position;
    const playerStyle = {
      alignItems: 'center',
      justifyContent: 'center',
     position:'absolute',
     top: `${y * 50}px`,  
     left: `${x * 50}px`,
     transform: 'scale(1,1)',
     transform: 'translate(100%, 70%)',
    }
  return (
        <div style={playerStyle} className={`sprite ${selectedSprite}`}></div>
  );
};

export default Player3;
