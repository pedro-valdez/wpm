type CurrentWordProps = {
	quoteWord: string,
	inputWord: string,
}

type LetterEvaluation = {
	correctness: boolean | null,
	letter: string,
}

export function correctnessColor(correctness: boolean | null): string {
	const correct = "text-green-500"
	const incorrect = "text-red-500"
	const undecided = ""
	switch(correctness) {
		case true: return correct
		case null: return undecided
		case false: return incorrect
	}
}

function evaluateLetters({ quoteWord, inputWord }: CurrentWordProps): LetterEvaluation[] {
	const letterEvaluation = []
	const isInputBig = inputWord.length > quoteWord.length
	const isInputSmall = inputWord.length < quoteWord.length
	const iterations = isInputBig ? quoteWord.length : inputWord.length

	for (let i = 0; i < iterations; i ++) {
		letterEvaluation.push({
			correctness: quoteWord[i] === inputWord[i], 
			letter: quoteWord[i]
		})
	}

	if (isInputSmall) {
		for (let i = inputWord.length; i < quoteWord.length; i++) {
			letterEvaluation.push({
				correctness: null, 
				letter: quoteWord[i]
			})
		}
	}

	if (isInputBig) {
		for (let i = quoteWord.length; i < inputWord.length; i++) {
			letterEvaluation.push({
				correctness: false, 
				letter: inputWord[i]
			})
		}
	}

	return letterEvaluation
}

export default function CurrentWord({ quoteWord, inputWord }: CurrentWordProps) {
	if (inputWord.length === 0) {
		return <span>{ quoteWord + " " }</span>
	}

	const letterEvaluations = evaluateLetters({ quoteWord, inputWord })

	return (
		<span>
			{
				letterEvaluations.map( letterEvaluation => (
					<span className={correctnessColor(letterEvaluation.correctness)}>
						{ letterEvaluation.letter }
					</span>
				))
			}
			{" "}
		</span>
	)
}
