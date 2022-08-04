import clsx from "clsx"

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  children: React.ReactNode
}

export default function Form({className, ...rest}: FormProps) {
  const classes = clsx(
    "flex flex-col w-full",
    className
  )
  return (
    <form className={classes} {...rest} />
  )
}