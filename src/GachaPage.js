import React from "react";

export default function GachaPage() {
  const getRandomColor = (value) => {
    if (value < 30) return "verde";
    if (value < 70) return "azul";
    return "rojo";
  };

  const handleGacha = () => {
    const randomValue = Math.floor(Math.random() * 100); // Genera un valor aleatorio
    const color = getRandomColor(randomValue);
    alert(`Obtuviste una carta de color: ${color}`);
  };

  return (
    <div>
      <h1>Mecánica Gacha</h1>
      <button onClick={handleGacha}>Jugar Gacha</button>
    </div>
  );
}
