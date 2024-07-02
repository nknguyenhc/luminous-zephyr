import './home.scss'
import { ContentComponent } from '../../components/content-component/content-component'
import { QueryComponent } from '../../components/query-component/query-component'
import { useProducts } from '../../hooks/useProducts'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useAuth } from '../../context/auth-context'

export function Home() {
  const { products, sendQuery } = useProducts()
  const params = useParams()
  const user = useAuth()

  useEffect(() => {
    const token = params.token || user!.token
    user?.authenticate(token!)
  }, [params.token, user])
  return (
    <div className="home-container">
      <ContentComponent products={products} />
      <QueryComponent sendQuery={sendQuery} />
    </div>
  )
}
