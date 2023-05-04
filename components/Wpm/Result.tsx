import { useEffect, useRef } from "react"
import type { Game } from "./Game/reducer"

type ResultProps = {
	game: Game,
}

export default function Result({ game }: ResultProps) {
	const modal = useRef<HTMLElement>(null)

	useEffect(() => {
		if (game.isFinished) {
			modal.current?.classList.add("modal-open")
		} else { modal.current?.classList.remove("modal-open") }
	}, [game, modal])

	useEffect(() => {
		if (modal.current) {
			modal.current.setAttribute("tabindex", "0")

			const closeModal = (e: KeyboardEvent) => {
				if (e.key === "Escape") {
					modal.current?.classList.remove("modal-open")
				}
			}

			modal.current.addEventListener("keydown", closeModal)

			return () => modal.current?.removeEventListener("keydown", closeModal)
		}
	}, [modal])

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
