import { Input } from '@mui/material'
import { ChangeEvent } from 'react'
import './query-component.scss'

type QueryComponentProps = {
  query: string
  setQuery: (query: string) => void
}
export function QueryComponent({ query, setQuery }: QueryComponentProps) {
  return (
    <Input
      className="query-input"
      value={query}
      onChange={(event: ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value)
      }}
      placeholder="Describe the product"
      disableUnderline={true}
    ></Input>
  )
}
