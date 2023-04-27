import { RefObject, ChangeEvent, Dispatch, SetStateAction } from "react"
import { GameAction, GAME_ACTIONS } from "./gameReducer"

type GameInputProps = {
	input: string,
	ref: RefObject<HTMLInputElement>,
	setInput: Dispatch<SetStateAction<string>>,
	gameDispatch: Dispatch<GameAction>,
}

export default function GameInput({ input, setInput, ref, gameDispatch }: GameInputProps) {
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
}
