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
    <Grid className="content" container direction="row" spacing={2}>
      {products.length === 0 && (
        <div className="welcome-message">
          <img src={logo} className="placeholder" alt="logo" />
          <h2>Welcome to LostKids.</h2> 
          <h3>From TikTok, Gifts that Rock!</h3>
        </div>
      )}
      {products.map((product) => {
        return (
          <Grid item xs={6} key={product.id}>
            <ProductCard
            id={product.id}
            name={product.name}
            price={product.price}
            description={product.description}
            image={product.image}
          />
          </Grid>
        )
      })}
    </Grid>
  )
}
