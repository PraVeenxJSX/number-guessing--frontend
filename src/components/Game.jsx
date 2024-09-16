import React, { useState } from 'react';
import Confetti from 'react-confetti';

const Game = () => {
  const [randomNumber, setRandomNumber] = useState(Math.floor(Math.random() * 100) + 1);
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Make the fetch request to your backend
      const response = await fetch('https://number-guessing-backend.vercel.app/api/submit-guess', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ guess }), // sending the guess to backend
      });

      const data = await response.json();
      setResult(data); // Handling the response from backend
    } catch (error) {
      console.error('Error:', error);
    }
  };


  const handleGuess = () => {
    const userGuess = parseInt(guess);
    if (userGuess === randomNumber) {
      setMessage('Correct! You win!');
      setScore(score + 10);
      if (score + 10 > highScore) {
        setHighScore(score + 10);
        setShowConfetti(true);
      }
      setRandomNumber(Math.floor(Math.random() * 100) + 1);
    } else if (userGuess < randomNumber) {
      setMessage('Too low!');
    } else {
      setMessage('Too high!');
    }
    setGuess('');
  };

  return (
    <div className="game">
      {showConfetti && <Confetti />}
      <h1>Guess the Number!</h1>
      <input
        type="number"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        placeholder="Enter your guess"
      />
      <button onClick={handleGuess}>Submit Guess</button>
      <p>{message}</p>
      <p>Score: {score}</p>
      <p>High Score: {highScore}</p>
    </div>
  );
};

export default Game;