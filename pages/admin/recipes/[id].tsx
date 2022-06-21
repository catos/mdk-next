import { GetServerSideProps } from "next"
import { getRecipe, IRecipe, saveRecipe } from "../../../firebase/recipe-service"
import useForm from "lib/use-form";
import { Button, Form, Input } from "components/ui";
import TextArea from "components/ui/text-area";

interface IProps {
  recipe: IRecipe
}

export default function Page({ recipe }: IProps) {

  const { values, handleSubmit, handleChange } = useForm(
    recipe,
    async (values: IRecipe) => {
      console.log("save");
      
      // await saveRecipe(values)
    }
  )

  return (
    <Form onSubmit={handleSubmit}>
      <div className="fixed bottom-2 right-2 flex flex-col gap-2">
        <Button color="primary" type="submit" rounded>S</Button>
        <Button color="secondary" type="submit" rounded>R</Button>
      </div>
      <Input name="type" type="number" onChange={handleChange} value={values?.type} />
      <Input name="created" type="date" onChange={handleChange} value={values?.created} />
      <Input name="name" onChange={handleChange} value={values?.name} />
      <Input name="image" onChange={handleChange} value={values?.image} />
      <Input name="source" onChange={handleChange} value={values?.source} />
      <Input name="time" type="number" onChange={handleChange} value={values?.time} />
      <TextArea name="description" onChange={handleChange} value={values?.description} />
      <TextArea name="ingredients" onChange={handleChange} value={values?.ingredients} />
      <TextArea name="steps" onChange={handleChange} value={values?.steps} />
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