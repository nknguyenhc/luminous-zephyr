import './content-component.scss'
import { Product } from '../../models/response-models'
import logo from '../../logo.svg'
import { Grid } from '@mui/material'
import ProductCard from './product-card'

interface ContentProps {
  products: Product[]
}

export function ContentComponent({ products }: ContentProps) {
  return (
    <Grid className="content" container direction="row" spacing={1}>
      {products.length === 0 && (
        <div className="welcome-message">
          <img src={logo} className="placeholder" alt="logo" />
          <h2>Welcome to LostKids.</h2>
          <h3>From TikTok, Gifts that Rock!</h3>
        </div>
      )}
      {products.map((product) => {
        return (
          <Grid item xs={6} md={4} lg={3} key={product.id}>
            <ProductCard
              id={product.id}
              title={product.title}
              description={product.description}
              price_sgd={product.price_sgd}
              number_sold={product.number_sold}
              category={product.category}
              link={product.link}
              image_url={product.image_url}
            />
          </Grid>
        )
      })}
    </Grid>
  )
}
