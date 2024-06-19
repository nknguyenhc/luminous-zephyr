import { useState } from 'react'
import { Product } from '../models/response-models'

const testProducts: Product[] = [
  {
    id: 1,
    name: 'Test Product 1',
    price: 100,
    description: 'This is a test product',
    image: '',
  },
  {
    id: 2,
    name: 'Test Product 2',
    price: 200,
    description: 'This is another test product',
    image: '',
  },
  {
    id: 2,
    name: 'Test Product 2',
    price: 200,
    description: 'This is another test product',
    image: '',
  },
  {
    id: 2,
    name: 'Test Product 2',
    price: 200,
    description: 'This is another test product',
    image: '',
  },
  {
    id: 2,
    name: 'Test Product 2',
    price: 200,
    description: 'This is another test product',
    image: '',
  },
  {
    id: 2,
    name: 'Test Product 2',
    price: 200,
    description: 'This is another test product',
    image: '',
  },
  {
    id: 2,
    name: 'Test Product 2',
    price: 200,
    description: 'This is another test product',
    image: '',
  },
  {
    id: 2,
    name: 'Test Product 2',
    price: 200,
    description: 'This is another test product',
    image: '',
  },
  {
    id: 2,
    name: 'Test Product 2',
    price: 200,
    description: 'This is another test product',
    image: '',
  },
  {
    id: 2,
    name: 'Test Product 2',
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
