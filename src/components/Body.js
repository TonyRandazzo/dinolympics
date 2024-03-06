import React, { useState } from 'react';
import Elements from './Elements';
import Player from './Player';


function Body({ addToCart, selectedSprite, setSelectedSprite }) {
  const handleSpriteClick = (spriteColor) => {
    setSelectedSprite(spriteColor);
  };
  return (
    <div className='corpo'>
      <nav>
        <ul className='lista'>
          <li > 
            <div style={{display: 'flex'}}>
              <h2>Skin</h2>
              <p className='guide'>You can choose your favourite character right here.</p>
            </div>
            <div className='customize'>
              <div className='big-sprite-container'>
                <div className={`big-sprite sprite ${selectedSprite}`} />
              </div>
              <div className={`sprite blue skin ${selectedSprite === 'blue' ? 'selected' : ''}`} onClick={() => handleSpriteClick('blue')} />
              <div className={`sprite red skin ${selectedSprite === 'red' ? 'selected' : ''}`} onClick={() => handleSpriteClick('red')} />
              <div className={`sprite yellow skin ${selectedSprite === 'yellow' ? 'selected' : ''}`} onClick={() => handleSpriteClick('yellow')} />
              <div className={`sprite green skin ${selectedSprite === 'green' ? 'selected' : ''}`} onClick={() => handleSpriteClick('green')} />
            </div>
          </li>
          <li>
          <div style={{display: 'flex'}}><h2>Records</h2><p className='guide'>Here there are your best records of each game you've played</p></div>
            <div className='records'>
              <div className="mission-container">
                <div className="mission-row">
                  <div className="mission-header"><h3>MiniGames</h3></div>
                  <div className="mission-header"><h3>Best Records</h3></div>
                </div>
                <div className="mission-row">
                  <div className="mission-cell">Game 1</div>
                  <div className="mission-cell">2000</div>
                </div>
                <div className="mission-row">
                  <div className="mission-cell">Game 2</div>
                  <div className="mission-cell">2000</div>
                </div>
                <div className="mission-row">
                  <div className="mission-cell">Game 3</div>
                  <div className="mission-cell">2000</div>
                </div>
              </div>
            </div>
          </li>
          <li>
            <div style={{display: 'flex'}}><h2>Missioni</h2><p className='guide'>These are the missions available. Complete all the missions. This percentage is the percentage of missions that you've completed</p></div>
            <div className="progress-bar-container">
              <div className="progress-bars-container">
                <div className="progress-bar Missions">
                  <label for="Missions"><a href="#Missions">Missions</a></label>
                </div>
              </div>
            </div>
            <div className="mission-container">
              <div className="mission-row">
                <div className="mission-header"><h3>Missioni</h3></div>
                <div className="mission-header"><h3>Descrizione</h3></div>
              </div>
              <div className="mission-row">
                <div className="mission-cell">Missione 1: nome missione</div>
                <div className="mission-cell">descrizione della missione</div>
              </div>
              <div className="mission-row">
                <div className="mission-cell">Missione 2: nome missione</div>
                <div className="mission-cell">descrizione della missione</div>
              </div>
              <div className="mission-row">
                <div className="mission-cell">Missione 3: nome missione</div>
                <div className="mission-cell">descrizione della missione</div>
              </div>
            </div>
          </li>
          <li><div style={{display: 'flex'}}><h2>Rankings</h2> <p className='guide'>This is the ledderboard of the highest points you had accomplished</p></div>
            <div className='rankings'>
              <div className='second'>
                <div className='face top'></div>
                <div className="face2 front"></div>
                <div className="face2 right"><h3>2</h3></div>
              </div>
              <div className="first">
                <div className='face top'></div>
                <div className="face front"></div>
                <div className="face right"><h3>1</h3></div>
              </div>
              <div className='third'>
                <div className='face top'></div>
                <div className="face3 front"></div>
                <div className="face3 right"> <h3>3</h3></div>
              </div>
            </div>

          </li>
          <div style={{display: 'flex'}}><h2>Shop</h2><p className='guide'>In this shop you can buy themes for the game</p></div>
          <Elements addToCart={addToCart} />
        </ul>
      </nav>
    </div>
  )
}

export default Body
