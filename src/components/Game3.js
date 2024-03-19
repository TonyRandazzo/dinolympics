import React, { useState, useEffect } from 'react';
import Player3 from './Player3';

const rows = 5;
const cols = 5;

const Game3 = () => {
  const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 });
  const [blackCell, setBlackCell] = useState({ x: -1, y: -1 });
  const [timeLeft, setTimeLeft] = useState(10);
  const [points, setPoints] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      const randomX = Math.floor(Math.random() * cols);
      const randomY = Math.floor(Math.random() * rows);
      setBlackCell({ x: randomX, y: randomY });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    const countdownTimer = setInterval(() => {
      setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
    }, 1000);

    return () => {
      clearInterval(countdownTimer);
    };
  }, []);

  useEffect(() => {
    if (timeLeft === 0) {
      window.location.reload();
    }
  }, [timeLeft]);

  useEffect(() => {
    const handleKeyPress = (event) => {
      let newPlayerPosition = { ...playerPosition };

      switch (event.key) {
        case 'w':
        case 'W':
        case 'ArrowUp':
          if (playerPosition.y > 0) {
            newPlayerPosition.y -= 1;
          }
          break;
        case 's':
        case 'S':
        case 'ArrowDown':
          if (playerPosition.y < rows - 1) {
            newPlayerPosition.y += 1;
          }
          break;
        case 'a':
        case 'A':
        case 'ArrowLeft':
          if (playerPosition.x > 0) {
            newPlayerPosition.x -= 1;
          }
          break;
        case 'd':
        case 'D':
        case 'ArrowRight':
          if (playerPosition.x < cols - 1) {
            newPlayerPosition.x += 1;
          }
          break;
        default:
          break;
      }
      if (newPlayerPosition.x === blackCell.x && newPlayerPosition.y === blackCell.y) {
        window.location.reload(); // Reload the page if player is on black cell
      } else {
        setPlayerPosition(newPlayerPosition);
      }
    };

    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  });

  useEffect(() => {
    const pointsTimer = setInterval(() => {
      setPoints((prevPoints) => prevPoints + 1);
    }, 1000);

    return () => {
      clearInterval(pointsTimer);
    };
  }, []);

  const handleMove = (direction) => {
    let newPlayerPosition = { ...playerPosition };

    switch (direction) {
      case 'Wkey':
      case 'ArrowUp':
        if (playerPosition.y > 0) {
          newPlayerPosition.y -= 1;
        }
        break;
      case 'Skey':
      case 'ArrowDown':
        if (playerPosition.y < rows - 1) {
          newPlayerPosition.y += 1;
        }
        break;
      case 'Akey':
      case 'ArrowLeft':
        if (playerPosition.x > 0) {
          newPlayerPosition.x -= 1;
        }
        break;
      case 'Dkey':
      case 'ArrowRight':
        if (playerPosition.x < cols - 1) {
          newPlayerPosition.x += 1;
        }
        break;
      default:
        break;
    }

    if (newPlayerPosition.x === blackCell.x && newPlayerPosition.y === blackCell.y) {
      window.location.reload(); // Reload the page if player is on black cell
    } else {
      setPlayerPosition(newPlayerPosition);
    }
  };

  return (
    <div className="game-container" style={{ display: 'flex' }}>
      <div style={{ flex: 1 }}>
        <header className="header">
          <h1>Game Title</h1>
          <div>Punteggio: {points}</div>
          <div>Tempo rimanente: {timeLeft} secondi</div>
          <div className="buttons">
            <button onClick={() => handleMove('Wkey')}>up</button>
            <button onClick={() => handleMove('Skey')}>down</button>
            <button onClick={() => handleMove('Akey')}>left</button>
            <button onClick={() => handleMove('Dkey')}>right</button>
          </div>
        </header>
      </div>
      <div className="maze-container" style={{ position: 'relative' }}>
        {Array.from({ length: rows }).map((_, y) => (
          <div key={y} style={{ display: 'flex' }}>
            {Array.from({ length: cols }).map((_, x) => (
              <div
                key={`${x}-${y}`}
                style={{
                  width: '50px',
                  height: '50px',
                  backgroundColor: blackCell.x === x && blackCell.y === y ? 'black' : 'white',
                  border: '1px solid black',
                }}
              ></div>
            ))}
          </div>
        ))}
        <Player3 position={playerPosition} style={{ position: 'relative' }} />
      </div>
    </div>
  );
};

export default Game3;
