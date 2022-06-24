import { GetStaticProps } from "next"
import RecipeCard from "components/recipe/card"
import { getRecipes, IRecipe } from "../../firebase/recipe-service"
import { useRef } from "react"
import { useInfiniteRecipes } from "hooks/use-infinite-recipes"

type RecipesProps = {
  recipes: IRecipe[]
}

export default function Recipes(props: RecipesProps) {
  const ref = useRef<HTMLDivElement | null>(null)
  const { recipes, end } = useInfiniteRecipes(props.recipes, ref)

  return (
    <div className="container mx-auto">
      <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
        {recipes.map(recipe =>
          <RecipeCard key={recipe.id} recipe={recipe} />
        )}
      </div>
      {end && <div className="text-lg font-bold text-center py-4 text-slate-600">Finner ingen flere oppskrifter...</div>}
      <div ref={ref} />
    </div>
  )
}


export const getStaticProps: GetStaticProps = async () => {
  const recipes = await getRecipes(10)
  return {
    props: {
      recipes,
      revalidate: 600
    }
  }
}