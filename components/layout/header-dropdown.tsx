import { useEffect, useState } from "react"
import useAuth from "contexts/auth"
import { FiMenu, FiX } from "react-icons/fi"
import { Button, Link, Popover } from "components/ui"
import { useRouter } from "next/router"

export default function Dropdown() {
  const { isAuthenticated, user, logout } = useAuth()
  const [open, setOpen] = useState(false)

  // TODO: this is a weird way to close dropdown ?
  const router = useRouter()
  useEffect(() => {
    const handleRouteChange = () => {
      setOpen(false)
    }

    router.events.on('routeChangeStart', handleRouteChange)

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
    }
  }, [router.events])

  return (
    <div className="relative">
      <Button icon={<FiMenu size="100%" />} onClick={(_) => setOpen(!open)} />

      <Popover open={open}>
        <div
          className="z-50 bg-slate-900 fixed inset-0 opacity-30"
          onClick={(_) => setOpen(false)}
        />
        <div className="z-50 fixed top-0 right-0 h-full bg-white shadow-lg pt-12 p-4 flex flex-col gap-4 w-3/4 md:w-96">
          <Button
            className="absolute top-2 right-2"
            icon={<FiX size="100%" />}
            size="large"
            onClick={(_) => setOpen(false)}
          />

          {isAuthenticated ? (
            <>
              <div className="flex flex-col items-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="rounded-full w-16 border border-slate-200"
                  src={user.photoURL}
                  alt={user.displayName}
                />
                <strong>{user.displayName}</strong>
                <div>{user.email}</div>
              </div>

              <hr />

              <Link href="/oppskrifter">Oppskrifter</Link>
              <Link href="/meny">Menyer</Link>
              <Link href="/favoritter">Favoritter</Link>

              <hr />

              <Link href="/admin/recipes">Recipes (admin)</Link>
              <Link href="/ui">UI Components</Link>

              <hr />

              <Button color="primary" onClick={(_) => logout()}>
                Logg ut
              </Button>
            </>
          ) : (
            <Link href="/logg-inn">Logg inn</Link>
          )}
        </div>
      </Popover>
    </div>
  )
}
