import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserProfile({ userName }) {
    const [userData, setUserData] = useState({
        nome: '',
        email: '',
        dataNascimento: '',
        localizacao: '',
        telefone: '',
        foto: '',
    });

    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        axios.get(`http://localhost:3001/api/usuarios/${userName}`)
            .then(response => {
                setUserData(response.data);
            })
            .catch(error => {
                if (error.response) {
                    // O servidor respondeu com um código de status diferente de 2xx
                    setError(`Erro: ${error.response.status} - ${error.response.data.error}`);
                } else if (error.request) {
                    // A requisição foi feita, mas não houve resposta
                    setError('Erro: Nenhuma resposta do servidor.');
                    console.error('Erro: Nenhuma resposta do servidor:', error.request);
                } else {
                    // Algo deu errado na configuração da requisição
                    setError(`Erro: ${error.message}`);
                    console.error('Erro:', error.message);
                }
            });
    }, [userName]);
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        axios.put(`http://localhost:3001/api/usuarios/${userName}`, userData)
            .then(response => {
                setMessage('Dados atualizados com sucesso!');
            })
            .catch(error => {
                setError('Erro ao atualizar os dados.');
                console.error('Erro ao atualizar os dados:', error);
            });
    };

    return (
        <div className="container mt-4">
            <h2>Perfil do Usuário</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Nome:
                    <input type="text" name="nome" value={userData.nome} onChange={handleChange} required />
                </label>
                <label>
                    Email:
                    <input type="email" name="email" value={userData.email} onChange={handleChange} required disabled />
                </label>
                <label>
                    Data de Nascimento:
                    <input type="date" name="dataNascimento" value={userData.dataNascimento} onChange={handleChange} required />
                </label>
                <label>
                    Localização:
                    <input type="text" name="localizacao" value={userData.localizacao} onChange={handleChange} />
                </label>
                <label>
                    Telefone:
                    <input type="text" name="telefone" value={userData.telefone} onChange={handleChange} />
                </label>
                <label>
                    Foto:
                    <input type="file" name="foto" onChange={(e) => setUserData({ ...userData, foto: e.target.files[0] })} />
                </label>
                <button type="submit">Atualizar Perfil</button>
            </form>
            {message && <p>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}

export default UserProfile;
