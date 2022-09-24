import React from 'react';
import './card.css';

const Card = ({ card, flipped, handleChoice }) => {
  return (
    <div className="card" key={card.id}>
      <img
        src={card.src}
        alt="card"
        className={flipped ? 'front matched' : 'front'}
      />
      <img
        src="/img/cover.png"
        alt="cover"
        className={flipped ? 'back matched' : 'back'}
        onClick={() => handleChoice(card)}
      />
    </div>
  );
};

export default Card;
