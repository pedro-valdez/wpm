import { RefObject, useEffect } from "react";
import { Game } from "../Game/reducer";

export function useOpenModal(game: Game, modal: RefObject<HTMLElement>) {
	useEffect(() => {
		if (game.isFinished) {
			modal.current?.classList.add("modal-open")
		}
	}, [game, modal])
}
