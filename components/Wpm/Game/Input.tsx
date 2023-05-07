import { ChangeEvent, Dispatch, SetStateAction, forwardRef, ForwardedRef } from "react"
import { GameAction, GAME_ACTIONS } from "./reducer"

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
			className="bg-black text-white focus:outline-none fixed -z-50 w-0 h-0 top-0 left-0"
			type="text"
			value={input}
			onChange={handleChange}
			ref={ref}
		/>
	)
})

export default GameInput
