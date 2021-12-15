import Link from "next/link";
import Logo from "../logo";

export default function Footer() {
  return (
    <footer className="flex flex-col gap-4 items-center py-8 bg-slate-100">
      <section className="container mx-auto text-center">
        <Logo />
        <p className="mt-4 leading-tight">
          Lorem ipsum dolor amet consectetur, adipisicing elit. Illo maiores
          iure in vitae iusto fuga ratione?
        </p>
      </section>

      <section className="flex gap-8">
        <Link href="/">
          Om oss
        </Link>
        <Link href="/">
          Hjelp
        </Link>
        <Link href="/">
          Vilkår
        </Link>
      </section>

      <section className="text-sm">
        {"Copyright © "}
        <span className="font-bold">ca7o.com</span> {new Date().getFullYear()}
        {"."}
      </section>

    </footer>
  )
}
