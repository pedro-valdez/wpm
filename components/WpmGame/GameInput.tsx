import { ChangeEvent, Dispatch, SetStateAction, forwardRef, ForwardedRef } from "react"
import { GameAction, GAME_ACTIONS } from "./gameReducer"

type GameInputProps = {
	input: string,
	setInput: Dispatch<SetStateAction<string>>,
	gameDispatch: Dispatch<GameAction>,
}

const GameInput = forwardRef(function( { input, setInput, gameDispatch }: GameInputProps, ref: ForwardedRef<HTMLInputElement>) {
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const currentText = e.currentTarget.value
		setInput(currentText)

		gameDispatch({ type: GAME_ACTIONS.PLAY, payload: { currentText } })
	}

	return (
		<input
			className="bg-black text-white focus:outline-none absolute -z-50 w-0 h-0"
			type="text"
			value={input}
			onChange={handleChange}
			ref={ref}
		/>
	)
})

export default GameInput
