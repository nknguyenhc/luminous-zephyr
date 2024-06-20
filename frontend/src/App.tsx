import './App.scss'
import { ContentComponent } from './components/content-component/content-component'
import { QueryComponent } from './components/query-component/query-component'
import { useProducts } from './hooks/useProducts'
function App() {
  const { products, sendQuery } = useProducts()
  return (
    <div className="main-container">
      <ContentComponent products={products} />
      <QueryComponent sendQuery={sendQuery} />
    </div>
  )
}

export default App
