import { useState } from 'react'
import './App.css'

function App() {
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  useEffect(() => {
    fetch("https://dog.ceo/api/breeds/image/random")
    .then(response => response.json())
    .then(data => setDogImage(data.message))
  },[])

  return (
    <>
    <header>Memory Card</header>
    <main>Card by index(Icon, name)</main>
    <footer>
      <div className="current">Current score: {currentScore}</div>
      <div className="best">Best score: {bestScore}</div>
    </footer>
    </>
  )
}

export default App
