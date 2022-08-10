/* eslint-disable @next/next/no-img-element */
import Image from "next/image"
import { IRecipe } from "data/recipe-service"
import Link from "components/ui/link"
import slugify from "lib/slugify"
import { Button } from "components/ui"
import { MdFavorite, MdFavoriteBorder } from "react-icons/md"
import useAuth from "contexts/auth"
import { addFavorite } from "data/favorite-service"
import React from "react"

interface IRecipeCard extends IRecipe {
  isFavorite: boolean
}
// TODO: move images to firebase
export default function RecipeCard({ recipe }: { recipe: IRecipeCard }) {
  const { user, isAuthenticated } = useAuth()

  // TODO: create useRecipe-hook, for use here and in index...
  const handleAddFavorite = async (event: any, recipeId: string) => {
    event.preventDefault()

    if (!isAuthenticated) {
      return
    }

    console.log("add")
    await addFavorite(recipeId, user.id)
  }

  return (
    <div className="relative">
      <Link
        href={`/oppskrifter/${slugify(recipe.name)}-${recipe.id}`}
        className="relative rounded-lg overflow-hidden shadow-md hover:shadow-lg"
      >
        {recipe.image.indexOf("firebasestorage.googleapis.com") > 0 ? (
          <Image
            className="w-full h-64 object-cover"
            src={recipe.image}
            alt={recipe.name}
            width={256}
            height={256}
          />
        ) : (
          <img
            src={recipe.image}
            alt={recipe.name}
            className="w-full h-64 object-cover"
          />
        )}
        <div className="absolute top-0 right-0 bottom-0 left-0 bg-gradient-to-t from-black to-transparent"></div>
        <div className="absolute right-2 bottom-2 left-2 z-10 text-white uppercase text-center text-base">
          {recipe.name}
        </div>
      </Link>
      {recipe.isFavorite ? (
        <Button
          size="large"
          icon={<MdFavorite size="100%" />}
          href={`/admin/recipes/${slugify(recipe.name)}-${recipe.id}`}
          className="absolute top-4 right-4 z-10"
        />
      ) : (
        <Button
          size="large"
          icon={<MdFavoriteBorder size="100%" />}
          onClick={(e) => handleAddFavorite(e, recipe.id)}
          className="absolute top-4 right-4 z-10"
        />
      )}
    </div>
  )
}
