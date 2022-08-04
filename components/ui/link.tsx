import clsx from "clsx"
import NextLink from "next/link"
import { DOMAttributes } from "react"

type LinkProps = {
  href: string
  className?: string
  children: React.ReactNode | string
} & DOMAttributes<HTMLAnchorElement>

export default function Link({ href, className, children, ...rest }: LinkProps) {
  const classes = clsx(
    "text-primary-600 hover:underline",
    className
  )
  
  return (
    <NextLink href={href}>
      <a className={classes} {...rest}>{children}</a>
    </NextLink>
  )
}