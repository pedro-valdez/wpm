import { useEffect, useReducer, useRef, useState } from "react"
import gameReducer, { initialGame } from "./reducer"
import Quote from "../Quote"
import GameInput from "./Input"
import Result from "../Result"

type WpmProps = {
	quote: any,
}

export default function Game({ quote }: WpmProps) {
	const [input, setInput] = useState("")
	const [game, gameDispatch] = useReducer(gameReducer, { ...initialGame, quote: quote.text.trimEnd() })
	const inputElement = useRef<HTMLInputElement>(null)

	useEffect(() => {
		inputElement.current?.focus()
	}, [])

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

			<Result game={game} restart={quote.mutate} author={quote.author}/>
		</div>
	)
}
