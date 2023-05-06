import { useRef } from "react"
import type { Game } from "../Game/reducer"
import { useCloseModal, useOpenModal } from "./hooks"

type ResultProps = {
	game: Game,
}

export default function Result({ game }: ResultProps) {
	const modal = useRef<HTMLElement>(null)

	useOpenModal(game, modal)
	useCloseModal(modal)

	return (
		<article className="modal" ref={modal}>
			<div className="modal-box">
				<h2 className="text-2xl">These are your results!</h2>
				<p>
					wpm: { game.wpm }
				</p>
				<div className="modal-action">
					<button onClick={() => modal.current?.classList.toggle("modal-open")}>
						Close
					</button>
				</div>
			</div>
		</article>
	)
}
