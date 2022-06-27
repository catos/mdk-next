import toUpperFirst from "lib/to-upper-first"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string
  label?: string | boolean
}

export default function Input({ name, label = true, ...rest }: InputProps) {

  let _label = label
  if (typeof label === "boolean" && label) {
    _label = toUpperFirst(name)
  }

  return (
    <div>
      {_label
        ? <label
          className="block text-xs uppercase font-medium text-gray-500 tracking-wide"
          htmlFor={name}>
          {_label}
        </label>
        : null}
      <input
        className="
          focus:ring-indigo-500 
          focus:border-indigo-500 
          w-full 
          px-4 
          py-3 
          border-gray-300 
          rounded-md
          bg-slate-100"
        type="text" id={name} name={name} {...rest} />
      {/* TODO: {errors?.title && <div>Title is required</div>} */}
    </div>
  )
}