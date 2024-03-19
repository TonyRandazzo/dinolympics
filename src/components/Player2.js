import React from 'react';
import { useSprite } from './SpriteContext';

const Player2 = ({ reference }) => {
  const { selectedSprite } = useSprite();
  const playerStyle = {
    position: 'absolute',
    bottom: '0',
    left: '50px',
    transform: 'scale(2,2)',
}
  return (
    <div
      ref={reference} style={playerStyle} className={`sprite ${selectedSprite}`}></div>
  );
};

export default Player2;
