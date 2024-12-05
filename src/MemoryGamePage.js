import React, { useState, useEffect } from "react";
import "./MemoryGamePage.css";

const LINK = "https://backend-api-mcp3.onrender.com/carts";

const MemoryGamePage = () => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [lockBoard, setLockBoard] = useState(false);
  const [timer, setTimer] = useState(0);
  const [intervalId, setIntervalId] = useState(null);

  // Fetch cards from the API
  useEffect(() => {
    fetch(LINK)
      .then((res) => res.json())
      .then((data) => {
        const doubledCards = [...data, ...data].map((card, index) => ({
          ...card,
          uniqueId: `${card.id}-${index}`, // Ensure unique ID for matching
        }));
        setCards(shuffleArray(doubledCards));
        startTimer();
      });
  }, []);

  // Shuffle array
  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  // Timer logic
  const startTimer = () => {
    const id = setInterval(() => setTimer((prev) => prev + 1), 1000);
    setIntervalId(id);
  };

  const stopTimer = () => {
    clearInterval(intervalId);
  };

  const resetTimer = () => {
    setTimer(0);
  };

  // Handle card click
  const handleCardClick = (card) => {
    if (lockBoard || flippedCards.includes(card.uniqueId)) return;

    setFlippedCards((prev) => [...prev, card.uniqueId]);

    if (flippedCards.length === 1) {
      const firstCardId = flippedCards[0];
      const secondCardId = card.uniqueId;

      const firstCard = cards.find((c) => c.uniqueId === firstCardId);
      const secondCard = cards.find((c) => c.uniqueId === secondCardId);

      if (firstCard.id === secondCard.id) {
        setMatchedCards((prev) => [...prev, firstCardId, secondCardId]);

        if (matchedCards.length + 2 === cards.length) {
          stopTimer();
          alert(`¡Juego terminado! Tiempo: ${timer} segundos.`);
        }
      } else {
        setLockBoard(true);
        setTimeout(() => {
          setFlippedCards((prev) =>
            prev.filter((id) => id !== firstCardId && id !== secondCardId)
          );
          setLockBoard(false);
        }, 1500);
      }
    }
  };

  return (
    <div className="game-container">
      <h1>Juego de Memoria</h1>
      <p id="timer">Tiempo: {timer}s</p>
      <div className="game-board">
        {cards.map((card) => (
          <div
            key={card.uniqueId}
            className={`memory-card ${
              flippedCards.includes(card.uniqueId) || matchedCards.includes(card.uniqueId)
                ? "flipped"
                : ""
            }`}
            onClick={() => handleCardClick(card)}
          >
            <div className="card-front"></div>
            <div className="card-back">
              <img src={card.images} alt={card.title} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MemoryGamePage;
