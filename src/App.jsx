import { useState, useEffect } from 'react'
import { Card } from "./components/Card";
import './App.css'

/*https://genshin.jmp.blue/characters/albedo/gacha-splash*/
/*https://genshin.jmp.blue/characters/albedo*/

function App() {
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [characters, setCharacters] = useState([]);
  const [icons, setIcons] = useState([]);
  const characterIds = [0, 20, 23, 32, 38, 46, 70, 3, 33, 42];

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

  useEffect(() => {
    fetch("https://genshin.jmp.blue/characters/all")
    .then(response => response.json())
    .then(data => {
      const selectedCharacters = characterIds.map(id => data[id]);
      setCharacters(selectedCharacters);
    })
  },[])

  useEffect(() => {
    if (characters.length > 0) {
      Promise.all(
        characters.map(character =>
          fetch(`https://genshin.jmp.blue/characters/${character.name.toLowerCase()}/gacha-splash`)
            .then(response => response.blob())
            .then(blob => {
              const imageUrl = URL.createObjectURL(blob);
              return { name: character.name, imageUrl };
            })
        )
      ).then(icons => setIcons(icons));
    }
  }, [characters]);

  return (
    <>
    <header>Memory Card</header>
    <main>
    {icons.map(icon => (
        <div key={icon.name}>
          <h3>{icon.name}</h3>
          <img src={icon.imageUrl} alt={icon.name} />
        </div>
      ))}
    </main>
    <footer>
      <div className="current">Current score: {currentScore}</div>
      <div className="best">Best score: {bestScore}</div>
    </footer>
    </>
  )
}

export default App
