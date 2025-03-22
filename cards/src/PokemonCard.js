import React from "react";
import useFlip from "./hooks";
import "./PokemonCard.css";

/** Renders a single Pokemon card. */
function PokemonCard({ front, back, name, stats }) {
  const [isFacingUp, flipCard] = useFlip(); // Using the custom hook

  return (
    <div className="PokemonCard Card" onClick={flipCard}>
      <div className="PokemonCard-image">
        <img src={isFacingUp ? front : back} alt={name} />
      </div>
      <div className="PokemonCard-info">
        <p className="PokemonCard-name">{name}</p>
        <ul className="PokemonCard-stats">
          {stats.map(stat => (
            <li key={stat.name}>
              {stat.name}: {stat.value}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default PokemonCard;
