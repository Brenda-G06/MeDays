import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PerfilPage = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            const userId = localStorage.getItem('userId');
            if (!userId) {
                navigate('/cadastro');
                return;
            }

            try {
                const response = await fetch(`/api/user/${userId}`);
                const data = await response.json();
                setUser(data);
            } catch (error) {
                console.error('Erro ao buscar informações do usuário:', error);
            }
        };

        fetchUser();
    }, [navigate]);

    if (!user) return <p>Carregando...</p>;

    return (
        <div>
            <h1>Informações do Usuário</h1>
            <p>Nome: {user.nome}</p>
            <p>Email: {user.email}</p>
            <p>Telefone: {user.telefone}</p>
            <p>Localização: {user.localizacao}</p>
            
        </div>
    );
};

export default PerfilPage;