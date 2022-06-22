import * as React from "react"
import clsx from "clsx"
import slugify from "lib/slugify"

interface IListItemProps {
  index: number
  children: any
}

const ListItem: React.FC<IListItemProps> = ({ index, children }) => {
  const [checked, setChecked] = React.useState(false)

  const id = `${index}-${slugify(children[0])}`
  const handleChange = () => {
    setChecked(!checked)
  }

  return (
    <div className="flex items-center">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        name={id}
        className="checkbox"
      />
      <label
        htmlFor={id}
        className={clsx(
          "p-2 text-base inline-block cursor-pointer whitespace-normal flex-grow",
          checked ? "text-slate-500" : "inherit"
        )}
      >
        {children}
      </label>
    </div>
  )
}

export default ListItem
