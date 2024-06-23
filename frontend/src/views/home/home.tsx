import './home.scss'
import { ContentComponent } from '../../components/content-component/content-component'
import { QueryComponent } from '../../components/query-component/query-component'
import { useProducts } from '../../hooks/useProducts'

export function Home() {
  const { products, sendQuery } = useProducts()

  return (
    <div className="home-container">
      <ContentComponent products={products} />
      <QueryComponent sendQuery={sendQuery} />
    </div>
  )
}
