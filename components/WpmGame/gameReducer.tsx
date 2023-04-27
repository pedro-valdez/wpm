type Seconds = number
type Milliseconds = number
type Wpm = number

export type Game = {
	quote: string,
	startTime: Milliseconds,
	timePassed: Seconds,
	wpm: Wpm,
	isFinished: boolean,
}

export const initialGame: Game = {
	quote: "This is the quote.",
	startTime: 0,
	timePassed: 0,
	wpm: 0,
	isFinished: false,
}

export const GAME_ACTIONS = {
	PLAY: "play",
} as const

export type GameAction = {
	type: string,
	payload?: { currentText: string },
}

function play(game: Game, currentText: string): Game {
	const { quote, startTime, isFinished } = game
	const currentTime: Milliseconds = new Date().getTime()

	const isStarted = startTime !== 0
	//if (!isStarted) { setStartTime(currentTime) }
	if (!isStarted) { return { ...game, startTime: currentTime } }

	const isPlaying = isStarted && !isFinished
	const delta: Seconds = (currentTime - startTime) / 1000
	const tokenizedQuote = quote.split(" ")
	const tokenizedInput = currentText.split(" ")
	const correctWordCount = tokenizedInput.reduce((acc, cur, ind) => {
		return cur === tokenizedQuote[ind] ? acc + 1 : acc
	}, 0)
	const currentWpm = Math.round((correctWordCount / delta) * 60)

	const quoteLastCharacter = tokenizedQuote.at(-1)?.at(-1)
	const inputLastCharacter = tokenizedInput.at(-1)?.at(-1)
	const isAtLastWord = tokenizedQuote.length === tokenizedInput.length
	const isLastCharacterEqual = quoteLastCharacter === inputLastCharacter
	const isLastCharacterPressed = isAtLastWord && isLastCharacterEqual
	//if (isLastCharacterPressed) {
	//	setIsFinished(true)
	//}
	if (isLastCharacterPressed) {
		return {
			...game,
			isFinished: true,
			timePassed: delta,
			wpm: currentWpm,
		}
	}

	//if (isPlaying) {
	//	setTimePassed(delta)
	//	setWpm(currentWpm)
	//}
	if (isPlaying) {
		return {
			...game,
			timePassed: delta,
			wpm: currentWpm,
		}
	}


	return game
}

export default function gameReducer(game: Game, action: GameAction) {
	switch(action.type) {
		case GAME_ACTIONS.PLAY: {
			if (action.payload?.currentText) {
				return play(game, action.payload.currentText)
			}

			return game
		}
		default: return game
	}
}
