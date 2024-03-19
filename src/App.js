import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginModal from './components/LoginModal';
import Body from './components/Body';
import Button from './components/Button';
import Navbar from './components/Navbar';
import ShopCart from './components/ShopCart';
import { CartProvider } from './components/CartContext';
import Games from './components/GameWrapper';
import Game1 from './components/Game1';
import Game2 from './components/Game2';
import Game3 from './components/Game3';
function App() {
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isShopCartOpen, setShopCartOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [selectedSprite, setSelectedSprite] = useState('blue');

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

  const openShopCart = () => {
    setShopCartOpen(true);
  };

  const closeShopCart = () => {
    setShopCartOpen(false);
  };

  return (
    <Router>
      <CartProvider>
        <Routes>
          <Route path="/" element={<>
            <Navbar openLoginModal={openLoginModal} OpenShopCart={openShopCart} />
            <Button selectedSprite={selectedSprite} setSelectedSprite={setSelectedSprite} />
            <Body addToCart={addToCart} selectedSprite={selectedSprite} setSelectedSprite={setSelectedSprite} />
          </>} />
          <Route path="/games" element={<Games />} >
                <Route path="game1" element={<Game1 />} />
                <Route path="game2" element={<Game2 />} />
                <Route path="game3" element={<Game3 />} />
          </Route>
        </Routes>
        <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />
        <ShopCart isOpen={isShopCartOpen} onClose={closeShopCart} />
      </CartProvider>
    </Router>
  );
}

export default App;
