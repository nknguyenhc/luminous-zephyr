import { useState, useCallback } from 'react'
import { Product } from '../models/response-models'
import placeholderImage from '../images/default-product-image.png'
import placeholderImageHorizontallyLong from '../images/long-image-test.jpg'
import placeholderImageVerticallyLong from '../images/long-ruler-image-test.jpg'
import { useLoading } from '../context/loading-context'

const testProducts: Product[] = [
  {
    id: 11,
    title: 'Innovative Product',
    price_sgd: '250',
    description: 'A groundbreaking product that changes the game',
    image_url: placeholderImageVerticallyLong,
    number_sold: 5,
    category: 'Technology',
    link: 'https://www.example.com',
  },
  {
    id: 12,
    title: 'Eco Friendly Product',
    price_sgd: '150',
    description: 'An eco-friendly product that helps the environment',
    image_url: placeholderImage,
    number_sold: 20,
    category: 'Eco Products',
    link: 'https://www.ecoexample.com',
  },
  {
    id: 13,
    title: 'Luxury Product',
    price_sgd: '500',
    description: 'A luxury product for those who want the finer things',
    image_url: placeholderImageHorizontallyLong,
    number_sold: 2,
    category: 'Luxury',
    link: 'https://www.luxuryexample.com',
  },
  {
    id: 14,
    title: 'Educational Product',
    price_sgd: '100',
    description: 'An educational product that makes learning fun',
    image_url: placeholderImageVerticallyLong,
    number_sold: 15,
    category: 'Education',
    link: 'https://www.educationalexample.com',
  },
  {
    id: 15,
    title: 'Fitness Product',
    price_sgd: '75',
    description: 'A fitness product to help you achieve your goals',
    image_url: placeholderImage,
    number_sold: 30,
    category: 'Fitness',
    link: 'https://www.fitnessexample.com',
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
        const response = await fetch('http://localhost:3000/api/prompt', {
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
