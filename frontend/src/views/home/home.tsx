import './home.scss'
import { ContentComponent } from '../../components/content-component/content-component'
import { QueryComponent } from '../../components/query-component/query-component'
import { useProducts } from '../../hooks/useProducts'
import { useAuth } from '../../hooks/useAuth'

export function Home() {
  const { products, sendQuery } = useProducts()
  const { isAuthenticated } = useAuth()
  return (
    <div className="home-container">
      {isAuthenticated ? (
        <>
          <ContentComponent products={products} />
          <QueryComponent sendQuery={sendQuery} />
        </>
      ) : (
        // Display some authenticating notification
        // Possibly refactor auth into a parent component
        <span>Loading...</span>
      )}
    </div>
  )
}
