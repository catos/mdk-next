import { getRecipes, IRecipe } from "../firebase/recipe-service"
import React, { RefObject } from "react"
import { useIntersection } from "hooks/use-intersection"

export function useInfiniteRecipes(initialRecipes: IRecipe[], ref: RefObject<HTMLElement>, take = 1) {
  const [recipes, setRecipes] = React.useState(initialRecipes)
  const [loading, setLoading] = React.useState(false)
  const [end, setEnd] = React.useState(false)

  const loadMoreRecipes = async () => {
    setLoading(true)
    const last = recipes[recipes.length - 1]

    const newRecipes = await getRecipes(take, last.id)
    setRecipes(recipes.concat(newRecipes))
    setLoading(false)

    if (newRecipes.length < take) {
      setEnd(true);
    }
  }

  const [isIntersecting] = useIntersection(ref, async () => {
    if (!loading && !end) {
      await loadMoreRecipes()
    }
  })

  return {
    recipes,
    loading,
    end,
    isIntersecting
  }
}