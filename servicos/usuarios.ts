import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(cors());

interface Usuario {
  id: number;
  nome: string;
  email: string;
}

let usuarios: Usuario[] = [];

app.post('/usuarios', (req, res) => {
  const { nome, email } = req.body;
  const novoUsuario: Usuario = {
    id: usuarios.length + 1,
    nome,
    email,
  };
  usuarios.push(novoUsuario);
  res.status(201).json(novoUsuario);
});

app.listen(PORT, () => {
  console.log(`Serviço de usuários rodando na porta ${PORT}`);
});
