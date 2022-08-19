import type { NextApiRequest, NextApiResponse } from "next"
import { getRecipes } from "data/recipe-service"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const recipes = await getRecipes(1000)
  res.status(200).json({ recipes })
}
