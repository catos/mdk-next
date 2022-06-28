import { useRef, useState } from "react";
import useAuth from "contexts/auth";
import { FiMenu } from "react-icons/fi"
import { Button, IconButton, Link, Popover } from "components/ui";
import clsx from "clsx";

export default function Dropdown() {
  const { isAuthenticated, user, logout } = useAuth()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  // TODO: anchor popover to ref position
  // console.log(ref.current);

  return (
    <div className="relative">
      <IconButton
        color="primary"
        ref={ref}
        onClick={_ => setOpen(!open)}>
        <FiMenu size={24} />
      </IconButton>

      <Popover open={open}>
        <button onClick={_ => setOpen(false)}>Close</button>

        <div className="absolute top-[120px] right-2 bg-white shadow-lg p-8 flex-col gap-4 w-3/4">
          <h1>Hello?</h1>
          {isAuthenticated ?
            (
              <>
                <div className="whitespace-nowrap">{user.displayName}</div>
                <button onClick={_ => logout()} className="button">
                  Logg ut
                </button>
              </>
            )
            :
            <Link href="/logg-inn">Logg inn</Link>
          }
        </div>
      </Popover>

    </div>
  )
}
