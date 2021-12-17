interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string
  label?: string
}

export default function Input({ name, label, ...rest }: InputProps) {
  return (
    <>
      {label ? <label className="label" htmlFor={name}>
        {label}
      </label> : null}
      <input className="px-4 py-3 bg-gray-200 rounded w-full" type="text" id={name} name={name} {...rest} />
      {/* TODO: {errors?.title && <div>Title is required</div>} */}
    </>
  )
}