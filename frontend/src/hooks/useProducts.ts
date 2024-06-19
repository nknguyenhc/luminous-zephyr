import { useState } from 'react'
import { Product } from '../models/response-models'

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

  function sendQuery(query: string) {
    if (!query) {
      //TODO add error handling
      return
    }

    // Fake API call
    setTimeout(() => {
      setProducts(testProducts)
      alert(`Query Received: ${query}`)
    }, 1000)
  }

  return { products, sendQuery }
}
