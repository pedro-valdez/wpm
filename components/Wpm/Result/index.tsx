import type { Game } from "../Game/reducer"

type ResultProps = {
	game: Game,
	restart: any,
}

export default function Result({ game, restart }: ResultProps) {
	return (
		<article className="p-4 flex justify-between items-center">
			<div>
				<div className={game.isFinished ? "visible" : "invisible"}>
					<h2 className="text-2xl font-bold text-primary">Results</h2>
					<p className="font-bold">
						WPM: { game.wpm }
					</p>
				</div>
			</div>

			<button
				onClick={() => restart()}
				className="btn tooltip normal-case"
				data-tip="Esc"
			>
				Try again
			</button>
		</article>
	)
}
