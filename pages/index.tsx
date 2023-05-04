import WpmGame from "@/components/WpmGame"
import { Inter } from "next/font/google"

const inter = Inter({
	subsets: ['latin'],
})

export default function Home() {
  return (
		<main className={inter.className}>
			<div className="h-screen flex justify-center items-center">
				<WpmGame />
			</div>
		</main>
  )
}
