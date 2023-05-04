import useSWR from "swr"
import Game from "./Game"
import QuoteError from "./Quote/Error"
import QuoteLoading from "./Quote/Loading"

const getRandomQuote = async (url: string) => {
	const resp = await fetch(url)
	const data = await resp.json()

	return { ...data.data }
}

function useQuote() {
	const { data, error } = useSWR("/api/quote/random", getRandomQuote)

	return {
		...data,
		isError: error,
		isLoading: !data && !error,
	}
}

export default function WpmGame() {
	const { quote, isError, isLoading } = useQuote()

	if (isError) { return <QuoteError /> }
	if (isLoading) { return <QuoteLoading /> }

	return <Game quote={quote.trimEnd()} />
}
