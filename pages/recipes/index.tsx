import { GetStaticProps } from "next"
import RecipeCard from "components/recipe/card"
import { getRecipes, IRecipe } from "../../firebase/recipe-service"

type RecipesProps = {
  recipes: IRecipe[]
}

export default function Recipes({ recipes }: RecipesProps) {
  return (
    <div className="container mx-auto">
      <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
        {recipes.map(recipe =>
          <RecipeCard key={recipe.id} recipe={recipe} />
        )}
      </div>
    </div>
  )
}


export const getStaticProps: GetStaticProps = async () => {
  const recipes = await getRecipes(30)
  return {
    props: {
      recipes
    }
  }
}