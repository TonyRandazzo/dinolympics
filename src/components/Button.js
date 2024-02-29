import React from 'react'
import Player from './Player'

function Button() {
  return (
    <>
        <div className='title'>
            <h1>DINOLYMPICS</h1>
        </div>
        <div className='preview'>
          <Player/>
        </div>
        <div className='button'>
          <input id="startGame" type="button" value="Start"></input>
        </div>
    </>
  )
}

export default Button
