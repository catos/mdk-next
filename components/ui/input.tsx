interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string
  label?: string
}

export default function Input({ name, label, ...rest }: InputProps) {
  return (
    <div>
      {label ? <label className="block font-medium text-gray-700" htmlFor={name}>
        {label}
      </label> : null}
      <input className="focus:ring-indigo-500 focus:border-indigo-500 w-full px-4 py-3 border-gray-300 rounded-md" type="text" id={name} name={name} {...rest} />
      {/* TODO: {errors?.title && <div>Title is required</div>} */}
    </div>
  )
}