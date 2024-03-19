import React, { useState, useEffect, useRef } from 'react';
import Player2 from './Player2';
import Obstacle from './Obstacle';

const Game2 = () => {
  const [isJumping, setIsJumping] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const dinoRef = useRef(null);
  const obstacleRef = useRef(null);
  const gameAreaRef = useRef(null);
  const [timer, setTimer] = useState(10); // Timer di 10 secondi
  const [score, setScore] = useState(0); // Punteggio
  

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
            obstacle.style.left = '600px';
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
    const countdown = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
      setScore((prevScore) => prevScore + 1); // Aggiungo un punto ad ogni decremento del timer
    }, 1000);

    if (timer === 0) {
      setIsGameOver(true);
      clearInterval(countdown);
    }

    return () => clearInterval(countdown);
  }, [timer]);

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

  return (
    <div>
      <h1>Feverish run</h1>
      <div
        ref={gameAreaRef}
        style={{
          position: 'relative',
          width: '600px',
          height: '200px',
          border: 'solid 5px black',
          borderRadius: '25px',
          backgroundColor: 'white',
          margin: '0 auto',
        }}
      >
        {!isGameOver && <Player2 reference={dinoRef} />}
        {!isGameOver && <Obstacle reference={obstacleRef} />}
        <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
          Timer: {timer}
        </div>
        <div style={{ position: 'absolute', top: '30px', right: '10px' }}>
          Score: {score}
        </div>
      </div>
    </div>
  );
};

export default Game2;
