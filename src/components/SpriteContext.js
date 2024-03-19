import React, { createContext, useContext, useState } from 'react';

export const SpriteContext = createContext();

export const SpriteProvider = ({ children }) => {
  const [selectedSprite, setSelectedSprite] = useState('blue');

  return (
    <SpriteContext.Provider value={{ selectedSprite, setSelectedSprite }}>
      {children}
    </SpriteContext.Provider>
  );
};

export const useSprite = () => {
  return useContext(SpriteContext);
};