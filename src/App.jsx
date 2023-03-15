import React from "react";
import "./App.css";
// import Loader from "./components/loader/Loader";
// import StatsBox from "./components/StatsBox/StatsBox";
import GameArea from "./components/GameArea/GameArea";
// import Sprite from "./components/PokemonSprite/Sprite";
// import UserInput from "./components/InputBox/UserInput";
import AppContext, { AppContextProvider } from "./store/app-context";
import StatsArea from "./components/StatsArea/StatsArea";

function App() {
  return (
    <AppContextProvider>
      <div style={{ height: "100vh" }}>
        <div style={{ height: "1vh", display: "inline-block", position: "static", minWidth:"50vh" }}>
          <GameArea className="GameArea" />
        </div>
        <div style={{ height: "1vh", display: "inline-block", position: "static" }}>
          <StatsArea />
        </div>
      </div>
    </AppContextProvider>
  );
}

export default App;
