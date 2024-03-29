import CurrentWord from "./CurrentWord"
import Word from "./Word"

export type WordCorrectness = boolean | null
export type WordEvaluation = {
	word: string,
	correctness: WordCorrectness,
}

type QuoteProps = {
	quote: string,
	input: string,
}

function evaluateQuote(quote: string[], input: string[]): WordEvaluation[] {
	return quote.map((word, i) => {
		const isOutsideInput = i > input.length - 1
		const correctness = isOutsideInput ? null : word === input[i]
		return { word, correctness }
	})
}

export default function Quote({ quote, input }: QuoteProps) {
	const tokenizedQuote = quote.split(" ")
	const tokenizedInput = input.split(" ")

	const evaluatedQuote = evaluateQuote(tokenizedQuote, tokenizedInput.slice(0, tokenizedInput.length - 1))
	const words = evaluatedQuote.map((evaluation, i) => (
		<Word
			key={i}
			wordEvaluation={evaluation}
		/>
	))
	words[tokenizedInput.length - 1] = (
		<CurrentWord
			quoteWord={tokenizedQuote.at(tokenizedInput.length - 1) || ""}
			inputWord={tokenizedInput.at(-1) || ""}
		/>
	)

	return (
		<p className="w-full sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl p-4 font-black text-2xl sm:text-3xl lg:text-4xl xl:text-5xl xl:leading-[3.25rem] 2xl:text-6xl 2xl:leading-[4rem]">
			{ words }
		</p>
	)
}
