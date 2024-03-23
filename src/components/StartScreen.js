import React from 'react';
import { Link } from 'react-router-dom';
import Player from './Player';

function StartScreen({ selectedSprite }) {
  return (
    <>
      <div className='title flex flex-col'>
        <h1 className='max-sm:text-5xl'>DINOLYMPICS</h1>
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

export default StartScreen;
