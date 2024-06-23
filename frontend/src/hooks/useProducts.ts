import { useState, useCallback } from 'react'
import { Product } from '../models/response-models'
import { useLoading } from '../context/loading-context'

const testProducts: Product[] = [
  {
    id: 1,
    name: 'Test Product',
    price: 100,
    description: 'This is a test product',
    image: '',
  },
  {
    id: 2,
    name: 'Test Product',
    price: 200,
    description: 'This is another test product',
    image: '',
  },
  {
    id: 3,
    name: 'Test Product',
    price: 200,
    description: 'This is another test product',
    image: '',
  },
  {
    id: 4,
    name: 'Test Product',
    price: 200,
    description: 'This is another test product',
    image: '',
  },
  {
    id: 5,
    name: 'Test Product',
    price: 200,
    description: 'This is another test product',
    image: '',
  },
  {
    id: 6,
    name: 'Test Product',
    price: 200,
    description: 'This is another test product',
    image: '',
  },
  {
    id: 7,
    name: 'Test Product',
    price: 200,
    description: 'This is another test product',
    image: '',
  },
  {
    id: 8,
    name: 'Test Product',
    price: 200,
    description: 'This is another test product',
    image: '',
  },
  {
    id: 9,
    name: 'Test Product',
    price: 200,
    description: 'This is another test product',
    image: '',
  },
  {
    id: 10,
    name: 'Test Product',
    price: 200,
    description: 'This is another test product',
    image: '',
  },
]

export function useProducts() {
  const [products, setProducts] = useState([] as Product[])
  const { setLoading } = useLoading();

  const sendQuery = useCallback(
    (query: string) => {
      if (!query) {
        //TODO add error handling
        return
      }
      
      setLoading(true)

      // Fake API call
      setTimeout(() => {
        setProducts(testProducts)
        alert(`Query Received: ${query}`)
        setLoading(false)
      }, 1000)
    },
    [setProducts, setLoading]
  )

  return { products, sendQuery }
}
