import useSWRImmutable from "swr/immutable"
import Game from "./Game"
import QuoteError from "./Quote/Error"
import QuoteLoading from "./Quote/Loading"

const getRandomQuote = async (url: string) => {
	const resp = await fetch(url)
	const data = await resp.json()

	return { ...data.data }
}

function useQuote() {
	const { data, error, isLoading, isValidating, mutate } = useSWRImmutable("/api/quote/random", getRandomQuote)

	console.log(data)

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

	if (quote.isError) { return <QuoteError /> }
	if (quote.isLoading) { return <QuoteLoading /> }

	return <Game quote={quote.text.trimEnd()} />
}
