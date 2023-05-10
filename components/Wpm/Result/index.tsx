import { useRef } from "react"
import type { Game } from "../Game/reducer"

type ResultProps = {
	game: Game,
}

export default function Result({ game }: ResultProps) {
	if (!game.isFinished) { return null }

	return (
		<article className="p-4">
			<div>
				<h2 className="text-2xl font-bold text-primary">Results</h2>
				<p className="font-bold">
					WPM: { game.wpm }
				</p>
			</div>
		</article>
	)
}
