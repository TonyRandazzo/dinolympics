import './App.css';
import React, { useState, useEffect } from 'react';
import LoginModal from './components/LoginModal';
import Body from './components/Body';
import Button from './components/Button';
import Navbar from './components/Navbar';
import ShopCart from './components/ShopCart';
import { CartProvider } from './components/CartContext';
function App() {
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isShopCartOpen, setShopCartOpen] = useState(false);
  const [isJumping, setJumping] = useState(false);
  const [isGameStarted, setGameStarted] = useState(false);
  const [cart, setCart] = useState([]);

  const addToCart = (product, quantity) => {
    console.log("Adding to cart:", product, quantity);
    setCart([...cart, { ...product, quantity }]);
  };

  const openLoginModal = () => {
    setLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setLoginModalOpen(false);
  };

  const OpenShopCart = () => {
    setShopCartOpen(true);
  };

  const closeShopCart = () => {
    setShopCartOpen(false);
  };
  const handleJump = () => {
    if (!isJumping) {
      setJumping(true);
      setTimeout(() => setJumping(false), 500);
    }
  };

  const startGame = () => {
    setGameStarted(true);
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.code === 'Space') {
        handleJump();
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [isGameStarted]);


  return (
    <>
    <CartProvider>
        <Navbar openLoginModal={openLoginModal} OpenShopCart={OpenShopCart} />
        <Button onStartGame={startGame} />
        <Body addToCart={addToCart} />
        <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />
        <ShopCart isOpen={isShopCartOpen} onClose={closeShopCart} />
    </CartProvider>

    </>
  );
}

export default App;
