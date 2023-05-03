import { useReducer, useRef, useState } from "react"
import gameReducer, { initialGame } from "./gameReducer"
import Quote from "./Quote"
import GameInput from "./GameInput"
import Result from "./Result"

type WpmProps = {
	quote: string,
}

export default function Wpm({ quote }: WpmProps) {
	const [input, setInput] = useState("")
	const [game, gameDispatch] = useReducer(gameReducer, { ...initialGame, quote })
	const inputElement = useRef<HTMLInputElement>(null)

	return (
		<div className="h-screen flex justify-center items-center">
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
		</div>
	)
}
