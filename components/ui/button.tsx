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
  href?: string
  icon?: React.ReactNode | undefined
  children?: React.ReactNode
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export default function Button(props: ButtonProps) {
  const {
    size = "default",
    className,
    href = "",
    icon = undefined,
    disabled,
    ...rest
  } = props

  let { color = "default" } = props

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

  const padding = icon ? "p-2" : "px-4 p-3"

  const classes = clsx(
    "cursor-pointer text-sm font-bold uppercase tracking-wider transition ease-linear duration-200 hover:backdrop-brightness-90 hover:drop-shadow-lg hover:no-underline focus:outline-none focus:ring-2",
    // { "border-2 border-slate-700": color === "default" },
    padding,
    textColor,
    colorStyle[disabled ? "disabled" : color],
    _size,
    className
  )

  // TODO: color-prop here is iffy...
  return href ? (
    <Link href={href} color={color === "default" ? "text-primary-600" : "text-white"} className={classes}>
      {children}
    </Link>
  ) : (
    <button className={classes} disabled={disabled} {...rest}>
      {children}
    </button>
  )
}
