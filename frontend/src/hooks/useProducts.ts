import { useState, useCallback } from 'react'
import { Product } from '../models/response-models'
import { useLoading } from '../context/loading-context'

export function useProducts() {
  const [products, setProducts] = useState([] as Product[])
  const { setLoading } = useLoading()

  const sendQuery = useCallback(
    async (query: string) => {
      if (!query) {
        //TODO add error handling
        return
      }

      setLoading(true)
      try {
        const response = await fetch('/api/prompt', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({
            prompt: query,
          }),
        })
        const data = await response.json()
        setProducts(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    },
    [setProducts, setLoading]
  )

  return { products, sendQuery }
}
