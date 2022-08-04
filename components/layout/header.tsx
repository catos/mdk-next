import Logo from "components/logo";
import Link from "components/ui/link";
import Dropdown from "./header-dropdown";


export default function Header() {
  return (
    <header className="fixed z-50 w-full top-0 flex flex-wrap items-center justify-between h-16 px-4 bg-white shadow-lg">
      <nav aria-label="Main navigation" className="container mx-auto flex items-center">
        <Link href="/" className="flex items-center">
          <Logo className="w-8 h-8" />
        </Link>
        <div className="flex flex-1 gap-10 items-center justify-end">
          <HeaderLink href="/oppskrifter">Oppskrifter</HeaderLink>
          <HeaderLink href="/meny">Meny</HeaderLink>
          <Dropdown />
        </div>
      </nav>
    </header>
  )
}

type HeaderLinkProps = {
  href: string,
  children: React.ReactNode
}

function HeaderLink(props: HeaderLinkProps) {
  return (
    <Link className="text-base font-medium text-gray-700 hover:text-orange-500 hover:no-underline" {...props} />
  )
}

