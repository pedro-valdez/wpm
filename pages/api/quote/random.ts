import type { NextApiRequest, NextApiResponse } from "next"
import { getQuote } from "@/lib/quotes"

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	const data = getQuote()
	return res.status(200).json({ data })
}
