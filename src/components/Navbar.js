import React from 'react';
import Cart from './Immagini/shopping-cart.png';

function Navbar({ openLoginModal, OpenShopCart }) {
  return (
    <div className='navbar'>
      <nav>
        <ul>
          <li>
            <a onClick={OpenShopCart}>
              <img className='cart' src={Cart} alt="Cart" />
            </a>
          </li>
          <li>
            <a onClick={openLoginModal} className='login'>
              Login
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
