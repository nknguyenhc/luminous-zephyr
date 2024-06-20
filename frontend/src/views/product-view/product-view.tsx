import './product-view.scss'
import { ContentComponent } from '../../components/content-component/content-component'
import { QueryComponent } from '../../components/query-component/query-component'
import { useProducts } from '../../hooks/useProducts'

export function ProductView() {
  const { products, sendQuery } = useProducts()
  return (
    <div className="product-view-container">
      <ContentComponent products={products} />
      <QueryComponent sendQuery={sendQuery} />
    </div>
  )
}
