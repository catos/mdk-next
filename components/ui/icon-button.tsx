import clsx from "clsx"
import { forwardRef, MutableRefObject } from "react"
import styles from "./icon-button.module.css"

type ButtonProps = {
  color?: "primary" | "secondary" | "default" | "disabled"
  className?: string
  ref?: MutableRefObject<null>
  children: React.ReactNode
} & React.ButtonHTMLAttributes<HTMLButtonElement>

const IconButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ color = "default", className, disabled, ...rest }, ref) => (
    <button
      className={clsx(styles.button, styles[`color-${disabled ? "disabled" : color}`], className)}
      ref={ref}
      {...rest} />
  )
)

IconButton.displayName = "IconButton"

export default IconButton