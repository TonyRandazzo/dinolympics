import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginModal from './components/LoginModal';
import Body from './components/Body';
import StartScreen from './components/StartScreen';
import Navbar from './components/Navbar';
import ShopCart from './components/ShopCart';
import { CartProvider } from './components/CartContext';
import Games from './components/GameWrapper';
import Game1 from './components/Game1';
import Game2 from './components/Game2';
import Game3 from './components/Game3';
import { PointsProvider } from './components/PointContext';

function App() {
  const [loggedInUsername, setLoggedInUsername] = useState(null);
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
  const handleRegistrationSuccess = (username) => {
    setLoggedInUsername(username);
    setLoginModalOpen(false);
  };
  
  return (
    <Router>
      <PointsProvider>
        <CartProvider>
          <Routes>
            <Route path="/" element={<>
              <Navbar openLoginModal={openLoginModal} OpenShopCart={openShopCart} username={loggedInUsername} />
              <StartScreen selectedSprite={selectedSprite} setSelectedSprite={setSelectedSprite} />
              <Body addToCart={addToCart} selectedSprite={selectedSprite} setSelectedSprite={setSelectedSprite} />
            </>} />
            <Route path="/games" element={<Games />} >
              <Route path="game1" element={<Game1 selectedSprite={selectedSprite} setSelectedSprite={setSelectedSprite}/>} />
              <Route path="game2" element={<Game2 selectedSprite={selectedSprite} setSelectedSprite={setSelectedSprite}/>} />
              <Route path="game3" element={<Game3 selectedSprite={selectedSprite} setSelectedSprite={setSelectedSprite}/>} />
            </Route>
          </Routes>
          <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} onRegistrationSuccess={handleRegistrationSuccess} />
          <ShopCart isOpen={isShopCartOpen} onClose={closeShopCart} />
        </CartProvider>
      </PointsProvider>

    </Router>
  );
}

export default App;
