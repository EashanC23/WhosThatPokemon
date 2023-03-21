import React, { useContext } from "react";
import AppContext from "../../store/app-context";
import StatsBox from "../StatsBox/StatsBox";

function StatsArea() {
	const ctx = useContext(AppContext);
	return (
		<div className="container">
			<div className="pokemonStats">
				{ctx.isLoading ? (
					"loading"
				) : (
					<>
						<StatsBox
							guessedStat={ctx.guessedPokemon.height}
							referenceStat={ctx.toGuessPokemon.height}
						>
							Height
						</StatsBox>
						<StatsBox
							guessedStat={ctx.guessedPokemon.weight}
							referenceStat={ctx.toGuessPokemon.weight}
						>
							Weight
						</StatsBox>
						<StatsBox
							guessedStat={ctx.guessedPokemon.id}
							referenceStat={ctx.toGuessPokemon.id}
						>
							ID
						</StatsBox>
					</>
				)}
			</div>
			<div className="playerStats">
				<p>score: {ctx.score}</p>
				<p>high score: {ctx.highScore} </p>
				<p>tries: {ctx.tryCount} </p>
			</div >
		</div >
	)
}
export default StatsArea;
