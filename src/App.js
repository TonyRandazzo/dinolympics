import './App.css';
import React, { useState } from 'react';
import LoginModal from './components/LoginModal';
import Body from './components/Body';
import Button from './components/Button';
import Navbar from './components/Navbar';

function App() {
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);

  const openLoginModal = () => {
    setLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setLoginModalOpen(false);
  };

  return (
    <>
      <Navbar openLoginModal={openLoginModal} />
      <Button />
      <Body />
      <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />
    </>
  );
}

export default App;
