import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import pokemonList from "../../pokemon";
import AppContext from "../../store/app-context";
import UserInput from "../InputBox/UserInput";

function GameArea() {
  const ctx = useContext(AppContext);

  function linearSearch(arr, target) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === target) {
        return i;
      }
    }

    return -1;
  }
  useEffect(() => {
    // running fetchpoekmon data on run
    intialFetchguessedPokemonData();
    let hScore = localStorage.getItem("highScore");
    if (hScore == null) hScore = 0;
    ctx.setHighScore(hScore);
  }, []);
  useCallback(() => { }, [])
  const intialFetchguessedPokemonData = async () => {
    ctx.setTryCount(0);
    const id = Math.floor(Math.random() * 906);
    ctx.setIsLoading(true);
    fetch("https://pokeapi.co/api/v2/pokemon/" + id + "/").then(
      (res) =>
        res.json().then((data) => {
          ctx.setIsLoading(false);
          ctx.setGuessedPokemon(data);
        })
    ).catch(e => {
      console.err(e);
    });
  };
  const resetToGuessPokemon = () => {
    ctx.setToGuessPokemon({
      id: 0,
      height: 0,
      weight: 0,
      type: "",
    });
  }
  const correctGuessHandler = () => {
    const sprite = document.getElementById("sprite");
    sprite.style.filter = "none";
    alert("You Got it! ");
    ctx.setScore(ctx.score + 1);
    intialFetchguessedPokemonData();
    resetToGuessPokemon();
    guessInputRef.current.value = "";
  };

  const incorrectGuessHandler = () => {
    if (ctx.tryCount < 3) {
      alert(" Try again " + (3 - ctx.tryCount) + " tries remaining.");
      ctx.setTryCount(ctx.tryCount + 1);
      guessInputRef.current.value = "";
      return;
    } else {
      alert(" Nice try. Streak reset ! ");
      if (ctx.score > ctx.highScore) {
        ctx.setHighScore(ctx.score)
        localStorage.setItem("highScore", ctx.score);
      }
      ctx.setScore(0);
      guessInputRef.current.value = "";
      resetToGuessPokemon()
      intialFetchguessedPokemonData();
    }
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const guessHandler = async (event) => {
    event.preventDefault();
    if (isSubmitting) {
      console.log("meow")
      return

    }
    setIsSubmitting(true);
    ctx.setTryCount(ctx.tryCount + 1);
    const guessCurrentPokemon = guessInputRef.current.value.toLowerCase();
    if (!pokemonList.includes(guessCurrentPokemon)) {
      alert("not a pokemon name. Try again.");
      setIsSubmitting(false);
      return;
    }
    const id = linearSearch(pokemonList, guessCurrentPokemon) + 1;

    fetch(
      "https://pokeapi.co/api/v2/pokemon/" + id + "/"
    ).then((res) =>
      res
        .json()
        .then((data) => {
          ctx.setToGuessPokemon(data);
          // console.log(data);
          if (data.name === ctx.guessedPokemon.name) {
            const sprite = document.getElementById("sprite");
            sprite.style.filter = "none";
            correctGuessHandler();

          } else {
            incorrectGuessHandler();
          }
        })
        .catch((err) => {
          console.log(err.message);
        })
    );
    setIsSubmitting(false);
    guessInputRef.current.value = "";

  };

  let guessInputRef = useRef(""); // Input ref

  return (
    <>
      {ctx.isLoading ? (
        <div>loading</div>
      ) : (
        <div>
          <span>
            <img id="sprite" src={ctx.guessedPokemon.sprites.front_default} style={{ width: '30vh', height: '30vh', filter: 'contrast(0%) brightness(0%)' }} />
          </span>
        </div>
      )}
      <form onSubmit={guessHandler}>
        {/*<input ref={guessInputRef} list="pokemonDataList" />*/}
        <UserInput ref={guessInputRef} />
        <datalist id="pokemonDataList">
          {pokemonList.map((pokemon) => {
            return (
              <option> {pokemon} </option>
            )
          }
          )}
        </datalist>
      </form>
    </>
  )
}
export default GameArea;

