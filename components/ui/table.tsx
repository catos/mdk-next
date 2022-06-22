interface TableProps extends React.HTMLAttributes<HTMLTableElement> {
  children: React.ReactNode
}

export function Table(props: TableProps) {
  return (
    <table className="table-auto w-full" {...props} />
  )

}

interface TRProps extends React.HTMLAttributes<HTMLTableRowElement> {
  children: React.ReactNode
}

export function TR(props: TRProps) {
  return (
    <tr className="border-y" {...props} />
  )
}

interface TDProps extends React.HTMLAttributes<HTMLTableCellElement> {
  children: React.ReactNode
}

export function TD(props: TDProps) {
  return (
    <td className="p-2" {...props} />
  )
}