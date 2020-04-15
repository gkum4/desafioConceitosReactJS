import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then((response) => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      "title": `Novo repositório criado em: ${Date.now()}`,
      "url": "https://github.com/gkum4/desafioConceitosReactJS",
      "techs": [
        "NodeJS",
        "JavaScript",
        "ExpressJS",
        "uuidv4"
      ]
    });
    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    const repoIndex = repositories.findIndex(repo => repo.id === id);

    if(repoIndex < 0) {
      console.log('Repository not found.');
      return;
    }

    const newArr = [...repositories];

    newArr.splice(repoIndex, 1);

    setRepositories(newArr);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repo) => (
          <li key={repo.id}>
            {repo.title}
            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;