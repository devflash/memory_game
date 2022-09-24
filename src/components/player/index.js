import React from 'react';
import './player.css';
import Card from '../card';
import { useSelector, useDispatch } from 'react-redux';
import { updatePlayerChoice1, updatePlayerChoice2 } from '../../store';
import Modal from '../modal';

const Player = ({ player, cards, turn }) => {
  const dispatch = useDispatch();
  const choice1 = useSelector((state) => state[`player${state.turn}`].choice1);
  const choice2 = useSelector((state) => state[`player${state.turn}`].choice2);
  const player1Attempts = useSelector((state) => state.player1.attempts);
  const player2Attempts = useSelector((state) => state.player2.attempts);

  const handleChoice = (card) => {
    if (!choice1) {
      dispatch(updatePlayerChoice1(card));
    } else {
      dispatch(updatePlayerChoice2(card));
    }
  };

  return (
    <>
      {cards?.length > 0 && (
        <div className="player">
          {turn !== player && <div className="backdrop"></div>}
          <p>Player {player}</p>
          <p>Attempts: {player === 1 ? player1Attempts : player2Attempts}</p>
          <div className="card-grid">
            {cards.map((card) => (
              <Card
                key={card.id}
                card={card}
                handleChoice={handleChoice}
                flipped={card === choice1 || card === choice2 || card.matched}
              />
            ))}
          </div>
        </div>
      )}
      <Modal
        winner={player1Attempts > player2Attempts ? 'Player 2' : 'Player 1'}
      />
    </>
  );
};

export default Player;
