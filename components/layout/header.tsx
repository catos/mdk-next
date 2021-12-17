import { User } from "firebase/auth";
import Logo from "../logo";
import Link from "../ui/link";
import Button from "../ui/button";

type Props = {
  user?: User | null
}

export default function Header({ user }: Props) {
  return (
    <header className="fixed z-50 w-full top-0 flex flex-wrap items-center justify-between h-16 px-4 sm:p-0 bg-white shadow-lg">
      <nav aria-label="Main navigation" className="container mx-auto flex items-center">
        <Link href="/" className="flex items-center">
          <Logo className="w-8 h-8" />
          <span className="pl-2 font-bold text-orange-600 hidden sm:inline">Min Digitale Kokebok</span>
        </Link>
        <div className="flex flex-1 gap-10 items-center justify-end">
          <Button>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </Button>
          <Button className="sm:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
          </Button>
          <HeaderLink href="/oppskrifter">Oppskrifter</HeaderLink>
          <HeaderLink href="/meny">Meny</HeaderLink>
          {user ?
            (
              <>
                <span>{user.displayName}</span>
                <form action="/logout" method="post">
                  <button type="submit" className="button">
                    Logout
                  </button>
                </form>
              </>
            )
            : <HeaderLink href="/logg-inn">Logg inn</HeaderLink>}
            
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
    <Link className="hidden sm:inline-block text-base font-medium text-gray-700 hover:text-orange-500 hover:no-underline" {...props} />
  )
}