import { useRouter } from "next/router";
import Logo from "../components/logo";
import Button from "../components/ui/button";
import Input from "../components/ui/input";
import Link from "../components/ui/link";
import useAuth from "../contexts/auth";
import useForm from "../lib/use-form";

interface IForm {
  username: string
  password: string
}

const initialForm = {
  username: "",
  password: "",
}

export default function Login() {
  const router = useRouter()
  const loading = false
  const { login } = useAuth()
  const { values, handleSubmit, handleChange } = useForm<IForm>(
    initialForm,
    (values: IForm) => {
      TODO: login
      login(values.username, values.password)
        .then(() => {
          router.push("/")
          console.log("redirect to prev-url || /");

        })
        .catch((error: any) => {
          const wrongUsernameOrPassword = [
            "auth/user-not-found",
            "auth/wrong-password",
          ]
          if (wrongUsernameOrPassword.includes(error.code)) {
            // notify("Wrong username or password")
            console.log("Wrong username or password");

          } else {
            // notify(`Error: ${error.message}`)
            console.log(`Error: ${error.message}`);

          }
        })
    }
  )

  return (
    <div className="container mx-auto max-w-md mb-64">
      <div className="flex flex-col items-center">
        <Logo className="mt-8 mb-4 w-16 h-16" />
        <h1 className="h1">Logg inn</h1>
        <p className="text-gray-500 pt-2 pb-4 text-center">
          Eller{" "}
          <Link className="font-semibold" href="/registrer">
            registrer ny bruker
          </Link>{" "}
          for å kunne ta i bruke alle funksjoner
        </p>
      </div>
      <form onSubmit={handleSubmit} method="post" className="flex flex-col gap-8 p-10 bg-white rounded-lg sm:shadow-md">
        <Input name="username" label="E-post" type="email" onChange={handleChange} value={values?.username} />
        <Input name="password" label="Passord" type="password" onChange={handleChange} value={values?.password} />

        <Button color="primary" type="submit">
          {loading ? "Logger inn..." : "Logg inn"}
        </Button>
      </form>
    </div>
  )
}