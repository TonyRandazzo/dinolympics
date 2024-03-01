import React from 'react'
import Player from './Player'

function Button({selectedSprite}) {
  return (
    <>
        <div className='title'>
            <h1>DINOLYMPICS</h1>
        </div>
        <div className='preview'>
          <Player selectedSprite={selectedSprite}/>
        </div>
        <div className='button'>
          <input className="startGame" type="button" value="Start"></input>
        </div>
    </>
  )
}

export default Button
