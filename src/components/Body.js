import React, { useState, useEffect } from 'react';
import Elements from './Elements';
import { useCart } from './CartContext'; 

function Body({ addToCart, selectedSprite, setSelectedSprite }) {
  const { purchasedItems } = useCart(); 
  const [missions, setMissions] = useState([]);
  const [games, setGames] = useState([]);

  useEffect(() => {
    console.log(process.env.REACT_APP_BACKEND_URL)
    const fetchMissionsAndGames = async () => {
      try {
        const missionsResponse = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/missions`);
        const missionsData = await missionsResponse.json();
        setMissions(missionsData.data);
        const gamesResponse = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/records`);
        const gamesData = await gamesResponse.json();
        setGames(gamesData.data);
      } catch (error) {
        console.error('Errore durante la richiesta API:', error);
      }
    };

    fetchMissionsAndGames();
  }, []); 

  const handleSpriteClick = (spriteColor) => {
    setSelectedSprite(spriteColor);
  };


  const isSpritePurchased = (spriteColor) => {
    return purchasedItems.some(item => item.name.toLowerCase().includes(spriteColor.toLowerCase()));
  }

  return (
    <div className='corpo'>
      <nav>
        <ul className='lista'>
          <li>
            <div style={{ display: 'flex' }}>
              <h2>Skin</h2>
              <p className='guide'>You can choose your favourite character right here.</p>
            </div>
            <div className='customize max-lg:scale-70'>
              <div className='big-sprite-container max-lg:scale-20'>
                <div className={`big-sprite sprite ${selectedSprite}`} />
              </div>
                <div className={`sprite blue skin ${selectedSprite === 'blue' ? 'selected' : ''}`} onClick={() => handleSpriteClick('blue')} />
              {isSpritePurchased('red') && (
                <div className={`sprite red skin ${selectedSprite === 'red' ? 'selected' : ''}`} onClick={() => handleSpriteClick('red')} />
              )}
              {isSpritePurchased('yellow') && (
                <div className={`sprite yellow skin ${selectedSprite === 'yellow' ? 'selected' : ''}`} onClick={() => handleSpriteClick('yellow')} />
              )}
              {isSpritePurchased('green') && (
                <div className={`sprite green skin ${selectedSprite === 'green' ? 'selected' : ''}`} onClick={() => handleSpriteClick('green')} />
              )}
            </div>
          </li>
          <li>
            <div style={{ display: 'flex' }}>
              <h2>Records</h2>
              <p className='guide'>Here there are your best records of each game you've played</p>
            </div>
            <div className='records'>
              <div className="mission-container">
                <div className="mission-row">
                  <div className="mission-header"><h3>MiniGames</h3></div>
                  <div className="mission-header"><h3>Best Records</h3></div>
                </div>
                {games.length > 0 ? (
                  games.map(record => (
                    <div className="mission-row" key={record.id}>
                      <div className="mission-cell">{record.game_name}</div>
                      <div className="mission-cell">{record.points}</div>
                    </div>
                  ))
                ) : (
                  <>
                    <div className="mission-row">
                      <div className="mission-cell">-</div>
                      <div className="mission-cell">-</div>
                    </div>
                    <div className="mission-row">
                      <div className="mission-cell">-</div>
                      <div className="mission-cell">-</div>
                    </div>
                    <div className="mission-row">
                      <div className="mission-cell">-</div>
                      <div className="mission-cell">-</div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </li>

          <li>
            <div style={{ display: 'flex' }}>
              <h2>Missioni</h2>
              <p className='guide'>This is the percentage of missions that you've completed</p>
            </div>
            <div className="mission-container">
              <div className="mission-row">
                <div className="mission-header"><h3>Missioni</h3></div>
                <div className="mission-header"><h3>Descrizione</h3></div>
              </div>
              {missions.length > 0 ? (
                missions.map(mission => (
                  <div className="mission-row" key={mission.id}>
                    <div className="mission-cell">{mission.name}</div>
                    <div className="mission-cell">{mission.description}</div>
                  </div>
                ))
              ) : (
                <>
                  <div className="mission-row">
                    <div className="mission-cell">-</div>
                    <div className="mission-cell">-</div>
                  </div>
                  <div className="mission-row">
                    <div className="mission-cell">-</div>
                    <div className="mission-cell">-</div>
                  </div>
                  <div className="mission-row">
                    <div className="mission-cell">-</div>
                    <div className="mission-cell">-</div>
                  </div>
                </>
              )}
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
          <div style={{display: 'flex'}}><h2>Shop</h2><p className='guide'>In this shop you can buy skins for the game</p></div>
          <Elements addToCart={addToCart} />
        </ul>
      </nav>
    </div>
  )
}

export default Body
