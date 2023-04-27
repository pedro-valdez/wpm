import WpmGame from "@/components/WpmGame"
import { readFileSync } from "fs"

type HomeProps = {
	quote: string
}

export async function getStaticProps() {
	const quotes = JSON.parse(readFileSync("lib/quotes.json").toString()).quotes
	const quote = quotes[Math.floor(Math.random() * quotes.length)]
	return {
		props: {
			quote
		},
	}
}

export default function Home({ quote }: HomeProps) {
  return (
		<div className="h-screen flex justify-center items-center">
			<div className="max-w-xl">
				<WpmGame quote={quote}/>
			</div>
		</div>
  )
}
