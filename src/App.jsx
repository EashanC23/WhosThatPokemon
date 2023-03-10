import React, { useEffect, useRef, useState } from "react";
import "./App.css";
// import Loader from "./components/loader/Loader";
import pokemonList from "./pokemon.js";
import StatsBox from "./components/StatsBox/StatsBox";
import Sprite from "./components/PokemonSprite/Sprite";

function App() {
  const [gameData, setGameData] = useState({
    spriteBrightness: 0,

  })
  const [guessedPokemonData, setguessedPokemonData] = useState({
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
  // const [comparedStats, setComparedStats] = useState({
  //   id: 0,
  //   height: 0,
  //   weight: 0,
  // });
  const [tryCount, setTryCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [score, setScore] = useState(0);
  let highScore = localStorage.getItem("highScore");
  if (highScore == null) highScore = 0;

  async function fetchPokemon(id) {
    setIsLoading(true);
    await fetch(
      "https://pokeapi.co/api/v2/pokemon/" + pokemonList[id] + "/"
    ).then((res) =>
      res.json().then((data) => {
        setIsLoading(false);
        return {
          name: data.name,
          id: data.id,
          weight: data.weight,
          sprites: data.sprites[0],
          type: data.type,
        };
      })
    );
  }

  const intialFetchguessedPokemonData = async () => {
    setTryCount(0);
    const id = Math.floor(Math.random() * 906);
    setIsLoading(true);
    fetch("https://pokeapi.co/api/v2/pokemon/" + pokemonList[id] + "/").then(
      (res) =>
        res.json().then((data) => {
          setIsLoading(false);
          setguessedPokemonData(data);
        })
    );
  };
  useEffect(() => {
    // running fetchpoekmon data on run
    intialFetchguessedPokemonData();
  }, []);

  const correctGuessHandler = () => {
    alert("You Got it! ");
    intialFetchguessedPokemonData();
    guessInputRef.current.value = "";
    setToGuessPokemon({
      id: 0,
      height: 0,
      weight: 0,
      type: "",
    });
  };

  const incorrectGuessHandler = () => {
    if (tryCount < 3) {
      alert(" Try again " + (3 - tryCount) + " tries remaining.");
      setTryCount(tryCount + 1);
      guessInputRef.current.value = "";
      return;
    } else {
      alert(" Nice try. Streak reset ! ");
      if (score > highScore) {
        localStorage.setItem("highScore", score);
      }
      guessInputRef.current.value = "";
      setToGuessPokemon({
        id: 0,
        height: 0,
        weight: 0,
        type: "",
      });
      intialFetchguessedPokemonData();
    }
  };

  const guessHandler = async (event) => {
    event.preventDefault();
    const guessCurrentPokemon = guessInputRef.current.value.toLowerCase();
    if (!pokemonList.includes(guessCurrentPokemon)) {
      alert("not a pokemon name. Try again.");
      return;
    }
    // console.log(guessCurrentPokemon);
    fetch(
      "https://pokeapi.co/api/v2/pokemon/" + guessCurrentPokemon + "/"
    ).then((res) =>
      res
        .json()
        .then((data) => {
          setToGuessPokemon(data);
          // console.log(data);
          if (data.name === guessedPokemonData.name) {
            correctGuessHandler();
          } else {
            incorrectGuessHandler();
          }
        })
        .catch((err) => {
          console.log(err.message);
        })
    );
  };

  let guessInputRef = useRef(""); // Input ref
  // COMPONENT RENDERING
  return (
    <div className="main">
      {isLoading ? (
        // <Loader />
        <div>loading</div>
      ) : (
        <div>
          <p> {guessedPokemonData.name.toUpperCase()} </p>
        {/*<img
            src={guessedPokemonData.sprites.front_default}
            alt="pokemon sprite"
            data-caman="brightness=(-100)"
          />*/}
          <img src={guessedPokemonData.sprites.front_default} style={{width: '70%', height: '70%', filter: 'contrast(0%) brightness(0%)'}}/> 
        </div>
      )}
      <form onSubmit={guessHandler}>
        <input ref={guessInputRef}></input>
      </form>
      <button onClick={intialFetchguessedPokemonData}> New Pokémon</button>
      <div>
        <p>
          Height: {!isLoading ? guessedPokemonData.height : "loading"}
          <br />
          Weight : {!isLoading ? guessedPokemonData.weight : "loading"}
          <br />
          Id : {!isLoading ? guessedPokemonData.id : "loading"}
          <br />
          {/* Type : {guessedPokemonData.types} */}
        </p>
        {isLoading ? (
          "meow"
        ) : (
          <>
            <StatsBox
              guessedStat={guessedPokemonData.height}
              referenceStat={toGuessPokemon.height}
            >
              Height: {toGuessPokemon.height}
            </StatsBox>
            <StatsBox
              guessedStat={guessedPokemonData.weight}
              referenceStat={toGuessPokemon.weight}
            >
              Weight: {toGuessPokemon.weight}
            </StatsBox>
            <StatsBox
              guessedStat={guessedPokemonData.id}
              referenceStat={toGuessPokemon.id}
            >
              ID: {toGuessPokemon.id}
            </StatsBox>
          </>
        )}
      </div>

      <p>score: {score}</p>
      <p>high score: {highScore} </p>
      <p>tries: {tryCount} </p>
    </div>
  );
}

export default App;
