import path from "path"
import { readFileSync, readdirSync } from "fs"
import type { NextApiRequest, NextApiResponse } from "next"

function chooseRandom(arr: string[]) {
	return arr[Math.floor(Math.random() * arr.length)]
}

function chooseAuthor() {
	const quotesPath = path.join(process.cwd(), "lib/quotes/")
	const authors = readdirSync(quotesPath)
	const author = chooseRandom(authors)
	const authorPath = path.join(quotesPath, author, "/")

	return [author, authorPath]
}

function readQuote(dirPath: string, work: string) {
	const quotePath = path.join(dirPath, work)
	const quote = readFileSync(quotePath, "utf8")

	return quote
}

function chooseQuoteInBook(authorPath: string, book: string) {
	const bookPath = path.join(authorPath, book, "/")
	const quotesInBook = readdirSync(bookPath)
	const quote = readQuote(bookPath, chooseRandom(quotesInBook))

	return { quote, book }
}

function chooseQuote(authorPath: string) {
	const works = readdirSync(authorPath)
	const work = chooseRandom(works)

	const isBook = !(work.substring(work.length - 4) === ".txt")
	if (isBook) { return chooseQuoteInBook(authorPath, work) }

	const quote = readQuote(authorPath, work)

	return { quote, book: "" }
}

function getQuote() {
	const [author, authorPath] = chooseAuthor()
	const quote = chooseQuote(authorPath)

	return { ...quote, author }
}


export default function handler(req: NextApiRequest, res: NextApiResponse) {
	const data = getQuote()
	return res.status(200).json({ data })
}
