import Image from "next/image";
import Link from "next/link";
import { IRecipe } from "../../firebase/recipe-service";

// TODO: move images to firebase
export default function RecipeCard({ recipe }: { recipe: IRecipe }) {
  return (
    <Link href={`/oppskrifter/${recipe.id}`}>
      <a className="relative rounded-lg overflow-hidden shadow-md hover:shadow-lg">
        {recipe.image.indexOf("ca7o") > 0
          ? <Image
              className="w-full h-64 object-cover"
              src={recipe.image}
              alt={recipe.name}
              width={500}
              height={500}
            />
          : <img src={recipe.image} alt={recipe.name} className="w-full h-64 object-cover" />
        }
        <div className="absolute top-0 right-0 bottom-0 left-0 bg-gradient-to-t from-black to-transparent"></div>
        <div className="absolute right-2 bottom-2 left-2 z-10 text-white uppercase text-center text-base">
          {recipe.name}
        </div>
      </a>
    </Link>
  )
}