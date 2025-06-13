import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import CardGame from './pages/CardGame'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<CardGame />} />
      </Route>
    </Routes>
  )
}

export default App