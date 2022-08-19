/* eslint-disable @next/next/no-img-element */
import Image from "next/image"
import { IRecipe } from "data/recipe-service"
import Link from "components/ui/link"
import slugify from "lib/slugify"
import { Button } from "components/ui"
import { MdFavorite, MdFavoriteBorder } from "react-icons/md"
import useAuth from "contexts/auth"
import { addFavorite, IFavorite, removeFavorite } from "data/favorite-service"
import React, { useEffect, useState } from "react"

interface IRecipeCard {
  recipe: IRecipe
  favorites: IFavorite[]
}

// TODO: move images to firebase
export default function RecipeCard({ recipe, favorites }: IRecipeCard) {
  const { user } = useAuth()
  const [favorite, setFavorite] = useState(false)

  useEffect(() => {
    if (favorites) {
      const isFavorite = Boolean(favorites.find(p => p.recipeId === recipe.id))
      setFavorite(isFavorite)
    }
  }, [favorites, recipe.id])

  const handleToggleFavorite = async (event: any, recipe: IRecipe) => {
    event.preventDefault()

    if (!user) {
      return
    }

    favorite
      ? await removeFavorite(recipe.id, user.id)
      : await addFavorite(recipe.id, user.id)

    setFavorite(!favorite)
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
      <Button
        size="large"
        icon={
          favorite ? (
            <MdFavorite size="100%" />
          ) : (
            <MdFavoriteBorder size="100%" />
          )
        }
        onClick={(e) => handleToggleFavorite(e, recipe)}
        className="absolute top-4 right-4 z-10"
      />
    </div>
  )
}
