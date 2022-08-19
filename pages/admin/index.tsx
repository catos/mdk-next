import { IRecipe } from "../../data/recipe-service"
import { Link } from "components/ui"
import React from "react"
import { useInfiniteRecipes } from "hooks/use-infinite-recipes"

interface IProps {
  recipes: IRecipe[]
}

const TAKE = 1

export default function Recipes(props: IProps) {
  const ref = React.useRef<HTMLDivElement | null>(null)
  const { recipes, loading, end, isIntersecting } = useInfiniteRecipes(
    props.recipes,
    ref
  )

  return (
    <div>
      <h1>Admin dashboard</h1>

      <div className="flex flex-col gap-2">
        <Link href="/admin/recipes">Recipes</Link>
        <Link href="/admin/recipes/bulk-edit">Bulk edit</Link>
      </div>
    </div>
  )
}
