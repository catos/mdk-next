import { getRecipes, IRecipe, saveRecipe } from "../../../firebase/recipe-service"
import { GetServerSideProps } from "next"

interface IProps {
  recipes: IRecipe[]
}

export default function Recipes({ recipes }: IProps) {
  
  const handleClick = async () => {
    const updatedRecipes = recipes.map(recipe => ({ ...recipe, created: Date.now() }))
    updatedRecipes.map(recipe => {
      saveRecipe(recipe)
    })
  }  

  return (
    <div>
      <button onClick={handleClick}>Update</button>
      <pre>
        {JSON.stringify(recipes, null, 2)}
      </pre>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const recipes = await getRecipes(100)
  return {
    props: {
      recipes,
    }
  }
}
