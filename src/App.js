import { useEffect } from 'react';
import './App.css';
import Player from './components/player';
import { useSelector, useDispatch } from 'react-redux';
import {
  shufflePlayerCards,
  updatePlayerCards,
  resetChoices,
  changeTurn,
  toggleModal,
} from './store';

const images = [
  {
    src: '/img/helmet-1.png',
    matched: false,
  },
  {
    src: '/img/potion-1.png',
    matched: false,
  },
  {
    src: '/img/ring-1.png',
    matched: false,
  },
  {
    src: '/img/scroll-1.png',
    matched: false,
  },
  {
    src: '/img/shield-1.png',
    matched: false,
  },
  {
    src: '/img/sword-1.png',
    matched: false,
  },
];

function App() {
  const playe1Cards = useSelector((state) => state.player1.cards);
  const playe2Cards = useSelector((state) => state.player2.cards);
  const turn = useSelector((state) => state.turn);

  const choice1 = useSelector((state) => state[`player${state.turn}`].choice1);
  const choice2 = useSelector((state) => state[`player${state.turn}`].choice2);

  const player1Matched = useSelector(
    (state) => state[`player${state.turn}`].matched
  );
  const player2Matched = useSelector(
    (state) => state[`player${state.turn}`].matched
  );

  useEffect(() => {
    if (player1Matched === 6 && turn === 1) {
      setTimeout(() => {
        dispatch(changeTurn());
      }, 2000);
    }
    if (player2Matched === 6 && turn === 2) {
      //show result
      setTimeout(() => dispatch(toggleModal()), 2000);
    }
  }, [player1Matched, player2Matched]);

  const checkChoices = (cards) => {
    if (choice1.src === choice2.src) {
      const newCards = cards.map((cur) => {
        if (cur.id === choice1.id || cur.id === choice2.id) {
          return {
            ...cur,
            matched: true,
          };
        }
        return cur;
      });
      dispatch(updatePlayerCards(newCards));
    } else {
      setTimeout(() => reset(), 2000);
    }
  };

  useEffect(() => {
    if (choice1 && choice2) {
      turn === 1 ? checkChoices(playe1Cards) : checkChoices(playe2Cards);
    }
  }, [choice1, choice2]);

  const reset = () => {
    dispatch(resetChoices());
  };

  const dispatch = useDispatch();

  const shuffle = () => {
    return [...images, ...images]
      .map((card) => ({ ...card, id: Math.random() }))
      .sort((a, b) => a.id - b.id);
  };

  const shuffleCards = () => {
    const player1Shuffled = shuffle(images);
    const player2Shuffled = shuffle(images);
    dispatch(shufflePlayerCards({ player1Shuffled, player2Shuffled }));
  };

  return (
    <>
      <div className="App">
        <h1 className="title">Memory game</h1>
        <div className="container">
          <button type="button" onClick={shuffleCards} className="btn">
            New game
          </button>
          <div className="flex">
            <Player player={1} cards={playe1Cards} turn={turn} />
            <Player player={2} cards={playe2Cards} turn={turn} />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
