import React, { useEffect, useState } from 'react';
import axios from 'axios';

function PerfilPage() {
    const [user, setUser] = useState({
        nome: '',
        email: '',
        data_nascimento: '',
        localizacao: '',
        telefone: ''
    });

    
    useEffect(() => {
        const storedUsuarioId = localStorage.getItem('usuarioId');
        const token = localStorage.getItem('token');
    

        if (storedUsuarioId && token) {
            axios.get('http://localhost:3001/usuarios/profile', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(response => {
                setUser(response.data);
            })
            .catch(error => {
                console.error('Erro ao buscar o perfil do usuário:', error.response);
            });
        } else {
            console.error('Usuário não está logado ou ID/token não encontrado no localStorage.');
        }
    }, []);

    return (
        <div className="container mt-4">
            <h2>Perfil do Usuário</h2>
            {user.nome ? (
                <div>
                    <p><strong>Nome:</strong> {user.nome}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Data de Nascimento:</strong> {user.data_nascimento}</p>
                    <p><strong>Localização:</strong> {user.localizacao}</p>
                    <p><strong>Telefone:</strong> {user.telefone}</p>
                </div>
            ) : (
                <p>Carregando informações do perfil...</p>
            )}
        </div>
    );
}

export default PerfilPage;
