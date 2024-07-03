import { IconButton, Input } from '@mui/material'
import { ChangeEvent, useState, useCallback } from 'react'
import './query-component.scss'
import { Send } from '@mui/icons-material'
import { useLoading } from '../../context/loading-context'

type QueryComponentProps = {
  sendQuery: (query: string) => void;
}

export function QueryComponent({ sendQuery }: QueryComponentProps) {
  const [query, setQuery] = useState('')
  const { setLoading } = useLoading();

  const handleClick = useCallback(
    (input: string) => {
      setLoading(true)
      sendQuery(input)
    },
    [sendQuery, setLoading]
  )

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        handleClick(query)
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
