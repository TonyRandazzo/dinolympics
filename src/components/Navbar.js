import React from 'react';
import Cart from './Immagini/shopping-cart.png';

function Navbar({ openLoginModal }) {
  return (
    <div className='navbar'>
      <nav>
        <ul>
          <li>
            <a href="#" target="_blank">
              <img className='cart' src={Cart} alt="Cart" />
            </a>
          </li>
          <li>
            <a href="#" onClick={openLoginModal}>
              Login
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
