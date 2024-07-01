import { useState, useEffect } from 'react'
import Card from './components/Card';
import './App.css'

function App() {
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [characters, setCharacters] = useState([]);
  const [icons, setIcons] = useState([]);
  const [clicked, setClicked] = useState([]);
  const [loading, setLoading] = useState(false);

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

  useEffect(() => {
    setLoading(true);
    fetch("https://genshin.jmp.blue/characters/all")
    .then(response => response.json())
    .then(data => {
      const filteredData = data.filter(item => 
        item.nation === "Mondstadt" && item.name !== "Thoma" && item.name !== "Mika"
      );
      setCharacters(filteredData.slice(0, 10));
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
      ).then((icons) => {
        setIcons(icons);
        setLoading(false);
      });
    }
  }, [characters]);


  function handleCardClick(name) {
    const newScore = currentScore + 1;
    if (clicked.includes(name)) {
      if (newScore - 1 > bestScore) {
        setBestScore(newScore - 1);
      }
      setCurrentScore(0);
      setClicked([]);
    } else {
      setCurrentScore(newScore);
      setClicked([...clicked, name]);
    }
    shuffleArray(icons);
  }

  return (
    <>
    <header>Memory Card</header>
    <main>
        {loading ? (
          <div className="loading"></div>
        ) : (
          <div className="cards">
            {icons.map((icon) => (
              <Card key={icon.name} name={icon.name} icon={icon.imageUrl} onClick={() => handleCardClick(icon.name)} />
            ))}
          </div>
        )}
    </main>
    <footer>
      <div className="current">Current score: {currentScore}</div>
      <div className="best">Best score: {bestScore}</div>
    </footer>
    </>
  )
}

/* card onclick shuffle + count*/

export default App
