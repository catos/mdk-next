import styles from "./fab.module.css"

type FABProps = {
  color?: "primary" | "secondary" | "default"
  className?: string
  children: React.ReactNode
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export default function FAB({color = "default", className, ...rest}: FABProps) {
  
  const classes = [
    styles.button,
    styles[`color-${color}`],
    "fixed bottom-4 right-4 w-12 h-12"
  ]

  if (className) classes.push(className)

  return (
    <button className={classes.join(" ")} {...rest} />
  )
}