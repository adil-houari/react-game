import React, { useState, useEffect } from 'react';

const COLORS = ['🔴', '🟡', '🟢', '🔵', '🟣'];
const MAX_ATTEMPTS = 10;

function CodeBreaker() {
    const [secretCode, setSecretCode] = useState([]);
    const [currentGuess, setCurrentGuess] = useState([]);
    const [history, setHistory] = useState([]);
    const [gameOver, setGameOver] = useState(false);
    const [message, setMessage] = useState('');
    const [shake, setShake] = useState(false);

    useEffect(() => {
        resetGame();
    }, []);

    const resetGame = () => {
        const shuffledColors = [...COLORS].sort(() => 0.5 - Math.random());
        const code = shuffledColors.slice(0, 4); // couleurs uniques
        setSecretCode(code);
        setCurrentGuess([]);
        setHistory([]);
        setGameOver(false);
        setMessage('');
    };

    const addColor = (color) => {
        if (currentGuess.length >= 4 || gameOver) return;
        if (currentGuess.includes(color)) return; // bloque doublon
        setCurrentGuess([...currentGuess, color]);
    };

    const handleGuess = () => {
        if (currentGuess.length !== 4) return;

        const correct = currentGuess.filter((color, index) => color === secretCode[index]).length;

        const result = {
            guess: [...currentGuess],
            correct
        };

        const newHistory = [...history, result];
        setHistory(newHistory);
        setCurrentGuess([]);

        if (correct === 4) {
            setGameOver(true);
            setMessage('✅ Bravo! You cracked the code!');
        } else if (newHistory.length >= MAX_ATTEMPTS) {
            setGameOver(true);
            setMessage(`❌ Game Over! Code was ${secretCode.join(' ')}`);
        } else {
            setMessage(`🧩 ${correct} in the correct place`);

            // effet shake
            setShake(true);
            setTimeout(() => setShake(false), 500);
        }
    };

    return (
        <div className="code-breaker">
            <div className="color-options">
                {COLORS.map((color, i) => (
                    <button key={i} onClick={() => addColor(color)} className="color-btn">
                        {color}
                    </button>
                ))}
            </div>

            <div className={`current-guess ${shake ? 'shake' : ''}`}>
                {currentGuess.map((color, i) => (
                    <span key={i} className="color-guess">{color}</span>
                ))}
            </div>

            <button
                className="submit-btn"
                onClick={handleGuess}
                disabled={currentGuess.length !== 4}
            >
                Submit Guess
            </button>

            <div className="message">{message}</div>

            <div className="history">
                <h3>Attempts:</h3>
                {history.map((entry, i) => (
                    <div key={i} className="history-item">
                        {entry.guess.join(' ')} → {entry.correct} correct
                    </div>
                ))}
            </div>

            {gameOver && (
                <button className="reset-btn" onClick={resetGame}>
                    Play Again 🔁
                </button>
            )}
        </div>
    );
}

export default CodeBreaker;
