import { useReducer, useRef, useState } from "react"
import gameReducer, { initialGame } from "./gameReducer"
import Quote from "./Quote"
import GameInput from "./GameInput"


export default function WpmGame() {
	const [input, setInput] = useState("")
	const [game, gameDispatch] = useReducer(gameReducer, initialGame)
	const inputElement = useRef<HTMLInputElement>(null)

	return (
		<div>
			<div
				onClick={
					() => inputElement.current?.focus()
				}
			>
				<Quote
					quote={game.quote}
					input={input}
				/>
			</div>

			<GameInput
				input={input}
				setInput={setInput}
				ref={inputElement}
				gameDispatch={gameDispatch}
			/>

			<p>Time passed: { game.timePassed }</p>
			<p>WPM is: { game.wpm }</p>
		</div>
	)
}
