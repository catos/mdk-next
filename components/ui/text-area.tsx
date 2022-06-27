import React from "react"
import toUpperFirst from "lib/to-upper-first"

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string
  label?: string | boolean
}

export default function TextArea({ name, label = true, rows = 10, ...rest }: TextAreaProps) {
  const [focus, setFocus] = React.useState(false)

  let _label = label
  if (typeof label === "boolean" && label) {
    _label = toUpperFirst(name)
  }

  return (
    <div>
      {_label ? <label className="block text-xs uppercase font-medium text-gray-500 tracking-wide" htmlFor={name}>
        {_label}
      </label> : null}
      <textarea
        className="focus:ring-indigo-500 focus:border-indigo-500 w-full px-4 py-3 border-gray-300 rounded-md bg-slate-100"
        id={name}
        name={name}
        rows={focus ? rows : 1}
        onFocus={_ => setFocus(true)}
        onBlur={_ => setFocus(false)}
        {...rest} />
      {/* TODO: {errors?.title && <div>Title is required</div>} */}
    </div>
  )
}