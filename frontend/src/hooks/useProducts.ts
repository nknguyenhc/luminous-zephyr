import { useState, useCallback } from 'react'
import { Product } from '../models/response-models'
import { useLoading } from '../context/loading-context'

interface Query {
  description: string;
  category: string | undefined;
  priceRange: {
    lower: number | string;
    upper: number | string;
  };
}

export function useProducts() {
  const [products, setProducts] = useState([] as Product[])
  const { setLoading } = useLoading()

  const sendQuery = useCallback(
    async (query: Query) => {
      
      // Error Handling: Description
      if (!query.description) {
        //TODO add error handling
        alert("Please describe your gift! Thank you!")
        setLoading(false);
        return
      }

      // Parse Price Range
      if (!Number.isFinite(query.priceRange.lower)) {
        query.priceRange.lower = 0;
      }
      if (!Number.isFinite(query.priceRange.upper)) {
        query.priceRange.upper = 10000;
      }

      // Error Handling: Price Range Input
      if (query.priceRange.lower && query.priceRange.upper) {
        if (query.priceRange.lower > query.priceRange.upper) {
          alert ("Minimum Price must be lower than Maximum Price!")
          setLoading(false);
          return
        }
      }
      console.log("Query Category: ", query.category)
      console.log("Parsed Query Price Range: ", query.priceRange)

      console.log("Loading spinner called.")
      setLoading(true)
      try {
        const response = await fetch('/api/prompt', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({
            prompt: query.description,
            categories: query.category ? [query.category] : undefined,
            price_range: {
              lower: query.priceRange.lower,
              upper: query.priceRange.upper,
            },
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
