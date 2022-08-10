import { GetStaticProps } from "next"
import { useRouter } from "next/router"
import ReactMarkdown from "react-markdown"
import { getRecipe, IRecipe } from "../../data/recipe-service"
import renderers from "lib/renderers"
import { Button } from "components/ui"
import { getSlugId } from "lib/get-slug-id"
import slugify from "lib/slugify"
import { FiEdit2 } from "react-icons/fi"
import useAuth from "contexts/auth"

type RecipesProps = {
  recipe: IRecipe | null
}

export default function Recipes(props: RecipesProps) {
  const router = useRouter()
  const { user } = useAuth()

  const recipe = props.recipe

  if (router.isFallback) {
    return <div>Loading...</div>
  }

  if (!recipe) {
    return null
  }

  return (
    <div className="flex flex-col gap-4 bg-white">
      <section className="flex flex-col">
        <div className="relative">
          {user.isAdmin && (
            <Button
              color="primary"
              icon={<FiEdit2 size="100%" />}
              href={`/admin/recipes/${slugify(recipe.name)}-${recipe.id}`}
              className="absolute top-4 right-4 z-10"
            />
          )}

          {/* <RecipeMetrics recipe={recipe} /> */}
          {recipe.image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              className="object-cover w-full h-[33vh]"
              src={recipe.image}
              alt={recipe.name}
            />
          )}
          <div className="text-white absolute bottom-0 text-center w-full bg-black bg-opacity-50 py-4">
            <h1 className="text-white font-serif">{recipe.name}</h1>
          </div>
        </div>

        <div className="container mx-auto flex flex-wrap justify-center gap-4 bg-white">
          <button
            aria-label="legg til som favoritt"
            className="button flex flex-row items-center"
          >
            {/* <BookmarkIcon className="w-5 h-5" /> */}
            <div className="pl-2 hidden lg:block">Lagre som favoritt</div>
          </button>

          <button
            aria-label="legg til meny"
            className="button flex flex-row items-center"
          >
            {/* <BookOpenIcon className="w-5 h-5" /> */}
            <div className="pl-2 hidden lg:block">Legg til meny</div>
          </button>

          <button
            aria-label="print"
            className="button flex flex-row items-center"
          >
            {/* <PrinterIcon className="w-5 h-5" /> */}
            <div className="pl-2 hidden lg:block">Print</div>
          </button>

          <button
            aria-label="last ned"
            className="button flex flex-row items-center"
          >
            {/* <SaveIcon className="w-5 h-5" /> */}
            <div className="pl-2 hidden lg:block">Lagre</div>
          </button>

          {recipe.source ? (
            <a
              href={recipe.source}
              className="button flex flex-row items-center"
            >
              {/* <ExternalLinkIcon className="w-5 h-5" /> */}
              <div className="pl-2 hidden lg:block">Kilde</div>
            </a>
          ) : null}
        </div>
      </section>

      {recipe.description ? (
        <blockquote className="hidden md:block container mx-auto text-center italic text-lg text-slate-500">
          <ReactMarkdown components={renderers}>
            {recipe.description}
          </ReactMarkdown>
        </blockquote>
      ) : null}

      <section className="container mx-auto sm:px-0 bg-white flex flex-col sm:flex-row gap-4">
        <div className="sm:w-1/2 xl:w-5/12">
          <h2 className="text-primary-600 uppercase text-lg">Ingredienser</h2>
          <ReactMarkdown components={renderers}>
            {recipe.ingredients}
          </ReactMarkdown>
        </div>

        <div className="sm:w-1/2 xl:w-7/12">
          <h2 className="text-primary-600 uppercase text-lg">Fremgangsmåte</h2>
          <ReactMarkdown components={renderers}>{recipe.steps}</ReactMarkdown>
        </div>
      </section>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const id = getSlugId(params?.slug)

    if (!id) {
      return {
        props: {
          notFound: true,
        },
      }
    }

    const recipe = id ? await getRecipe(id) : null

    return {
      props: {
        recipe,
        revalidate: 60,
      },
    }
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  }
}
