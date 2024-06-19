import './content-component.scss'
import { Product } from '../../models/response-models'
import logo from '../../logo.svg'
import { Grid } from '@mui/material'

interface ContentProps {
  products: Product[]
}

export function ContentComponent({ products }: ContentProps) {
  return (
    <Grid className="content" container direction="row" spacing={2}>
      {products.length === 0 && (
        <img src={logo} className="placeholder" alt="logo" />
      )}
      {products.map((product) => {
        return (
          <Grid item xs={6} key={product.id}>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
          </Grid>
        )
      })}
    </Grid>
  )
}
