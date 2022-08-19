import { GetStaticProps } from "next"
import RecipeCard from "components/recipe/card"
import { getRecipes, IRecipe } from "data/recipe-service"
import { useEffect, useRef, useState } from "react"
import { useInfiniteRecipes } from "hooks/use-infinite-recipes"
import {
  addFavorite,
  getFavorites,
  IFavorite,
  removeFavorite,
} from "data/favorite-service"
import useAuth from "contexts/auth"

type RecipesProps = {
  recipes: IRecipe[]
}

function useGetFavorites() {
  const [favorites, setFavorites] = useState<IFavorite[]>([])
  const { user } = useAuth()

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const data = await getFavorites(user.id)
        setFavorites(data)
      }
    }
    fetchData()
  }, [user])

  return favorites
}

export default function Recipes(props: RecipesProps) {
  const ref = useRef<HTMLDivElement | null>(null)
  const { recipes, end } = useInfiniteRecipes(props.recipes, ref)
  const favorites = useGetFavorites()

  return (
    <div className="container mx-auto">
      <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} favorites={favorites} />
        ))}
      </div>
      {end && (
        <div className="text-lg font-bold text-center py-4 text-slate-600">
          Finner ingen flere oppskrifter...
        </div>
      )}
      <div ref={ref} />
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const recipes = await getRecipes(10)
  return {
    props: {
      recipes,
      revalidate: 600,
    },
  }
}
