import { useState, useCallback } from 'react'
import { Product } from '../models/response-models'
import placeholderImage from '../images/default-product-image.png'

const testProducts: Product[] = [
  {
    id: 1,
    name: 'Test Product',
    price: 100,
    description: 'This is a test product',
    image: placeholderImage,
  },
  {
    id: 2,
    name: 'Test Product',
    price: 200,
    description: 'This is another test product',
    image: placeholderImage,
  },
  {
    id: 3,
    name: 'Test Product',
    price: 200,
    description: 'This is another test product',
    image: placeholderImage,
  },
  {
    id: 4,
    name: 'Test Product',
    price: 200,
    description: 'This is another test product',
    image: placeholderImage,
  },
  {
    id: 5,
    name: 'Test Product',
    price: 200,
    description: 'This is another test product',
    image: placeholderImage
  },
  {
    id: 6,
    name: 'Test Product',
    price: 200,
    description: 'This is another test product',
    image: placeholderImage
  },
  {
    id: 7,
    name: 'Test Product',
    price: 200,
    description: 'This is another test product',
    image: placeholderImage
  },
  {
    id: 8,
    name: 'Test Product',
    price: 200,
    description: 'This is another test product',
    image: placeholderImage
  },
  {
    id: 9,
    name: 'Test Product',
    price: 200,
    description: 'This is another test product',
    image: placeholderImage
  },
  {
    id: 10,
    name: 'Test Product',
    price: 200,
    description: 'This is another test product',
    image: placeholderImage
  },
]

export function useProducts() {
  const [products, setProducts] = useState([] as Product[])

  const sendQuery = useCallback(
    (query: string) => {
      if (!query) {
        //TODO add error handling
        return
      }

      // Fake API call
      setTimeout(() => {
        setProducts(testProducts)
        alert(`Query Received: ${query}`)
      }, 1000)
    },
    [setProducts]
  )

  return { products, sendQuery }
}
