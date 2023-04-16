import { ChangeEvent, useState } from "react"

type Seconds = number
type Milliseconds = number
type Wpm = number

export default function WpmGame() {
	const [quote, setQuote] = useState("This is the quote.")
	const [input, setInput] = useState("")
	const [startTime, setStartTime] = useState<Milliseconds>(0)
	const [timePassed, setTimePassed] = useState<Seconds>(0)
	const [wpm, setWpm] = useState<Wpm>(0)
	const [isFinished, setIsFinished] = useState(false)

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const currentTime: Milliseconds = new Date().getTime()
		const currentText = e.currentTarget.value

		setInput(currentText)

		const isStarted = startTime !== 0
		if (!isStarted) { setStartTime(currentTime) }

		const isPlaying = isStarted && !isFinished
		const delta: Seconds = (currentTime - startTime) / 1000
		const tokenizedQuote = quote.split(" ")
		const tokenizedInput = currentText.split(" ")
		const correctWordCount = tokenizedInput.reduce((acc, cur, ind) => {
			return cur === tokenizedQuote[ind] ? acc + 1 : acc
		}, 0)
		const currentWpm = Math.round((correctWordCount / delta) * 60)
		if (isPlaying) {
			setTimePassed(delta)
			setWpm(currentWpm)
		}

		const quoteLastCharacter = tokenizedQuote.at(-1)?.at(-1)
		const inputLastCharacter = tokenizedInput.at(-1)?.at(-1)
		const isAtLastWord = tokenizedQuote.length === tokenizedInput.length
		const isLastCharacterEqual = quoteLastCharacter === inputLastCharacter
		const isLastCharacterPressed = isAtLastWord && isLastCharacterEqual
		if (isLastCharacterPressed) {
			setIsFinished(true)
		}
	}

	return (
		<div>
			<p>{ quote }</p>

			<input
				className="bg-black text-white focus:outline-none"
				type="text"
				value={input}
				onChange={handleChange}
			/>

			<p>Time passed: { timePassed }</p>
			<p>WPM is: { wpm }</p>
		</div>
	)
}
