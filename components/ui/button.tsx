import styles from "./button.module.css"
import Link from "./link"

type ButtonProps = {
  color?: "primary" | "secondary" | "disabled"
  className?: string
  rounded?: boolean
  href?: string
  children: React.ReactNode
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export default function Button({ color = "primary", className, rounded = false, href = "", disabled, ...rest }: ButtonProps) {

  if (disabled) {
    color = "disabled"
  }

  const classes = [
    styles.button,
    rounded ? "rounded-full" : "rounded-lg",
    styles[`color-${color}`],
    className
  ]

  return href 
    ? <Link href={href} className={classes.join(" ")} {...rest} />
    : <button className={classes.join(" ")} disabled={disabled} {...rest} />
}