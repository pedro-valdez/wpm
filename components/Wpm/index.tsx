import useSWRImmutable from "swr/immutable"
import Game from "./Game"
import QuoteError from "./Quote/Error"
import QuoteLoading from "./Quote/Loading"
import { useEffect } from "react"

const getRandomQuote = async (url: string) => {
	const resp = await fetch(url)
	const data = await resp.json()

	return { ...data.data }
}

function useQuote() {
	const { data, error, isLoading, isValidating, mutate } = useSWRImmutable("/api/quote/random", getRandomQuote)

	return {
		quote: {
			...data,
			isError: error,
			isLoading,
			isValidating,
			mutate,
		},
	}
}

export default function WpmGame() {
	const { quote } = useQuote()

	useEffect(() => {
		const handleChangeQuote = (event: KeyboardEvent) => {
			if (event.key === "Escape") { quote.mutate() }
		}
		window.addEventListener("keydown", handleChangeQuote)
		return () => window.removeEventListener("keydown", handleChangeQuote)
	}, [])

	if (quote.isError) { return <QuoteError /> }
	if (quote.isLoading || quote.isValidating ) { return <QuoteLoading /> }

	return <Game quote={quote} />
}
