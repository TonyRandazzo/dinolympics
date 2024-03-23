import React, { useState, useEffect, useRef } from 'react';
import Player2 from './Player2';
import Obstacle from './Obstacle';
import { usePoints } from './PointContext'; 

const Game2 = ({selectedSprite, setSelectedSprite}) => {
  const [isJumping, setIsJumping] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const dinoRef = useRef(null);
  const obstacleRef = useRef(null);
  const gameAreaRef = useRef(null);
  const [timer, setTimer] = useState(10); 
  const [score, setScore] = useState(0); 
  const { game2Points, updateGamePoints } = usePoints(); 

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.keyCode === 32 && !isJumping && !isGameOver) {
        setIsJumping(true);
        jump();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isJumping, isGameOver]);

  useEffect(() => {
    const checkCollision = () => {
      const dino = dinoRef.current;
      const obstacle = obstacleRef.current;

      if (
        dino && obstacle &&
        dino.getBoundingClientRect().right > obstacle.getBoundingClientRect().left &&
        dino.getBoundingClientRect().bottom > obstacle.getBoundingClientRect().top &&
        dino.getBoundingClientRect().left < obstacle.getBoundingClientRect().right
      ) {
        setIsGameOver(true);
      }
    };

    const gameInterval = setInterval(checkCollision, 10);

    return () => clearInterval(gameInterval);
  }, []);

  useEffect(() => {
    const moveObstacle = () => {
      const obstacle = obstacleRef.current;
    
      if (obstacle) {
        const moveInterval = setInterval(() => {
          const currentPosition = parseInt(window.getComputedStyle(obstacle).getPropertyValue('left'));
    
          if (currentPosition > -20) {
            obstacle.style.left = `${currentPosition - 3}px`;
          } else {
            obstacle.style.left = '100%'; // Modifica: Posiziona l'ostacolo alla fine dell'area di gioco
          }
        }, 10);
    
        return () => clearInterval(moveInterval);
      }
    };

    const obstacleMoveInterval = moveObstacle();

    return () => clearInterval(obstacleMoveInterval);
  }, []);

  useEffect(() => {
    if (isGameOver) {
      if (typeof window !== 'undefined') {
        window.location.reload();
      }
    }
  }, [isGameOver]);

  useEffect(() => {
    let newScore = score;
    const countdown = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
      setScore((prevScore) => prevScore + 100); 
      updateGamePoints('game2', newScore);
    }, 1000);

    if (timer === 0) {
      setIsGameOver(true);
      clearInterval(countdown);
    }

    return () => clearInterval(countdown);
  }, [timer]);

  useEffect(() => {
    const sendPointsToBackend = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/points`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ game: 'Feverish Run', points: score }), 
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

  const jump = () => {
    let count = 0;
    const jumpInterval = setInterval(() => {
      const dino = dinoRef.current;

      if (count === 15) {
        clearInterval(jumpInterval);
        const descendInterval = setInterval(() => {
          const bottom = parseInt(window.getComputedStyle(dino).getPropertyValue('bottom'));

          if (bottom > 0) {
            dino.style.bottom = `${bottom - 8}px`;
          } else {
            clearInterval(descendInterval);
            setIsJumping(false);
          }
        }, 20);
      } else {
        const bottom = parseInt(window.getComputedStyle(dino).getPropertyValue('bottom'));
        dino.style.bottom = `${bottom + 8}px`;
        count++;
      }
    }, 20);
  };

  const handleJumpButtonClick = () => {
    if (!isJumping && !isGameOver) {
      setIsJumping(true);
      jump();
    }
  };
  
  const handleReturnHome = () => {
    window.location.href = '/';
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <h1>Feverish run (Jump!)</h1>
      <div
        ref={gameAreaRef}
        style={{
          position: 'relative',
          width: '100%',
          paddingBottom: '50%',
          border: 'solid 5px black',
          borderRadius: '25px',
          backgroundColor: 'white',
          overflow: 'hidden',
        }}
      >
        {!isGameOver && <Player2 selectedSprite={selectedSprite} setSelectedSprite={setSelectedSprite} reference={dinoRef} />}
        {!isGameOver && <Obstacle reference={obstacleRef} />}
        <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
          Timer: {timer} seconds
        </div>
        <div style={{ position: 'absolute', top: '30px', right: '10px' }}>
          Score: {score}
        </div>
      </div>
      <div className="buttons">
        <button
          onClick={handleJumpButtonClick}
          disabled={isJumping || isGameOver}
        >
          Jump
        </button>
        <button style={{borderRadius: '10px'}}onClick={handleReturnHome}>Exit</button>
      </div>
    </div>
  );
};

export default Game2;
