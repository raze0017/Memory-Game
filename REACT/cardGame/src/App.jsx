import { useEffect, useState } from "react";
import "./App.css";
import Grid from "./components/grid";

function App() {
  const [score, setScore] = useState(0);
  const [hashmap, setHashmap] = useState({});
  const [newset, setNewset] = useState(new Set());
  const [maxVal, setmaxval] = useState(0);

  // Function to update score
  const updateScore = (flag) => {
    if (flag === 1) {
      setScore(0); // Reset score
    } else {
      setScore((temp) => temp + 1); // Increment score
    }
  };

  // Fetch Pokémon data and store in hashmap
  async function fetchPokemons() {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon/");
    const data = await response.json();
    const tempHashmap = {}; // Temporary hashmap to store fetched images

    for (let poke of data.results) {
      const pokeResponse = await fetch(poke.url);
      const pokeData = await pokeResponse.json();
      tempHashmap[pokeData.id] = pokeData.sprites.front_default;
    }

    setHashmap(tempHashmap); // Set the hashmap state after fetching all data
  }

  // Shuffle array function
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
  }

  // On mount, fetch Pokémon data
  useEffect(() => {
    fetchPokemons();
  }, []);

  // Use useEffect to handle maxVal updates when score changes
  useEffect(() => {
    if (score > maxVal) {
      setmaxval(score);
    }
  }, [score, maxVal]);

  // Check if hashmap is empty (loading state)
  if (Object.keys(hashmap).length === 0) {
    return <div>Loading...</div>; // Display loading until images are fetched
  }

  // Function called when a card is clicked
  const played = (index) => {
    if (newset.has(index)) {
      setmaxval((prevMax) => Math.max(prevMax, score)); // Update maxVal if needed
      setNewset(new Set()); // Reset the set for a new round
      updateScore(1); // Reset the score to 0
    } else {
      setNewset((prevSet) => {
        const updatedSet = new Set(prevSet);
        updatedSet.add(index);
        return updatedSet;
      }); // Add new index to set
      updateScore(0); // Increment score
    }
  };

  // Shuffle Pokémon images and select the first 8
  const keys = Object.keys(hashmap);
  const shuffledKeys = shuffleArray(keys); // Shuffle the array of keys
  const selectedKeys = shuffledKeys.slice(0, 8); // Select the first 8 shuffled keys
  const selectedImages = selectedKeys.map((key) => hashmap[key]);

  return (
    <div data-theme="mytheme">
      <header className="text-7xl pb-20">Memory Game</header>
      <div className="score justify-end">
        Current Score: {score} | Maximum Score: {maxVal}
      </div>
      <Grid images={selectedImages} rerend={played} />
    </div>
  );
}

export default App;
