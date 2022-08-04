import clsx from "clsx"
import Link from "./link"

type ColorTypes = "default" | "primary" | "secondary" | "disabled"
const colorStyle: { [key in ColorTypes]: string } = {
  default: "bg-none hover:brightness-90 focus:ring-slate-700",
  primary: "bg-primary-700 hover:brightness-90 focus:ring-primary-700",
  secondary: "bg-secondary-500 hover:brightness-90 focus:ring-secondary-500",
  disabled: "bg-gray-400 hover:brightness-90 focus:ring-slate-700",
}

type SizeTypes = "small" | "default" | "large"
const sizeStyle: { [key in SizeTypes]: string } = {
  small: "w-8 h-8",
  default: "w-10 h-10",
  large: "w-12 h-12",
}

export type ButtonProps = {
  color?: ColorTypes
  size?: SizeTypes
  className?: string
  rounded?: boolean
  href?: string
  icon?: React.ReactNode | undefined
  children?: React.ReactNode
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export default function Button({
  color = "default",
  size = "default",
  className,
  href = "",
  icon = undefined,
  disabled,
  ...rest
}: ButtonProps) {
  if (disabled) {
    color = "disabled"
  }

  const textColor = color === "default" ? "text-black" : "text-white"

  const children = icon ? (
    <>
      {rest.children}
      {icon}
    </>
  ) : (
    rest.children
  )

  const _size = icon ? sizeStyle[size] : undefined
  
  const rounded = rest.rounded ?? icon ? true : false

  const padding = icon ? rounded ? "p-3" : "p-2" : "px-4 p-3"
  
  const classes = clsx(
    "cursor-pointer text-sm font-bold uppercase tracking-wider transition ease-linear duration-200 hover:backdrop-brightness-90 hover:drop-shadow-lg hover:no-underline focus:outline-none focus:ring-2",
    padding,
    textColor,
    colorStyle[disabled ? "disabled" : color],
    _size,
    { "rounded-full": rounded },
    className
  )

  return href ? (
    <Link href={href} className={classes}>
      {children}
    </Link>
  ) : (
    <button className={classes} disabled={disabled} {...rest}>
      {children}
    </button>
  )
}

export function FAB(props: ButtonProps) {
  return <Button className="shadow-md" {...props} />
}