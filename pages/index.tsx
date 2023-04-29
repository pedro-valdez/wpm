import WpmGame from "@/components/WpmGame"
import { readFileSync } from "fs"
import { Inter } from "next/font/google"

const inter = Inter({
	subsets: ['latin'],
})

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
		<main className={inter.className}>
			<div>
				<WpmGame quote={quote}/>
			</div>
		</main>
  )
}
