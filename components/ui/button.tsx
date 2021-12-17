import styles from "./button.module.css"

type ButtonProps = {
  className?: string
  children: React.ReactNode
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export default function Button({className, ...rest}: ButtonProps) {
  const classes = [styles.button]  
  if (className) classes.push(className)

  return (
    <button className={classes.join(" ")} {...rest} />
  )
}