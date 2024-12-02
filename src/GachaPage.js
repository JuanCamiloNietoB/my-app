import React, { useState } from "react";

export default function GachaPage({ cards }) {
  const [selectedCard, setSelectedCard] = useState(null);

  // Asigna el color según el valor de la carta
  const getBackgroundColor = (value) => {
    if (value < 30) return "green"; // Baja rareza
    if (value < 70) return "blue"; // Rareza media
    return "red"; // Alta rareza
  };

  const handleGacha = () => {
    if (cards.length === 0) {
      alert("No hay cartas disponibles");
      return;
    }
    // Selecciona una carta aleatoria
    const randomIndex = Math.floor(Math.random() * cards.length);
    setSelectedCard(cards[randomIndex]);
  };

  return (
    <div>
      <h1>Mecánica Gacha</h1>
      <button onClick={handleGacha}>Jugar Gacha</button>

      {/* Muestra la carta seleccionada con su color de fondo */}
      {selectedCard && (
        <div
          style={{
            marginTop: "20px",
            padding: "20px",
            backgroundColor: getBackgroundColor(selectedCard.value),
            borderRadius: "10px",
            color: "white",
            textAlign: "center",
          }}
        >
          <h2>{selectedCard.title}</h2>
          <p>{selectedCard.description}</p>
          <p>
            <strong>Valor:</strong> {selectedCard.value}
          </p>
          <img
            src={selectedCard.images}
            alt={selectedCard.title}
            style={{ width: "100px", height: "100px" }}
          />
        </div>
      )}
    </div>
  );
}
