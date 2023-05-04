import { useReducer, useRef, useState } from "react"
import gameReducer, { initialGame } from "./reducer"
import Quote from "../Quote"
import GameInput from "./Input"
import Result from "../Result"

type WpmProps = {
	quote: string,
}

export default function Game({ quote }: WpmProps) {
	const [input, setInput] = useState("")
	const [game, gameDispatch] = useReducer(gameReducer, { ...initialGame, quote })
	const inputElement = useRef<HTMLInputElement>(null)

	return (
		<div className="max-w-md p-4">
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

			<Result game={game}/>
		</div>
	)
}