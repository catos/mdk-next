/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react"
import useAuth from "contexts/auth"
import { FiMenu, FiX } from "react-icons/fi"
import { Button, Link, Popover } from "components/ui"
import { useRouter } from "next/router"

export default function Dropdown() {
  const { user, logout } = useAuth()
  const [open, setOpen] = useState(false)

  // TODO: this is a weird way to close dropdown ?
  const router = useRouter()
  useEffect(() => {
    const handleRouteChange = () => {
      setOpen(false)
    }
    router.events.on("routeChangeStart", handleRouteChange)
    return () => {
      router.events.off("routeChangeStart", handleRouteChange)
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

          {user ? (
            <>
              <div className="flex flex-col items-center">
                {user.photoURL && (
                  <img
                    className="rounded-full w-16 border border-slate-200"
                    src={user.photoURL}
                    alt={user.displayName}
                  />
                )}
                <strong>{user.displayName}</strong>
                <div>{user.email}</div>
              </div>

              <hr />

              <Link href="/oppskrifter">Oppskrifter</Link>
              <Link href="/meny">Menyer</Link>
              <Link href="/favoritter">Favoritter</Link>

              {user.isAdmin && (
                <>
                  <hr />
                  <Link href="/admin">Admin dashboard</Link>
                  <Link href="/ui">UI Components</Link>
                </>
              )}

              <hr />

              <Button color="primary" onClick={(_) => logout("/")}>
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
