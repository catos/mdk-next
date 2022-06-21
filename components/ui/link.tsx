import NextLink from "next/link"

type LinkProps = {
  href: string
  className?: string
  children: React.ReactNode | string
}

export default function Link({ href, className, children }: LinkProps) {
  const classes = className ?? "text-primary-600 hover:underline"
  
  return (
    <NextLink href={href}>
      <a className={classes}>{children}</a>
    </NextLink>
  )
}