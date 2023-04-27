import { useReducer, useRef, useState } from "react"
import gameReducer, { initialGame } from "./gameReducer"
import Quote from "./Quote"
import GameInput from "./GameInput"

type GameProps = {
	quote: string,
}

export default function WpmGame({ quote }: GameProps) {
	const [input, setInput] = useState("")
	const [game, gameDispatch] = useReducer(gameReducer, { ...initialGame, quote })
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
