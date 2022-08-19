import { getRecipes, IRecipe, saveRecipe } from "../../../data/recipe-service"
import { GetServerSideProps } from "next"
import { Button } from "components/ui"

interface IProps {
  recipes: IRecipe[]
}

export default function Recipes({ recipes }: IProps) {
  const handleClick = async () => {
    const updatedRecipes = recipes.map((recipe) => {
      return { ...recipe, created: Date.now(), published: true }
    })

    updatedRecipes.map((recipe) => {
      saveRecipe(recipe)
    })
  }

  return (
    <div className="flex flex-col gap-4">
      <Button color="primary" onClick={handleClick}>Update</Button>
      <pre>{JSON.stringify(recipes, null, 2)}</pre>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const recipes = await getRecipes(100)
  return {
    props: {
      recipes,
    },
  }
}
