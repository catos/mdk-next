import clsx from "clsx"
import NextLink from "next/link"
import { DOMAttributes } from "react"

type LinkProps = {
  href: string
  color?: string
  className?: string
  children: React.ReactNode | string
} & DOMAttributes<HTMLAnchorElement>

export default function Link({ href, color = "text-primary-600", className, children, ...rest }: LinkProps) {
  const classes = clsx(
    color,
    "hover:underline",
    className
  )

  return (
    <NextLink href={href} className={classes} {...rest}>
      {children}
    </NextLink>
  )
}