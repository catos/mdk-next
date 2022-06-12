import { GetServerSideProps } from "next"
import { getRecipe, getRecipes, IRecipe } from "../../../firebase/recipe-service"
import Input from "../../../components/ui/input"
import useForm from "../../../lib/use-form";

interface IProps {
  recipe: IRecipe
}

export default function Page({ recipe }: IProps) {
console.log(recipe);
const { values, handleSubmit, handleChange } = useForm(recipe, () => {

})

  return <>
    <Input name="name" label="Name" onChange={handleChange} value={values?.name} />
  </>
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  console.log(query);
  const id = Array.isArray(query.id) ? query.id.join("") : query.id

  if (!id) {
    return {
      props: {}
    }
  }

  const recipe = await getRecipe(id)

  return {
    props: {
      recipe
    }
  }
}