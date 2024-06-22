import './App.scss'
import { ContentComponent } from './components/content-component/content-component'
import { QueryComponent } from './components/query-component/query-component'
import { useProducts } from './hooks/useProducts'
import { useState } from 'react'
import LoadingSpinner from './components/content-component/loading-spinner'

function App() {
  const { products, sendQuery } = useProducts()
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <div className="main-container">
      {loading && <LoadingSpinner />} 
      <ContentComponent products={products} />
      <QueryComponent sendQuery={sendQuery} setLoading={setLoading} loading={loading}/>
      
    </div>
  )
}

export default App
