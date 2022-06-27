import { useState, useEffect } from "react"
import { createPortal } from "react-dom"

interface IPopoverProps {
  open: boolean
  children: React.ReactNode
}

export default function Popover({ open, children }: IPopoverProps) {
  const [container] = useState(() => {
    if (typeof window !== "undefined") {
      const el = document.createElement("div")
      return el
    }
  })

  useEffect(() => {
    container && document.body.appendChild(container)
    return () => { container && document.body.removeChild(container) }
  }, [container])

  if (!open || !container) {
    return null
  }

  return createPortal(children, container)
}
