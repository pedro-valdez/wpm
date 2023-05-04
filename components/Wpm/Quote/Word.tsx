import type { WordEvaluation, WordCorrectness } from "./";

type WordProps = {
	wordEvaluation: WordEvaluation
}

function correctnessColor(correctness: WordCorrectness): string {
	const correct = "text-green-500"
	const incorrect = "text-red-500"
	const undecided = "text-gray-500"
	switch(correctness) {
		case true: return correct
		case null: return undecided
		case false: return incorrect
	}
}

export default function Word({ wordEvaluation } : WordProps) {
	return (
		<span
			className={correctnessColor(wordEvaluation.correctness)}
		>
			{ wordEvaluation.word + " " }
		</span>
	)
}
