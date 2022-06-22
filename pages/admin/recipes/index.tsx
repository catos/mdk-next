import { GetStaticProps } from "next"
import { getRecipes, IRecipe } from "../../../firebase/recipe-service"
import { Link, Table, TD, TR } from "components/ui"
import slugify from "lib/slugify"

interface IProps {
  recipes: IRecipe[]
}

export default function Recipes({ recipes }: IProps) {
  return (
    <div>
      <Link href="/admin/recipes">Admin recipes list</Link>

      <Table>
        <thead>
          <TR>
            <th>Name</th>
            <th>Type</th>
            <th>Created</th>
          </TR>
        </thead>
        <tbody>
          {recipes.map(recipe =>
            <TR key={recipe.id}>
              <TD><Link href={`/admin/recipes/${slugify(recipe.name)}-${recipe.id}`}>{recipe.name}</Link></TD>
              <TD>{recipe.type}</TD>
              <TD>{recipe.created}</TD>
            </TR>
          )}
        </tbody>
      </Table>
      <pre>{JSON.stringify(recipes, null, 2)}</pre>
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
