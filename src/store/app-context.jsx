import React, { useState } from "react";

const AppContext = React.createContext({
  isLoading: false,
  tryCount: 0,
  score: 0,
  highScore: 0,
  toGuessPokemon: {
    id: 0, // the user's guess stats to compare
    height: 0,
    weight: 0,
    type: "",
    sprites: {
      front_default: ""
    },
  },
  guessedPokemon: {
    id: 0, // the user's guess stats to compare
    height: 0,
    weight: 0,
    type: "",
    sprites: {
      front_default: ""
    },
  },
  setGuessedPokemon: () => { },
  setToGuessPokemon: () => { },
  setIsLoading: () => { },
  setTryCount: () => { },
  setHighScore: () => { },
  setScore: () => { },
});

export const AppContextProvider = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [tryCount, setTryCount] = useState(1);
  const [highScore, setHighScore] = useState(0);
  const [score, setScore] = useState(0);
  const [guessedPokemon, setGuessedPokemon] = useState({
    name: "", // to initialize all the values so that it doesnt die on first load
    sprites: "",
    id: 0,
    height: 0,
    weight: 0,
    type: "",
  });
  const [toGuessPokemon, setToGuessPokemon] = useState({
    id: 0, // the user's guess stats to compare
    height: 0,
    weight: 0,
    type: "",
  });
  return (
    <AppContext.Provider value={{
      isLoading: isLoading,
      tryCount: tryCount,
      guessedPokemon: guessedPokemon,
      toGuessPokemon: toGuessPokemon,
      highScore: highScore,
      score: score,
      setTryCount: setTryCount,
      setHighScore: setHighScore,
      setIsLoading: setIsLoading,
      setGuessedPokemon: setGuessedPokemon,
      setToGuessPokemon: setToGuessPokemon,
      setScore: setScore
    }}>
      {props.children}
    </AppContext.Provider>
  )
}

export default AppContext;
