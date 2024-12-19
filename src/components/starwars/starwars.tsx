import { useEffect, useState } from "react";

interface Character {
  name: string;
}

// ---------- API URL ---------- //
// https://swapi.py4e.com/

export default function Starwars() {
  const [characters, setCharacters] = useState<Character[]>([]);

  useEffect(() => {
    const fetchCharacters = async () => {
      const ids = [1, 2, 3];
      const promises = ids.map((id) =>
        fetch(`https://swapi.py4e.com/api/people/${id}`).then((res) =>
          res.json()
        )
      );
      const results = await Promise.all(promises);
      setCharacters(results);
    };
    fetchCharacters();
  }, []);

  return (
    <div className="starwars-wrapper">
      <h2>StarWars Charaktere</h2>
      <ul>
        {characters.map((character) => (
          <li key={character.name}>{character.name}</li>
        ))}
      </ul>
    </div>
  );
}
