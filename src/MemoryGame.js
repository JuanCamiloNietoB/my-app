import React, { useState, useEffect } from "react";
import "./MemoryGame.css";

export default function MemoryGame({ cards }) {
  const [shuffledCards, setShuffledCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);

  useEffect(() => {
    const duplicatedCards = [...cards, ...cards].map((card, index) => ({
      ...card,
      id: `${card.id}-${index}`,
    }));
    setShuffledCards(duplicatedCards.sort(() => Math.random() - 0.5));
  }, [cards]);

  const handleCardClick = (card) => {
    if (flippedCards.length < 2 && !flippedCards.includes(card.id)) {
      setFlippedCards((prev) => [...prev, card.id]);
    }
  };

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [firstCard, secondCard] = flippedCards.map((id) =>
        shuffledCards.find((card) => card.id === id)
      );

      if (firstCard.title === secondCard.title) {
        setMatchedCards((prev) => [...prev, firstCard.id, secondCard.id]);
      }
      setTimeout(() => setFlippedCards([]), 1000);
    }
  }, [flippedCards, shuffledCards]);

  return (
    <div className="memory-game">
      <h1>Juego de Memoria</h1>
      <div className="card-grid">
        {shuffledCards.map((card) => (
          <div
            key={card.id}
            className={`card ${
              flippedCards.includes(card.id) || matchedCards.includes(card.id)
                ? "flipped"
                : ""
            }`}
            onClick={() => handleCardClick(card)}
          >
            <div className="card-front">
              <img src={card.images} alt={card.title} />
            </div>
            <div className="card-back"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
