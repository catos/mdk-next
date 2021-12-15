
// TODO: finish custom renderers: https://github.com/remarkjs/react-markdown#appendix-b-node-types
// TODO: move all to separate components ?

import ListItem from "../components/recipe/list-item"
import Timer from "../components/recipe/timer"

const renderers = {
  h1: (props: any) => {
    return (
      <h3 className="text-sm uppercase text-slate-500 pb-0 pt-4">
        {props.children}
      </h3>
    )
  },
  ul: (props: any) => <ul>{props.children}</ul>,
  li: (props: any) => {
    return <ListItem {...props} />
  },
  p: ({ children, ...rest }: any) => {
    return <div>{children}</div>
  },
  code: (props: any) => {
    const code = props.children && props.children[0]
    if (code.startsWith("timer:")) {
      return <Timer value={parseInt(code.replace("timer:", ""))} />
    }
    return <pre>{props.value}</pre>
  },
  img: (props: any) => <div {...props} />,
}

export default renderers
