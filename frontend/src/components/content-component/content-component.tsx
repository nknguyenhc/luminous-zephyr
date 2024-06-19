import './content-component.scss'
import { Product } from '../../models/response-models'
import logo from '../../logo.svg'

interface ContentProps {
  products: Product[]
}

export function ContentComponent({ products }: ContentProps) {
  return (
    <div className="content">
      {products.length === 0 && (
        <img src={logo} className="placeholder" alt="logo" />
      )}
      {products.map((product) => {
        return (
          <div key={product.id}>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
          </div>
        )
      })}
    </div>
  )
}
