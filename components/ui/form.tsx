interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  children: React.ReactNode
}

export default function Form(props: FormProps) {
  return (
    <form className="flex flex-col gap-3" {...props} />
  )
}