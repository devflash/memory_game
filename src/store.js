import { createStore } from 'redux';

const initialState = {
  turn: 1,
  showResult: false,
  player1: {
    cards: [],
    matched: 0,
    choice1: null,
    choice2: null,
    attempts: 0,
  },
  player2: {
    cards: [],
    matched: 0,
    choice1: null,
    choice2: null,
    attempts: 0,
  },
};

export const shufflePlayerCards = (payload) => {
  return {
    type: 'game/shufflePlayerCards',
    payload,
  };
};

export const updatePlayerChoice1 = (payload) => {
  return {
    type: 'game/updatePlayerChoice1',
    payload,
  };
};
export const updatePlayerChoice2 = (payload) => {
  return {
    type: 'game/updatePlayerChoice2',
    payload,
  };
};

export const updatePlayerCards = (payload) => {
  return {
    type: 'game/updatePlayerCards',
    payload,
  };
};

export const resetChoices = () => {
  return {
    type: 'game/resetChoices',
  };
};

export const changeTurn = () => {
  return {
    type: 'game/changeTurn',
  };
};

export const toggleModal = () => {
  return {
    type: 'game/toggleModal',
  };
};

const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'game/shufflePlayerCards':
      return {
        ...state,
        turn: 1,
        player1: {
          ...state.player1,
          cards: action.payload.player1Shuffled.slice(),
          choice1: null,
          choice2: null,
          attempts: 0,
          matched: 0,
        },
        player2: {
          ...state.player2,
          cards: action.payload.player2Shuffled.slice(),
          choice1: null,
          choice2: null,
          attempts: 0,
          matched: 0,
        },
      };

    case 'game/updatePlayerCards':
      return {
        ...state,
        [`player${state.turn}`]: {
          ...state[`player${state.turn}`],
          cards: action.payload.slice(),
          matched: state[`player${state.turn}`].matched + 1,
          choice1: null,
          choice2: null,
        },
      };

    case 'game/updatePlayerChoice1':
      return {
        ...state,
        [`player${state.turn}`]: {
          ...state[`player${state.turn}`],
          choice1: action.payload,
        },
      };

    case 'game/updatePlayerChoice2':
      return {
        ...state,
        [`player${state.turn}`]: {
          ...state[`player${state.turn}`],
          choice2: action.payload,
          attempts: state[`player${state.turn}`].attempts + 1,
        },
      };

    case 'game/resetChoices':
      return {
        ...state,
        [`player${state.turn}`]: {
          ...state[`player${state.turn}`],
          choice1: null,
          choice2: null,
        },
      };

    case 'game/changeTurn':
      return {
        ...state,
        turn: state.turn + 1,
      };

    case 'game/toggleModal':
      return {
        ...state,
        showResult: !state.showResult,
      };

    default:
      return state;
  }
};

const store = createStore(
  gameReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
