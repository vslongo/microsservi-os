import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [tarefas, setTarefas] = useState([]);
  const [descricao, setDescricao] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3002/tarefas')
      .then(response => {
        setTarefas(response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar tarefas:', error);
      });
  }, []);

  const handleAdicionarTarefa = () => {
    axios.post('http://localhost:3002/tarefas', { descricao })
      .then(response => {
        setTarefas([...tarefas, response.data]);
        setDescricao('');
      })
      .catch(error => {
        console.error('Erro ao adicionar tarefa:', error);
      });
  };

  const handleExcluirTarefa = (id) => {
    axios.delete(`http://localhost:3002/tarefas/${id}`)
      .then(() => {
        setTarefas(tarefas.filter(tarefa => tarefa.id !== id));
      })
      .catch(error => {
        console.error('Erro ao excluir tarefa:', error);
      });
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>Lista de Tarefas</h1>
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          placeholder="Adicionar uma nova tarefa"
          style={{ width: '100%', padding: '10px', fontSize: '16px' }}
        />
      </div>
      <button onClick={handleAdicionarTarefa} style={{ background: '#007bff', color: '#fff', border: 'none', padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>Adicionar Tarefa</button>
      <ul style={{ listStyleType: 'none', padding: '0', marginTop: '20px' }}>
        {tarefas.map(tarefa => (
          <li key={tarefa.id} style={{ padding: '10px', borderBottom: '1px solid #ccc', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ flex: '1' }}>{tarefa.descricao}</span>
            <button onClick={() => handleExcluirTarefa(tarefa.id)} style={{ background: 'red', color: '#fff', border: 'none', padding: '5px 10px', fontSize: '14px', cursor: 'pointer' }}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
