import { RefObject, useEffect } from "react";
import { Game } from "../Game/reducer";

export function useOpenModal(game: Game, modal: RefObject<HTMLElement>) {
	useEffect(() => {
		if (game.isFinished) {
			modal.current?.classList.add("modal-open")
		} else { modal.current?.classList.remove("modal-open") }
	}, [game, modal])
}

export function useCloseModal(modal: RefObject<HTMLElement>) {
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
}
