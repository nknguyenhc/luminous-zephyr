// Type definitions for response models
// This is just a placeholder type for now until we define specific parameters returned from API call
export type Product = {
  id: number
  title: string
  description: string | null
  price_sgd: string | null
  number_sold: number
  category: string
  link: string
  image_url: string
}
