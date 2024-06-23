import { useState, useCallback } from 'react'
import { Product } from '../models/response-models'
import placeholderImage from '../images/default-product-image.png'
import placeholderImageHorizontallyLong from '../images/long-image-test.jpg'
import placeholderImageVerticallyLong from '../images/long-ruler-image-test.jpg'

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
    image: placeholderImageHorizontallyLong,
  },
  {
    id: 4,
    name: 'Test Product',
    price: 200,
    description: 'This is another test product',
    image: placeholderImageHorizontallyLong,
  },
  {
    id: 5,
    name: 'Test Product',
    price: 200,
    description: 'This is another test product',
    image: placeholderImageVerticallyLong
  },
  {
    id: 6,
    name: 'Test Product',
    price: 200,
    description: 'This is another test product',
    image: placeholderImageVerticallyLong
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
    image: placeholderImageVerticallyLong
  },
  {
    id: 9,
    name: 'Test Product',
    price: 200,
    description: 'This is another test product',
    image: placeholderImageVerticallyLong
  },
  {
    id: 10,
    name: 'Test Product',
    price: 200,
    description: 'This is another test product',
    image: placeholderImageHorizontallyLong
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
