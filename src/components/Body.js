import React from 'react'
import Dino from './Immagini/0.png';
import Dino1 from './Immagini/1.png';
import Dino2 from './Immagini/2.png';
import Dino3 from './Immagini/3.png';
import Item from './Immagini/1.png';
import Item1 from './Immagini/2.png';
import Item2 from './Immagini/3.png';
function Body() {
  return (
    <div className='corpo'>
    <nav>
        <ul className='lista'>
            <li> <h2>Your Characheter</h2>
              <div className='customize'>
                <img src={Dino}></img>
                <div className='skin'>
                    <h2>Skin</h2>
                    <img src={Dino1}></img>
                    <img src={Dino2}></img>
                    <img src={Dino3}></img>
                </div>
              </div>
            </li>
            <li><h2>Records</h2>
            <div className='records'>
            <div class="mission-container">
                <div class="mission-row">
                <div class="mission-header"><h3>MiniGames</h3></div>
                <div class="mission-header"><h3>Best Records</h3></div>
                </div>
                <div class="mission-row">
                <div class="mission-cell">Game 1</div>
                <div class="mission-cell">2000</div>
                </div>
                <div class="mission-row">
                <div class="mission-cell">Game 2</div>
                <div class="mission-cell">2000</div>
                </div>
                <div class="mission-row">
                <div class="mission-cell">Game 3</div>
                <div class="mission-cell">2000</div>
                </div>
                </div>
            </div>
            </li>
            <li>
            <h2>Missioni</h2>
            <div class="progress-bar-container">
              <div class="progress-bars-container">
                <div class="progress-bar Missions"> 
                  <h2>
                    <label for="Missions"><a href="#Missions">Missions</a></label> 
                  </h2>
                </div>
              </div>
              </div>
              <div class="mission-container">
                <div class="mission-row">
                <div class="mission-header"><h3>Missioni</h3></div>
                <div class="mission-header"><h3>Descrizione</h3></div>
                </div>
                <div class="mission-row">
                <div class="mission-cell">Missione 1: nome missione</div>
                <div class="mission-cell">descrizione della missione</div>
                </div>
                <div class="mission-row">
                <div class="mission-cell">Missione 2: nome missione</div>
                <div class="mission-cell">descrizione della missione</div>
                </div>
                <div class="mission-row">
                <div class="mission-cell">Missione 3: nome missione</div>
                <div class="mission-cell">descrizione della missione</div>
                </div>
                </div>
            </li>
            <li><h2>Rankings</h2>
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
            <li><h2>Shop</h2>
              <div className='shop'>
              <div class="card">
                <img src="immagine1.jpg"></img>
                <h3>Prodotto 1</h3>
                <p>Descrizione del prodotto 1.</p>
                <button className='addToCart'>Aggiungi al carrello</button>
              </div>
              <div class="card">
                <img src="immagine2.jpg"></img>
                <h3>Prodotto 2</h3>
                <p>Descrizione del prodotto 2.</p>
                <button className='addToCart'>Aggiungi al carrello</button>
              </div>
              </div>
            </li>
        </ul>
    </nav>
    </div>
  )
}

export default Body
