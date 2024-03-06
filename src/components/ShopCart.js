import React from 'react';
import Modal from 'react-modal';
import { useCart } from './CartContext';

const ShopCart = ({ isOpen, onClose }) => {
  const { cart } = useCart();
  const calculateTotal = () => {
    if (cart && cart.length > 0) {
      return cart.reduce((total, item) => total + item.price, 0);
    }
    return 0;
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Cart Modal"
      className="ReactModalContent"
      overlayClassName="CustomOverlay"
    >
      <button className="closeButton" onClick={onClose}>
        <span></span>
        &times;
      </button>
      <div className='carrello'>
        <h2>Your Cart</h2>
        {cart && cart.length > 0 ? (
          <ul>
            {cart.map((item, index) => (
              <li key={index}>
                <div className='mini-prodotto' style={{ backgroundImage: `url(${item.img})` }}></div>
                <p>{item.name}</p>
                <p>Price: ${item.price}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>Your cart is empty.</p>
        )}

      </div>

      <p>Total: ${calculateTotal()}</p>
    </Modal>
  );
};

export default ShopCart;