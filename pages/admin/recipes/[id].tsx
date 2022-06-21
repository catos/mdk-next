import { GetServerSideProps } from "next"
import { getRecipe, IRecipe, saveRecipe } from "../../../firebase/recipe-service"
import useForm from "lib/use-form";
import { Button, Form, Input } from "components/ui";

interface IProps {
  recipe: IRecipe
}

export default function Page({ recipe }: IProps) {

  const { values, handleSubmit, handleChange } = useForm(
    recipe,
    async (values: IRecipe) => {
      console.log("save recipe", values);
      await saveRecipe(values)
    }
  )

  return (
    <Form onSubmit={handleSubmit}>
      <Input name="name" label="Name" onChange={handleChange} value={values?.name} />
      <Button color="primary" type="submit">Save</Button>
    </Form>
  )
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