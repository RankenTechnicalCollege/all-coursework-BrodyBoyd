import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Hands On Test 3</h1>
      <div className="card">
        <p>
          Create an Api to search, add, and delete products
        </p>
      </div>

    </>
  )
}

export default App
