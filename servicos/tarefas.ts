import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3002;

app.use(express.json());
app.use(cors());

interface Tarefa {
  id: number;
  descricao: string;
}

let tarefas: Tarefa[] = [];

app.get('/tarefas', (req, res) => {
  res.json(tarefas);
});

app.post('/tarefas', (req, res) => {
  const { descricao } = req.body;
  const novaTarefa: Tarefa = {
    id: tarefas.length + 1,
    descricao,
  };
  tarefas.push(novaTarefa);
  res.status(201).json(novaTarefa);
});

app.delete('/tarefas/:id', (req, res) => {
  const { id } = req.params;
  tarefas = tarefas.filter(tarefa => tarefa.id !== parseInt(id));
  res.sendStatus(204);
});

app.listen(PORT, () => {
  console.log(`Serviço de tarefas rodando na porta ${PORT}`);
});
