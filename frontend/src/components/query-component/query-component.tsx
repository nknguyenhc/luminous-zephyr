import { IconButton, Input } from '@mui/material'
import { ChangeEvent, useState } from 'react'
import './query-component.scss'
import { Send } from '@mui/icons-material'

type QueryComponentProps = {
  sendQuery: (query: string) => void
}
export function QueryComponent({ sendQuery }: QueryComponentProps) {
  const [query, setQuery] = useState('')
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        sendQuery(query)
        setQuery('')
      }}
      className="query-container"
    >
      <Input
        className="query-input"
        value={query}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          setQuery(event.target.value)
        }}
        placeholder="Describe the product"
        disableUnderline={true}
      ></Input>
      <IconButton
        type="submit"
        className="query-send-icon-button"
        aria-label="send"
      >
        <Send />
      </IconButton>
    </form>
  )
}
