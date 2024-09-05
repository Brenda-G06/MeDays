import React, { useState } from 'react';
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

    const handleSubmitCadastro = (e) => {
        e.preventDefault();

        axios.post('http://localhost:3001/api/usuarios/user', { 
            nome,
            email,
            data_nascimento: dataNascimento,
            localizacao,
            senha,
            telefone 
        })
        .then(response => {
            setMessage('Usuário criado com sucesso!');
            setUserName(nome); 
            setNome('');
            setEmail('');
            setDataNascimento('');
            setLocalizacao('');
            setSenha('');
            setTelefone('');
            navigate('/'); 
        })
        .catch(error => {
            setError('Erro ao criar usuário.');
            console.error('Erro ao criar usuário:', error);
        });
    };

    const handleLogin = (e) => {
        e.preventDefault();

        axios.post('http://localhost:3001/api/usuarios/login', {
            emailOrPhone: loginEmailOrPhone,
            senha: loginSenha,
        })
        .then(response => {
            const { nome } = response.data;
            setUserName(nome); o
            navigate('/'); 
        })
        .catch(error => {
            setError('Erro ao fazer login.');
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
                                    <p>Já tem conta? <button className="btn btn-link p-0" onClick={() => setShowLogin(true)}>Faça login</button></p>
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
                                    <p>Não tem conta? <button className="btn btn-link p-0" onClick={() => setShowLogin(false)}>Cadastre-se</button></p>
                                </div>
                            </>
                        )}
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="image-container">
                        <img src={DocsCadastro} alt="Imagem" className="img-fluid" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserForm;
