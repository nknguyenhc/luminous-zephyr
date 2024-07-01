import './home.scss'
import { ContentComponent } from '../../components/content-component/content-component'
import { QueryComponent } from '../../components/query-component/query-component'
import { useProducts } from '../../hooks/useProducts'
import { useParams } from 'react-router-dom'

export function Home() {
  const { products, sendQuery } = useProducts()
  const params = useParams()
  // Gets the token from the URL
  console.log(params)
  return (
    <div className="home-container">
      <ContentComponent products={products} />
      <QueryComponent sendQuery={sendQuery} />
    </div>
  )
}
