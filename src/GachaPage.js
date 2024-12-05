import React, { useState } from "react";

export default function GachaPage({ cards }) {
  const [selectedCards, setSelectedCards] = useState([]);

  // Asigna el color según el valor de la carta
  const getBackgroundColor = (value) => {
    if (value < 30) return "green"; // Baja rareza
    if (value < 70) return "blue"; // Rareza media
    return "purple"; // Alta rareza
  };

  // Selecciona una carta aleatoria
  const selectRandomCard = () => {
    const randomIndex = Math.floor(Math.random() * cards.length);
    return cards[randomIndex];
  };

  // Maneja la selección de una sola carta
  const handleSingleGacha = () => {
    if (cards.length === 0) {
      alert("No hay cartas disponibles");
      return;
    }
    setSelectedCards([selectRandomCard()]);
  };

  // Maneja la selección de diez cartas
  const handleMultiGacha = () => {
    if (cards.length === 0) {
      alert("No hay cartas disponibles");
      return;
    }
    const selected = [];
    for (let i = 0; i < 10; i++) {
      selected.push(selectRandomCard());
    }
    setSelectedCards(selected);
  };

  return (
    <div>
      <h1>Mecánica Gacha</h1>
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <button onClick={handleSingleGacha}>Obtener una carta</button>
        <button onClick={handleMultiGacha}>Obtener 10 cartas</button>
      </div>

      {/* Muestra las cartas seleccionadas */}
      {selectedCards.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
          {selectedCards.map((card, index) => (
            <div
              key={index}
              style={{
                padding: "20px",
                backgroundColor: getBackgroundColor(card.value),
                borderRadius: "10px",
                color: "white",
                textAlign: "center",
              }}
            >
              <h2>{card.title}</h2>
              <img
                src={card.images}
                alt={card.title}
                style={{ width: "100px", height: "100px" }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
