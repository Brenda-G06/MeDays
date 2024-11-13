import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DocsCadastro from './img/Doctors-bro.png'; 

function UserForm({ setUserName }) {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [localizacao, setLocalizacao] = useState('');
    const [senha, setSenha] = useState('');
    const [telefone, setTelefone] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [showLogin, setShowLogin] = useState(false);
    const [loginEmailOrPhone, setLoginEmailOrPhone] = useState('');
    const [loginSenha, setLoginSenha] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const storedUserName = localStorage.getItem('userName');
        if (storedUserName) {
            setUserName(storedUserName);
            navigate('/'); 
        }
    }, [setUserName, navigate]);

    const handleSubmitCadastro = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/usuarios/user', {
            nome, email, data_nascimento: dataNascimento, localizacao, senha, telefone,
        })
        .then(response => {
            const { token, id } = response.data;
            setMessage('Usuário criado com sucesso!');
            
            setUserName(nome);
            
            // Armazenar o ID e o token no localStorage
            localStorage.setItem('userName', nome);
            localStorage.setItem('authToken', token); // Altere 'token' para 'authToken'
            localStorage.setItem('usuarioId', id);
    
            // Limpar campos de entrada
            setNome(''); 
            setEmail(''); 
            setDataNascimento(''); 
            setLocalizacao(''); 
            setSenha(''); 
            setTelefone('');
    
            navigate('/'); // Redirecionar para a página inicial ou perfil
        })
        .catch(error => {
            setError('Erro ao criar usuário.');
            console.error('Erro ao criar usuário:', error);
        });
    };

    
    const handleLogin = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/api/usuarios/login', {
            emailOrPhone: loginEmailOrPhone, senha: loginSenha,
        })
        .then(response => {
            const { nome, token, id } = response.data; // Adicione 'token' e 'id'
            setUserName(nome);
    
            // Armazenar o ID e o token no localStorage
            localStorage.setItem('userName', nome);
            localStorage.setItem('authToken', token); // Armazena o token de autenticação
            localStorage.setItem('usuarioId', id);
    
            navigate('/'); // Redirecionar para a página inicial ou perfil
        })
        .catch(error => {
            if (error.response && error.response.status === 401) {
                setError('Credenciais inválidas. Tente novamente.');
            } else if (error.response && error.response.status === 404) {
                setError('Usuário não encontrado.');
            } else {
                setError('Erro ao fazer login. Tente novamente mais tarde.');
            }
            console.error('Erro ao fazer login:', error);
        });
    };

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-md-6">
                    <div className="login-box">
                        {!showLogin ? (
                            <>
                                <h2>Cadastro</h2>
                                <form onSubmit={handleSubmitCadastro}>
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
                                    <label>
                                        Telefone:
                                        <input type="text" value={telefone} onChange={e => setTelefone(e.target.value)} />
                                    </label>
                                    <button type="submit">Criar Usuário</button>
                                </form>
                                {message && <p>{message}</p>}
                                {error && <p style={{ color: 'red' }}>{error}</p>}
                                <div className="mt-3">
                                    <p>Já tem conta? <button onClick={() => setShowLogin(true)}>Faça login</button></p>
                                </div>
                            </>
                        ) : (
                            <>
                                <h2>Login</h2>
                                <form onSubmit={handleLogin}>
                                    <label>
                                        Email ou Telefone:
                                        <input type="text" value={loginEmailOrPhone} onChange={e => setLoginEmailOrPhone(e.target.value)} required />
                                    </label>
                                    <label>
                                        Senha:
                                        <input type="password" value={loginSenha} onChange={e => setLoginSenha(e.target.value)} required />
                                    </label>
                                    <button type="submit">Fazer Login</button>
                                </form>
                                {error && <p style={{ color: 'red' }}>{error}</p>}
                                <div className="mt-3">
                                    <p>Não tem conta? <button onClick={() => setShowLogin(false)}>Cadastre-se</button></p>
                                </div>
                            </>
                        )}
                    </div>
                </div>
                <div className="col-md-6">
                    <img src={DocsCadastro} alt="Cadastro" className="img-fluid" />
                </div>
            </div>
        </div>
    );
}

export default UserForm;

