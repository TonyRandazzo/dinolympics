import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { useCart } from './CartContext';

const ShopCart = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, completePurchase } = useCart();
  const [shopperRecordDeleted, setShopperRecordDeleted] = useState(false);
  const [deleteError, setDeleteError] = useState(null); 

  const handleRemoveItem = (index) => {
    removeFromCart(index);
  };

  const handleCheckout = async () => {
    if (!shopperRecordDeleted && !deleteError) {
      try {
        const deleteResponse = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/missions/shopper`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ shopper_id: 1 }),
        });

        if (!deleteResponse.ok && deleteResponse.status !== 404) {
          throw new Error('Errore durante l\'eliminazione del record del shopper');
        }

        setShopperRecordDeleted(deleteResponse.ok);
      } catch (error) {
        if (error.response && error.response.status !== 404) {
          throw error;
        }
        setDeleteError(error);
      }
    }

    completePurchase();
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
                <div className={`mini-prodotto ${item.img}`} style={{imageRendering: 'pixelated',   animation: 'play-sprite 0.7s steps(1) infinite', backgroundColor: 'white'}}></div>
                <p>{item.name}</p>
                <p>Price: {item.price} points</p>
                <button onClick={() => handleRemoveItem(index)}>
                  &times;
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>

      {cart && cart.length > 0 && (
        <button className='checkout' onClick={handleCheckout}>Checkout</button>
      )}
    </Modal>
  );
};

export default ShopCart;
