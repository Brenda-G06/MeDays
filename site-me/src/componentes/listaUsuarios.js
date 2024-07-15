// ListaUsuarios.js

import React, { useState } from 'react';
import axios from 'axios';

const ListaUsuarios = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [localizacao, setLocalizacao] = useState('');
  const [erro, setErro] = useState(null);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/usuarios/user', {
        nome,
        email,
        dataNascimento,
        localizacao
      });
      console.log('Usuário criado:', response.data);
      // Limpar campos do formulário após o envio bem-sucedido
      setNome('');
      setEmail('');
      setDataNascimento('');
      setLocalizacao('');
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      setErro('Erro ao criar usuário. Verifique os dados e tente novamente.');
    }
  };

  return (
    <div>
      <h2>Criar Novo Usuário</h2>
      {erro && <p>{erro}</p>}
      <form onSubmit={handleFormSubmit}>
        <label>
          Nome:
          <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
        </label>
        <br />
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <br />
        <label>
          Data de Nascimento:
          <input type="date" value={dataNascimento} onChange={(e) => setDataNascimento(e.target.value)} />
        </label>
        <br />
        <label>
          Localização:
          <input type="text" value={localizacao} onChange={(e) => setLocalizacao(e.target.value)} />
        </label>
        <br />
        <button type="submit">Criar Usuário</button>
      </form>
    </div>
  );
};

export default ListaUsuarios;
