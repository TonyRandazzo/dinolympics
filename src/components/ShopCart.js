import React from 'react';
import Modal from 'react-modal';
import { useCart } from './CartContext';

const ShopCart = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, completePurchase  } = useCart();

  const calculateTotal = () => {
    if (cart && cart.length > 0) {
      return cart.reduce((total, item) => total + item.price, 0);
    }
    return 0;
  };

  const handleRemoveItem = (index) => {
    removeFromCart(index);
  };

  const handleCheckout = async () => {
    try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/skins`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ cart }),
        });

        if (!response.ok) {
            throw new Error('Errore durante il checkout');
        }
        completePurchase(); 
    } catch (error) {
        console.error('Errore durante il checkout:', error.message);
    }
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
                <p>Price: ${item.price}</p>
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

      <p>Total: ${calculateTotal()}</p>

      {cart && cart.length > 0 && (
        <button className='checkout' onClick={handleCheckout}>Checkout</button>
      )}
    </Modal>
  );
};

export default ShopCart;
