import './App.scss'
import { ContentComponent } from './components/content-component/content-component'
import { QueryComponent } from './components/query-component/query-component'
import { useState } from 'react'

function App() {
  const [query, setQuery] = useState('')
  return (
    <div className="main-container">
      <ContentComponent products={[]} />
      <QueryComponent query={query} setQuery={setQuery} />
    </div>
  )
}

export default App
