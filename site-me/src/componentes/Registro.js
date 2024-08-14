// src/components/UserForm.js
import React, { useState } from 'react';
import axios from 'axios';

function UserForm() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [localizacao, setLocalizacao] = useState('');
    const [senha, setSenha] = useState(''); // Estado para senha
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('http://localhost:3001/api/user', {
            nome,
            email,
            data_nascimento: dataNascimento,
            localizacao,
            senha // Inclua a senha na solicitação
        })
        .then(response => {
            setMessage('Usuário criado com sucesso!');
            setNome('');
            setEmail('');
            setDataNascimento('');
            setLocalizacao('');
            setSenha(''); // Limpe o campo de senha
        })
        .catch(error => {
            setError('Erro ao criar usuário.');
            console.error('Erro ao criar usuário:', error);
        });
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Nome:
                    <input type="text" value={nome} onChange={e => setNome(e.target.value)} required />
                </label>
                <label>
                    Email:
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
                </label>
                <label>
                    Data de Nascimento:
                    <input type="date" value={dataNascimento} onChange={e => setDataNascimento(e.target.value)} required />
                </label>
                <label>
                    Localização:
                    <input type="text" value={localizacao} onChange={e => setLocalizacao(e.target.value)} />
                </label>
                <label>
                    Senha:
                    <input type="password" value={senha} onChange={e => setSenha(e.target.value)} required />
                </label>
                <button type="submit">Criar Usuário</button>
            </form>
            {message && <p>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}

export default UserForm;
