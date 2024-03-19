import React from 'react';
import { Link } from 'react-router-dom';
import Player from './Player';

function Button({ selectedSprite }) {
  return (
    <>
      <div className='title'>
        <h1>DINOLYMPICS</h1>
      </div>
      <div className='preview'>
        <Player selectedSprite={selectedSprite} />
      </div>
      <div className='button'>
        <Link to="/games" className="startGame">
          Start
        </Link>
      </div>
    </>
  );
}

export default Button;
