import React, { useContext } from "react";
import AppContext from "../../store/app-context";
import StatsBox from "../StatsBox/StatsBox";

function StatsArea() {
	const ctx = useContext(AppContext);
	return (
		<div>
			<div>
				<p>
					Height: {!ctx.isLoading ? ctx.guessedPokemon.height : "loading"}
					<br />
					Weight : {!ctx.isLoading ? ctx.guessedPokemon.weight : "loading"}
					<br />
					Id : {!ctx.isLoading ? ctx.guessedPokemon.id : "loading"}
					<br />
					{/* Type : {ctx.guessedPokemon.types} */}
				</p>
				{ctx.isLoading ? (
					"loading"
				) : (
					<>
						<StatsBox
							guessedStat={ctx.guessedPokemon.height}
							referenceStat={ctx.toGuessPokemon.height}
						>
							Height: {ctx.toGuessPokemon.height}
						</StatsBox>
						<StatsBox
							guessedStat={ctx.guessedPokemon.weight}
							referenceStat={ctx.toGuessPokemon.weight}
						>
							Weight: {ctx.toGuessPokemon.weight}
						</StatsBox>
						<StatsBox
							guessedStat={ctx.guessedPokemon.id}
							referenceStat={ctx.toGuessPokemon.id}
						>
							ID: {ctx.toGuessPokemon.id}
						</StatsBox>
					</>
				)}
			</div>
			<p>score: {ctx.score}</p>
			<p>high score: {ctx.highScore} </p>
			<p>tries: {ctx.tryCount} </p>
		</div >
	)
}
export default StatsArea;
