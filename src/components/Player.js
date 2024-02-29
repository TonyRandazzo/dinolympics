import React, { useState, useEffect } from 'react';

const Player = ({ jump }) => {
  const [position, setPosition] = useState(0);

  useEffect(() => {
    if (jump) {
      setPosition(1); 
      setTimeout(() => setPosition(0), 500);
    }
  }, [jump]);

  return (
    <div style={{ marginTop: `${position * 100}px` }}>
      <div className="sprite blue" onClick={jump}></div>
    </div>
  );
}

export default Player;
