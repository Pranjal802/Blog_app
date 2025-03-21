import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  console.log(import.meta.env.VITE_APPWRITE_URL);

  return (

    <>
      <div><h1>Blog App</h1></div>
    </>
  )
}

export default App
