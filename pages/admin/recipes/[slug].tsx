import { GetServerSideProps } from "next"
import {
  defaultRecipe,
  getRecipe,
  IRecipe,
  saveRecipe,
} from "../../../data/recipe-service"
import useForm from "lib/use-form"
import { FAB, Form, Input } from "components/ui"
import { TextArea } from "components/ui"
import { getSlugId } from "lib/get-slug-id"
import slugify from "lib/slugify"
import { format } from "date-fns"
import { FiFileText, FiList, FiSave } from "react-icons/fi"

interface IProps {
  recipe: IRecipe
}

export default function Page({ recipe }: IProps) {
  const { values, handleSubmit, handleChange } = useForm<IRecipe>(
    recipe ?? defaultRecipe,
    async (values: IRecipe) => {
      await saveRecipe(values)
    }
  )

  return (
    <Form onSubmit={handleSubmit}>
      <div className="fixed bottom-2 right-2 flex flex-col gap-2">
        <FAB color="primary" icon={<FiSave size="100%" />} type="submit" />
        <FAB
          color="secondary"
          icon={<FiFileText size="100%" />}
          href={`/oppskrifter/${slugify(values.name ?? "")}-${values.id}`}
        />
        <FAB
          color="secondary"
          icon={<FiList size="100%" />}
          href={`/admin/recipes`}
        />
      </div>
      <Input
        name="type"
        type="number"
        onChange={handleChange}
        value={values.type}
      />
      {/* <Input name="created" type="date" onChange={handleChange} value={format(values.created, "yyyy-MM-dd")} /> */}
      <Input
        name="created"
        type="string"
        onChange={handleChange}
        value={values.created.toString()}
      />
      <Input name="name" onChange={handleChange} value={values.name} />
      <Input name="image" onChange={handleChange} value={values.image} />
      <Input name="source" onChange={handleChange} value={values.source} />
      <Input
        name="time"
        type="number"
        onChange={handleChange}
        value={values.time}
      />
      <TextArea
        name="description"
        onChange={handleChange}
        value={values.description}
      />
      <TextArea
        name="ingredients"
        onChange={handleChange}
        value={values.ingredients}
      />
      <TextArea name="steps" onChange={handleChange} value={values.steps} />
    </Form>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = getSlugId(params?.slug)

  if (!id) {
    return {
      props: {},
    }
  }

  const recipe = await getRecipe(id)

  return {
    props: {
      recipe,
    },
  }
}
