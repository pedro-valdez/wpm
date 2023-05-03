import useSWR from "swr"
import Wpm from "./Wpm"

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

	if (isError) { return <>Error</> }
	if (isLoading) { return <>Loading</> }

	return <Wpm quote={quote.trimEnd()}/>
}
