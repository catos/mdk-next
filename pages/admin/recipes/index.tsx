import { GetServerSideProps } from "next"
import { getRecipes, IRecipe } from "../../../firebase/recipe-service"
import { Button, Link, Table, TD, TR } from "components/ui"
import slugify from "lib/slugify"
import React from "react"
import { fromMillis } from "../../../firebase/firebase"

interface IProps {
  recipes: IRecipe[]
}

const TAKE = 10

export default function Recipes(props: IProps) {
  const [recipes, setRecipes] = React.useState(props.recipes)
  const [loading, setLoading] = React.useState(false)
  const [end, setEnd] = React.useState(false)

  const loadMoreRecipes = async () => {
    setLoading(true)
    const last = recipes[recipes.length - 1]
    const cursor = typeof last.created === "number" ? fromMillis(last.created) : last.created
    console.log(last, last.created, fromMillis(last.created), typeof last.created);
    

    const newRecipes = await getRecipes(TAKE, cursor)
    setRecipes(recipes.concat(newRecipes))
    setLoading(false)

    if (newRecipes.length < TAKE) {
      setEnd(true);
    }
  }

  return (
    <div>
      <Link href="/admin/recipes">Admin recipes list</Link>

      <Table>
        <thead>
          <TR>
            <th>Name</th>
            <th>Type</th>
            <th>Created</th>
            <th>Created Millis</th>
          </TR>
        </thead>
        <tbody>
          {recipes.map(recipe =>
            <TR key={recipe.id}>
              <TD><Link href={`/admin/recipes/${slugify(recipe.name)}-${recipe.id}`}>{recipe.name}</Link></TD>
              <TD>{recipe.type}</TD>
              <TD>{recipe.created}</TD>
              <TD>{new Date(recipe.created).toString()}</TD>
            </TR>
          )}
        </tbody>
      </Table>

      {/* TODO: useScrollSpy to replace button */}
      {(!loading && !end && <Button onClick={loadMoreRecipes}>Load more</Button>)}

      <Loader show={loading} />

      {end && "You have reached the end!"}
    </div>
  )
}

// TODO: move to shared component ?
interface ILoaderProps {
  show: boolean
}

function Loader({ show }: ILoaderProps) {
  if (!show) {
    return null
  }

  return (
    <div>Loading...</div>
  )
}

// TODO: move to lib ? generalize ?
function getQueryPageNumber(query: string | string[] | undefined) {
  const pageStr = query as string
  let queryAsInt = pageStr ? parseInt(pageStr, 10) : 0

  if (Number.isNaN(queryAsInt)) {
    queryAsInt = 0
  }

  return queryAsInt

}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const page = getQueryPageNumber(query.page)
  const skip = page * TAKE

  console.log("Skip: ", skip, ", TAKE: ", TAKE, ", page: ", page);

  const recipes = await getRecipes(TAKE)
  return {
    props: {
      recipes,
      revalidate: 600
    }
  }
}
