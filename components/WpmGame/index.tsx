import useSWR from "swr"
import Wpm from "./Wpm"

const fetcher = (...args) => fetch(...args).then(res => res.json())

function useQuote() {
	const { data, error } = useSWR("/api/quote/random", fetcher)

	return {
		quote: data,
		isError: error,
		isLoading: !data && !error,
	}
}

export default function WpmGame() {
	const { quote, isError, isLoading } = useQuote()

	if (isError) { return <>Error</> }
	if (isLoading) { return <>Loading</> }

	return <Wpm quote={quote.data.quote.trimRight()}/>
}
