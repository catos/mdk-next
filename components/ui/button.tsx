import styles from "./button.module.css"

type ButtonProps = {
  color?: "primary" | "secondary" | "default"
  className?: string
  children: React.ReactNode
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export default function Button({color = "default", className, ...rest}: ButtonProps) {
  
  const classes = [
    styles.button,
    styles[`color-${color}`]
  ]

  if (className) classes.push(className)

  return (
    <button className={classes.join(" ")} {...rest} />
  )
}