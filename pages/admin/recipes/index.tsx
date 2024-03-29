import { GetServerSideProps } from "next"
import { getRecipes, IRecipe, RecipeType } from "../../../data/recipe-service"
import { Link, Table, TD, TR } from "components/ui"
import slugify from "lib/slugify"
import React from "react"
import { useInfiniteRecipes } from "hooks/use-infinite-recipes"
import { format } from "date-fns"

interface IProps {
  recipes: IRecipe[]
}

export default function Recipes(props: IProps) {
  const ref = React.useRef<HTMLDivElement | null>(null)
  const { recipes, loading, end, isIntersecting } = useInfiniteRecipes(
    props.recipes,
    ref
  )

  return (
    <div>
      {/* <div className="fixed top-16 right-2 p-4 bg-white">
        <div>Count: {recipes.length}</div>
        <div>Loading: {loading.toString()}</div>
        <div>End: {end.toString()}</div>
      </div> */}

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
          {recipes.map((recipe) => (
            <TR key={recipe.id}>
              <TD>
                <Link
                  href={`/admin/recipes/${slugify(recipe.name)}-${recipe.id}`}
                >
                  {recipe.name}
                </Link>
              </TD>
              <TD>{recipe.type === RecipeType.DINNER ? "Middag" : "..."}</TD>
              <TD>{format(recipe.created, "yyyy-MM-dd")}</TD>
              <TD>{recipe.published.toString()}</TD>
            </TR>
          ))}
        </tbody>
      </Table>

      <div className="bg-red-300 flex h-64 justify-center" ref={ref}>
        Load more div... {isIntersecting && "Im in viewport!"}
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

  return <div>Loading...</div>
}

// TODO: move to lib ? generalize ?
// function getQueryPageNumber(query: string | string[] | undefined) {
//   const pageStr = query as string
//   let queryAsInt = pageStr ? parseInt(pageStr, 10) : 0

//   if (Number.isNaN(queryAsInt)) {
//     queryAsInt = 0
//   }

//   return queryAsInt
// }

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const recipes = await getRecipes(30)
  return {
    props: {
      recipes,
    },
  }
}
