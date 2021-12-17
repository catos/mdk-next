import Logo from "../components/logo";
import Button from "../components/ui/button";
import Input from "../components/ui/input";
import Link from "../components/ui/link";

export default function Login() {
  const loading = false

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
      <form method="post" className="flex flex-col gap-8 p-10 bg-white rounded-lg sm:shadow-md">
        <Input name="username" label="E-post" type="email" />
        <Input name="password" label="Passord" type="password" />

        <Button color="primary" type="submit">
          {loading ? "Logger inn..." : "Logg inn"}
        </Button>
      </form>
    </div>
  )
}