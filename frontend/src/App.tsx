import './App.scss'
import { ContentComponent } from './components/contentComponent/contentComponent'
import { QueryComponent } from './components/queryComponent/queryComponent'
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
