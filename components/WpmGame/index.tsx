import { ChangeEvent, useReducer, useRef, useState } from "react"
import gameReducer, { GAME_ACTIONS, initialGame } from "./gameReducer"
import Quote from "./Quote"


export default function WpmGame() {
	const [input, setInput] = useState("")
	const [game, gameDispatch] = useReducer(gameReducer, initialGame)
	const inputElement = useRef<HTMLInputElement>(null)

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const currentText = e.currentTarget.value
		setInput(currentText)

		gameDispatch({ type: GAME_ACTIONS.PLAY, payload: { currentText } })
	}

	return (
		<div>
			<Quote quote={game.quote} input={input}/>

			<input
				className="bg-black text-white focus:outline-none absolute -z-50 w-0 h-0"
				type="text"
				value={input}
				onChange={handleChange}
				ref={inputElement}
			/>

			<p>Time passed: { game.timePassed }</p>
			<p>WPM is: { game.wpm }</p>
		</div>
	)
}
