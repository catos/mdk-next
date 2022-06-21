import NextLink from "next/link"

type LinkProps = {
  href: string
  className?: string
  children: React.ReactNode | string
}

export default function Link({ href, className, children }: LinkProps) {
  // TODO: overwrite default classes with props
  const classes = ["text-slate-600 hover:underline"]
  if (className) classes.push(className)

  return (
    <NextLink href={href}>
      <a className={classes.join(" ")}>{children}</a>
    </NextLink>
  )
}