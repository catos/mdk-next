import styles from "./button.module.css"

type ButtonProps = {
  color?: "primary" | "secondary" | "disabled"
  className?: string
  rounded?: boolean
  children: React.ReactNode
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export default function Button({ color = "primary", className, rounded = false, disabled, ...rest }: ButtonProps) {

  if (disabled) {
    color = "disabled"
  }

  const classes = [
    styles.button,
    rounded ? "rounded-full" : "rounded-lg",
    styles[`color-${color}`],
    className
  ]

  return (
    <button className={classes.join(" ")} disabled={disabled} {...rest} />
    // <button className="bg-primary-600 p-4 rounded-md rounded-full" {...rest} />
  )
}