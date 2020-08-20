const express = require("express");
const cors = require("cors");

const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const repository = {
     id: uuid(), 
     title, 
     url, 
     techs, 
     likes: 0 
    };

  repositories.push(repository);

  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
 const { id } = request.params;
 const { url, title, techs } = request.body;

//  Busca o repositório
 const repository = repositories.find(repo=> repo.id === id);
 
 // Se não encontrar o id
 if(!repository) { 
   return response.status(400).send();
  }

// Armazena dados em um novo objeto - Evita a Mutabilidade
 const newRepo = {
  ...repository,
  id,
  url,
  title,
  techs
  };

// Retorna o repositório atualizado
 return response.json(newRepo);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const repository = repositories.find(repo=> repo.id === id);
  // Se nã oexiste o repositório, manda erro
    if(!repository) {
      return response.status(400).send();
    }


  const repositoryIndex = repositories.findIndex(repo=> repo.id === id);
  repositories.splice(repositoryIndex, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repository = repositories.find(repo => repo.id === id);

// Se não encontrar o repositório
  if(!repository) {
    return response.status(400).send();
  }

  repository.likes += 1;

  return response.json(repository);
});

module.exports = app;
