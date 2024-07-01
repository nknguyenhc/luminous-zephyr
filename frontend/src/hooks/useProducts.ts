import { useState, useCallback } from 'react'
import { Product } from '../models/response-models'
import placeholderImage from '../images/default-product-image.png'
import placeholderImageHorizontallyLong from '../images/long-image-test.jpg'
import placeholderImageVerticallyLong from '../images/long-ruler-image-test.jpg'
import { useLoading } from '../context/loading-context'

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
    image: placeholderImageVerticallyLong,
  },
  {
    id: 6,
    name: 'Test Product',
    price: 200,
    description: 'This is another test product',
    image: placeholderImageVerticallyLong,
  },
  {
    id: 7,
    name: 'Test Product',
    price: 200,
    description: 'This is another test product',
    image: placeholderImage,
  },
  {
    id: 8,
    name: 'Test Product',
    price: 200,
    description: 'This is another test product',
    image: placeholderImageVerticallyLong,
  },
  {
    id: 9,
    name: 'Test Product',
    price: 200,
    description: 'This is another test product',
    image: placeholderImageVerticallyLong,
  },
  {
    id: 10,
    name: 'Test Product',
    price: 200,
    description: 'This is another test product',
    image: placeholderImageHorizontallyLong,
  },
]

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
        const response = await fetch(
          'https://run.mocky.io/v3/3df09685-3dea-4d16-bc6e-8de10bcd94f6?' +
            new URLSearchParams({ query }).toString(),
          {
            method: 'GET',
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json',
            },
            referrerPolicy: 'no-referrer',
          }
        )
        const data = await response.json()

        setProducts(data.products)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    },
    [setProducts, setLoading]
  )

  return { products, sendQuery }
}
