import React, { createContext, useContext, useState } from 'react';

const PointsContext = createContext();

export const usePoints = () => useContext(PointsContext);

export const PointsProvider = ({ children }) => {
  const [game1Points, setGame1Points] = useState({ id: 1, game: 'Crazy Maze', points: 0 });
  const [game2Points, setGame2Points] = useState({ id: 2, game: 'Feverish Run', points: 0 });
  const [game3Points, setGame3Points] = useState({ id: 3, game: 'Mad Hunting', points: 0 });


  const updateGamePoints = (game, points) => {
    switch (game) {
      case "game1":
        setGame1Points(prevGame1Points => ({ ...prevGame1Points, points: prevGame1Points.points + points }));
        break;
      case "game2":
        setGame2Points(prevGame2Points => ({ ...prevGame2Points, points: prevGame2Points.points + points }));
        break;
      case "game3":
        setGame3Points(prevGame3Points => ({ ...prevGame3Points, points: prevGame3Points.points + points }));
        break;
      default:
        break;
    }
  };
  
  return (
    <PointsContext.Provider
      value={{
        game1Points,
        game2Points,
        game3Points,
        updateGamePoints,
      }}
    >
      {children}
    </PointsContext.Provider>
  );
};
