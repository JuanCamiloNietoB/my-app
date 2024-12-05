import React, { useEffect, useState } from "react";
import "./MemoryGame.css";

const LINK = "https://backend-api-mcp3.onrender.com/carts";

export default function MemoryGame() {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const res = await fetch(LINK);
        const data = await res.json();
        const duplicatedCards = [...data, ...data].map((card, index) => ({
          ...card,
          id: `${card.id}-${index}`,
        }));
        setCards(shuffleArray(duplicatedCards));
        setIsTimerRunning(true); // Start timer on game initialization
      } catch (err) {
        console.error("Error fetching cards:", err);
      }
    };
  
    fetchCards();
  }, []);
  
 
  

  useEffect(() => {
    // Start the timer when the game starts
    if (isTimerRunning) {
      const interval = setInterval(() => setTimer((prev) => prev + 1), 1000);
      return () => clearInterval(interval);
    }
  }, [isTimerRunning]);

  

  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const handleCardClick = (card) => {
    if (
      flippedCards.length < 2 &&
      !flippedCards.includes(card.id) &&
      !matchedCards.includes(card.id)
    ) {
      setFlippedCards((prev) => [...prev, card.id]);
    }
  };

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [firstId, secondId] = flippedCards;
      const firstCard = cards.find((card) => card.id === firstId);
      const secondCard = cards.find((card) => card.id === secondId);

      if (firstCard?.id.split("-")[0] === secondCard?.id.split("-")[0]) {
        // Match found
        setMatchedCards((prev) => [...prev, firstId, secondId]);
      }

      setTimeout(() => setFlippedCards([]), 1000);
    }
  }, [flippedCards, cards]);

  useEffect(() => {
    if (matchedCards.length === cards.length && cards.length > 0) {
      setIsTimerRunning(false);
      alert(`¡Juego terminado! Tiempo: ${timer}s.`);
    }
  }, [matchedCards, cards, timer]);

  return (
    <div className="memory-game">
      <h1>Juego de Memoria</h1>
      <p>Tiempo: {timer}s</p>
      <div className="card-grid">
        {cards.map((card) => (
          <div
            key={card.id}
            className={`memory-card ${
              flippedCards.includes(card.id) || matchedCards.includes(card.id)
                ? "flipped"
                : ""
            }`}
            onClick={() => handleCardClick(card)}
          >
            <div className="card-front">
              <img src={card.images} alt={card.title} />
            </div>
            <div className="card-back">?</div>
          </div>
        ))}
      </div>
    </div>
  );
}
