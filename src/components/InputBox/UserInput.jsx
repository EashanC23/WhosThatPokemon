import { forwardRef, useState } from "react";
import pokemonList from "../../pokemon";


const UserInput = forwardRef((props, ref) => {
	const [inputValue, setInputValue] = useState("");
	const [filteredOptions, setFilteredOptions] = useState([]);
	const [highlightedIndex, setHighlightedIndex] = useState(-1);

	return (
		<div style={{ position: "relative", width: "100px" }} >
			<input
				type="text"
				value={inputValue}
				ref={ref}
				placeholder="Pokémon"
				onChange={(e) => {
					setInputValue(e.target.value);

					setFilteredOptions(
						pokemonList.filter((option) =>
							option.toLowerCase().includes(e.target.value.toLowerCase())
						)
					);
					setHighlightedIndex(-1);
				}}
				onKeyDown={(e) => {
					if (e.key === "ArrowDown" && filteredOptions.length > 0) {
						e.preventDefault();
						setHighlightedIndex((highlightedIndex + 1) % filteredOptions.length);
					} else if (e.key === "ArrowUp" && filteredOptions.length > 0) {
						e.preventDefault();
						setHighlightedIndex(
							(highlightedIndex - 1 + filteredOptions.length) %
							filteredOptions.length
						);
					} else if (e.key === "Enter" && highlightedIndex !== -1) {
						setInputValue(filteredOptions[highlightedIndex]);
						setFilteredOptions([]);
						setHighlightedIndex(-1);
					}
				}}
				style={{
					width: "20vh",
					padding: "10px",
					fontSize: "16px",
					border: "1px solid #ccc",
					borderRadius: "4px",
					boxSizing: "border-box",
					outline: "none",
				}}
			/>
			<div style={{ display: "flex", flexDirection: "column", height: "10vh", overflowY: "scroll", overflow: "hidden" }}>
				{inputValue &&
					filteredOptions.map((option, index) => (
						<div
							key={index}
							onClick={() => {
								setInputValue(option);
								setFilteredOptions([]);
								setHighlightedIndex(-1);
							}}
							style={{
								backgroundColor:
									highlightedIndex === index ? "lightgray" : "transparent",
								height: "2vh",
							}}
						>
							{option}
						</div>
					))}
			</div>
		</div>
	);
})

export default UserInput;

