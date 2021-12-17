import Button from "../components/ui/button";
import Input from "../components/ui/input";

export default function Login() {
  const loading = false

  return (
    <form method="post" className="mx-auto sm:w-1/2 flex flex-col gap-4">
      <Input name="username" label="Brukernavn" type="email" />
      <Input name="password" label="Passord" type="password" />

      <Button type="submit">
        {loading ? "Logger inn..." : "Logg inn"}
      </Button>
    </form>
  )
}