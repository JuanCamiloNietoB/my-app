import React, { useState, useEffect } from "react";
import "./MemoryGamePage.css";

export default function MemoryGamePage({ cards }) {
  const [shuffledCards, setShuffledCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);

  useEffect(() => {
    // Duplica y mezcla las cartas
    const duplicatedCards = [...cards, ...cards].map((card, index) => ({
      ...card,
      id: `${card.id}-${index}`,
    }));
    setShuffledCards(shuffleArray(duplicatedCards));
  }, [cards]);

  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const handleCardClick = (card) => {
    if (
      selectedCards.length < 2 &&
      !selectedCards.find((selected) => selected.id === card.id) &&
      !matchedCards.includes(card.id)
    ) {
      setSelectedCards([...selectedCards, card]);
    }
  };

  useEffect(() => {
    if (selectedCards.length === 2) {
      const [firstCard, secondCard] = selectedCards;
      if (firstCard.title === secondCard.title) {
        // Si las cartas coinciden
        setMatchedCards([...matchedCards, firstCard.id, secondCard.id]);
      }
      setTimeout(() => setSelectedCards([]), 1000);
    }
  }, [selectedCards, matchedCards]);

  return (
    <div className="memory-game">
      <h1>Juego de Memoria</h1>
      <div className="card-grid">
        {shuffledCards.map((card) => (
          <div
            key={card.id}
            className={`memory-card ${
              matchedCards.includes(card.id) || selectedCards.includes(card)
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
