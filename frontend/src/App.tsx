import { useState } from 'react'
import './App.css'
import { Button } from './components/ui/button'

function App() {
  const [fart, setFart] = useState(0)
  return (
    <>
      <div></div>
      <h1>Mentaltracker</h1>
      <Button onClick={() => setFart((prev) => prev + 1)}>
        Farted: {fart}
      </Button>
    </>
  )
}

export default App
