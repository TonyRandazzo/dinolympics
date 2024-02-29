import React from 'react';
import Modal from 'react-modal';

const ShopCart = ({ isOpen, onClose, cart }) => {
  const calculateTotal = () => {
    if (Array.isArray(cart) && cart.length > 0) {
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

      <h2>Your Cart</h2>
      {Array.isArray(cart) && cart.length > 0 ? (
        <ul>
          {cart.map((item, index) => (
            <li key={index}>
              <p>{item.name}</p>
              <p>Price: ${item.price}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Your cart is empty.</p>
      )}

      <p>Total: ${calculateTotal()}</p>
    </Modal>
  );
};

export default ShopCart;