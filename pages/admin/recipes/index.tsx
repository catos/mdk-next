import { GetServerSideProps } from "next"
import { getRecipes, IRecipe } from "../../../firebase/recipe-service"
import { Link, Table, TD, TR } from "components/ui"
import slugify from "lib/slugify"
import React from "react"
import { fromMillis } from "../../../firebase/firebase"
import { format } from "date-fns"
import { useInfiniteScroll } from "hooks/use-intersection"

interface IProps {
  recipes: IRecipe[]
}

const TAKE = 1

export default function Recipes(props: IProps) {
  const [recipes, setRecipes] = React.useState(props.recipes)
  const [loading, setLoading] = React.useState(false)
  const [end, setEnd] = React.useState(false)

  const loadMoreRecipes = async () => {
    console.log("useEffect->loadMore", loading);
    setLoading(true)
    const last = recipes[recipes.length - 1]
    const cursor = typeof last.created === "number" ? fromMillis(last.created) : last.created

    const newRecipes = await getRecipes(TAKE, cursor)
    setRecipes(recipes.concat(newRecipes))
    setLoading(false)

    if (newRecipes.length < TAKE) {
      setEnd(true);
    }
  }

  const ref = React.useRef<HTMLDivElement | null>(null);
  const [isIntersecting] = useInfiniteScroll(ref, async () => {
    if (!loading && !end) {
      await loadMoreRecipes()
    }
  })

  return (
    <div>
      <Link href="/admin/recipes">Admin recipes list</Link>
      <div className="fixed top-16 right-2 p-4 bg-white">
        <div>Count: {recipes.length}</div>
        <div>Loading: {loading.toString()}</div>
        <div>End: {end.toString()}</div>
      </div>
      <Table>
        <thead>
          <TR>
            <th>Name</th>
            <th>Type</th>
            <th>Created</th>
            <th>Published</th>
          </TR>
        </thead>
        <tbody>
          {recipes.map(recipe =>
            <TR key={recipe.id}>
              <TD><Link href={`/admin/recipes/${slugify(recipe.name)}-${recipe.id}`}>{recipe.name}</Link></TD>
              <TD>{recipe.type}</TD>
              <TD>{format(recipe.created, "yyyy-MM-dd")}</TD>
              <TD>{recipe.published}</TD>
            </TR>
          )}
        </tbody>
      </Table>

      <div className="bg-red-300 flex h-64 justify-center" ref={ref}>
        Load more div... {isIntersecting && 'Im in viewport!'}
      </div>

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
  const TAKE = 5
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
