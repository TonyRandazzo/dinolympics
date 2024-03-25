import React, { useState, useEffect } from 'react';
import Elements from './Elements';
import { useCart } from './CartContext'; 

function Body({ addToCart, selectedSprite, setSelectedSprite }) {
  const { purchasedItems } = useCart(); 
  const [missions, setMissions] = useState([]);
  const [maxPoints, setMaxPoints] = useState([]);

  
  useEffect(() => {
    const fetchMissionsAndMaxPoints = async () => {
      try {
        const missionsResponse = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/missions`);
        const missionsData = await missionsResponse.json();
        setMissions(missionsData.data);

        const maxPointsResponse = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/max-points`);
        const maxPointsData = await maxPointsResponse.json();
        setMaxPoints(maxPointsData.data);
      } catch (error) {
        console.error('Errore durante la richiesta API:', error);
      }
    };

    fetchMissionsAndMaxPoints();
  }, []); 
  useEffect(() => {
    const savePurchasedItemsToDatabase = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/skins`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ purchasedItems }), 
        });

        if (!response.ok) {
          throw new Error('Failed to save purchased items to the database');
        }
        else{
          console.log(purchasedItems)
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    savePurchasedItemsToDatabase();
  }, [purchasedItems]);
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
              <h2 className='max-lg:text-xs max-md:hidden'>Skin</h2>
              <p className='guide'>You can choose your favourite character right here.</p>
            </div>
            <div className='customize'>
              <div className='big-sprite-container max-md:hidden'>
                <div className={`big-sprite sprite ${selectedSprite}`} />
              </div>
                <div className={`sprite blue skin ${selectedSprite === 'blue' ? 'selected' : ''}`} onClick={() => handleSpriteClick('blue')} />
              {isSpritePurchased('red') && (
                <div className={`sprite red skin ${selectedSprite === 'red' ? 'selected' : ''}`} onClick={() => handleSpriteClick('red')} />
              )}
              {isSpritePurchased('gold') && (
                <div className={`sprite yellow skin ${selectedSprite === 'yellow' ? 'selected' : ''}`} onClick={() => handleSpriteClick('yellow')} />
              )}
              {isSpritePurchased('green') && (
                <div className={`sprite green skin ${selectedSprite === 'green' ? 'selected' : ''}`} onClick={() => handleSpriteClick('green')} />
              )}
            </div>
          </li>
          <li>
            <div style={{ display: 'flex' }}>
              <h2 className='max-lg:text-xs'>Records</h2>
              <p className='guide'>Here there are your best records of each game you've played</p>
            </div>
            <div className='records'>
              <div className="mission-container">
                <div className="mission-row">
                  <div className="mission-header"><h3>MiniGames</h3></div>
                  <div className="mission-header"><h3>Best Records</h3></div>
                </div>
                {maxPoints.length > 0 ? (
                  maxPoints.map(point => (
                    <div className="mission-row" key={point.id}>
                      <div className="mission-cell max-lg:text-xs">{point.game}</div>
                      <div className="mission-cell max-lg:text-xs">{point.max_points}</div>
                    </div>
                  ))
                ) : (
                  <>
                    <div className="mission-row">
                      <div className="mission-cell max-lg:text-sm">-</div>
                      <div className="mission-cell max-lg:text-sm">-</div>
                    </div>
                    <div className="mission-row">
                      <div className="mission-cell max-lg:text-sm">-</div>
                      <div className="mission-cell max-lg:text-sm">-</div>
                    </div>
                    <div className="mission-row">
                      <div className="mission-cell max-lg:text-sm">-</div>
                      <div className="mission-cell max-lg:text-sm">-</div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </li>

          <li>
            <div style={{ display: 'flex' }}>
              <h2 className='max-lg:text-xs'>Missions</h2>
              <p className='guide'>These are the missions that you have to complete.</p>
            </div>
            <div className="mission-container">
              <div className="mission-row">
                <div className="mission-header"><h3>Missions</h3></div>
                <div className="mission-header"><h3>Descriptions</h3></div>
              </div>
              {missions.length > 0 ? (
                missions.map(mission => (
                  <div className="mission-row" key={mission.id}>
                    <div className="mission-cell max-lg:text-xs">{mission.name}</div>
                    <div className="mission-cell max-lg:text-xs">{mission.description}</div>
                  </div>
                ))
              ) : (
                <>
                <div className="mission-row">
                  <div className="mission-cell max-lg:text-sm">No missions available</div>
                  <div className="mission-cell max-lg:text-sm">-</div>
                </div>
              </>
              )}
            </div>
          </li>
          {/* <li><div style={{display: 'flex'}}><h2 className='max-lg:text-xs max-md:hidden'>Rankings</h2> <p className='guide'>This is the ledderboard of the highest points you had accomplished</p></div>
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

          </li> */}
          <div style={{display: 'flex'}}><h2 className='max-lg:text-xs'>Shop</h2><p className='guide'>In this shop you can unlock skins if you have at least 500 points</p></div>
          <Elements addToCart={addToCart} />
        </ul>
      </nav>
    </div>
  )
}

export default Body
