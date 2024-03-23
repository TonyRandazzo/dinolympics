import React, { useState, useEffect } from 'react';
import Player1 from './Player1';
import { usePoints } from './PointContext';

const rows = 10;
const cols = 10;

const Game1 = ({selectedSprite, setSelectedSprite}) => {
  const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 });
  const [maze, setMaze] = useState([]);
  const [dots, setDots] = useState([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15); // Tempo iniziale in secondi
  const { game1Points, updateGamePoints } = usePoints();

  useEffect(() => {
    const generateMaze = () => {
      const maze = [];
      const dots = [];
      for (let i = 0; i < rows; i++) {
        const row = [];
        for (let j = 0; j < cols; j++) {
          const isEmpty = Math.random() < 0.8;
          row.push(isEmpty ? 0 : 1);

          if (isEmpty && Math.random() < 0.3) {
            dots.push({ x: j, y: i });
          }
        }
        maze.push(row);
      }

      let randomX, randomY;
      do {
        randomX = Math.floor(Math.random() * cols);
        randomY = Math.floor(Math.random() * rows);
      } while (maze[randomY][randomX] !== 0);

      setPlayerPosition({ x: randomX, y: randomY });

      maze[0][0] = 0;
      setMaze(maze);
      setDots(dots);
    };

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000); 

    const timeout = setTimeout(() => {
      clearInterval(timer);
      clearTimeout(timeout);
      window.location.reload();
    }, 15000); 

    generateMaze(); 

    return () => {
      clearInterval(timer);
      clearTimeout(timeout);
    };
  }, []);

  const handleMove = (direction) => {
    let newPlayerPosition = { ...playerPosition };
    let newDots = [...dots];
    let newScore = score;
  
    switch (direction) {
      case 'Wkey':
      case 'ArrowUp':
        if (playerPosition.y > 0 && maze[playerPosition.y - 1][playerPosition.x] === 0) {
          newPlayerPosition.y -= 1;
        }
        break;
      case 'Skey':
      case 'ArrowDown':
        if (playerPosition.y < rows - 1 && maze[playerPosition.y + 1][playerPosition.x] === 0) {
          newPlayerPosition.y += 1;
        }
        break;
      case 'Akey':
      case 'ArrowLeft':
        if (playerPosition.x > 0 && maze[playerPosition.y][playerPosition.x - 1] === 0) {
          newPlayerPosition.x -= 1;
        }
        break;
      case 'Dkey':
      case 'ArrowRight':
        if (playerPosition.x < cols - 1 && maze[playerPosition.y][playerPosition.x + 1] === 0) {
          newPlayerPosition.x += 1;
        }
        break;
      default:
        break;
    }
  
    const dotIndex = newDots.findIndex(dot => dot.x === newPlayerPosition.x && dot.y === newPlayerPosition.y);
    if (dotIndex !== -1) {
      newScore += 100;
      newDots.splice(dotIndex, 1);
    }
  
    setPlayerPosition(newPlayerPosition);
    setDots(newDots);
    setScore(newScore);
  
    updateGamePoints('game1', newScore);
  };
  

  useEffect(() => {
    const handleKeyPress = (event) => {
      switch (event.key) {
        case 'w':
        case 'W':
          handleMove('Wkey');
          break;
        case 's':
        case 'S':
          handleMove('Skey');
          break;
        case 'a':
        case 'A':
          handleMove('Akey');
          break;
        case 'd':
        case 'D':
          handleMove('Dkey');
          break;
        case 'ArrowUp':
        case 'ArrowDown':
        case 'ArrowLeft':
        case 'ArrowRight':
          event.preventDefault(); 
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  });

  useEffect(() => {
const sendPointsToBackend = async () => {
  try {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/points`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ game: 'Crazy Maze', points: score }),
    });

    if (!response.ok) {
      throw new Error('Failed to save game points');
    }

    console.log('Game points saved successfully');
  } catch (error) {
    console.error('Error saving game points:', error.message);
  }
};

    sendPointsToBackend();
  }, [score]); 

  const handleReturnHome = () => {
    window.location.href = '/';
  };

  return (
    <div className="game-container" style={{ display: 'flex' }}>
      <div className="maze-container" style={{ flex: 1 }}>
        <div style={{ position: 'relative' }}>
          {maze.map((row, y) =>
            row.map((cell, x) => (
              <div
                key={`${x}-${y}`}
                style={{
                  width: '50px',
                  height: '50px',
                  backgroundColor: cell === 1 ? 'black' : 'white',
                  border: '1px solid black',
                  position: 'absolute',
                  top: y * 50,
                  left: x * 50,
                }}
              >
                {cell === 0 && dots.some(dot => dot.x === x && dot.y === y) && (
                  <div
                    style={{
                      width: '10px',
                      height: '10px',
                      backgroundColor: 'red',
                      borderRadius: '50%',
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                    }}
                  ></div>
                )}
              </div>
            ))
          )}
        </div>
        <Player1 selectedSprite={selectedSprite} setSelectedSprite={setSelectedSprite} position={playerPosition} style={{ position: 'relative' }} />
      </div>
      <div style={{ flex: 1 }}>
        <header className="header">
          <h1>Crazy Maze (collect the red dots)</h1>
          <div>Points: {score}</div>
          <div>Timer: {timeLeft} seconds</div>
        </header>
        <div className="buttons">
          <button onClick={() => handleMove('Wkey')}>up</button>
          <button onClick={() => handleMove('Skey')}>down</button>
          <button onClick={() => handleMove('Akey')}>left</button>
          <button onClick={() => handleMove('Dkey')}>right</button>
          <button style={{borderRadius: '10px'}}onClick={handleReturnHome}>Exit</button>
        </div>
      </div>
    </div>
  );

};

export default Game1;
