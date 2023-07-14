import type { Game } from "../Game/reducer"
import { HiArrowPath } from "react-icons/hi2"

type ResultProps = {
	game: Game,
	restart: any,
	author: string,
}

export default function Result({ game, restart, author }: ResultProps) {
	return (
		<div className="px-4 mb-4 flex justify-end items-center gap-x-4">
			<p className="grow text-gray-500">by <span className="font-bold">{ author }</span></p>
			<div className={game.isFinished ? "visible" : "invisible"}>
				<p className="text-gray-500 font-bold badge bg-base-200">
					WPM: { game.wpm }
				</p>
			</div>
			<button
				onClick={() => restart()}
				className="tooltip text-xl p-2 rounded-full text-gray-500 bg-base-200 hover:bg-base-300"
				data-tip="Esc"
			>
				<HiArrowPath />
			</button>
		</div>
	)
}
