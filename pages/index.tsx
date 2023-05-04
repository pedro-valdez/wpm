import Wpm from "@/components/Wpm"
import { Inter } from "next/font/google"

const inter = Inter({
	subsets: ['latin'],
})

export default function Home() {
  return (
		<main className={inter.className}>
			<div className="h-screen flex justify-center items-center">
				<Wpm />
			</div>
		</main>
  )
}
