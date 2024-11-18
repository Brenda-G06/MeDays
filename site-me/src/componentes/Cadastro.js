import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import './StyleInterno.css';

const Questionario = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        
        const token = localStorage.getItem('authToken');
        if (token) {
            setIsAuthenticated(true);
            loadQuestions();
        } else {
            setIsAuthenticated(false);
        }
    }, []);

    const loadQuestions = () => {
        axios.get(`http://localhost:3001/questionario/perguntas`)
            .then(response => {
                setQuestions(response.data);
            })
            .catch(error => {
                console.error('Erro ao carregar perguntas:', error);
            });
    };

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
    };

    const handleNextClick = () => {
        if (selectedOption !== null) {
   

         
            if (currentQuestionIndex < questions.length - 1) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
                setSelectedOption(null);
            } else {
                
                navigate('/consulta');
            }
        }
    };

    const handleRedirectToSignup = () => {
        navigate('/cadastro'); 
    };

    return (
        <div className="screen-container">
            {isAuthenticated ? (
                <div className="question-box">
                    {questions.length > 0 && (
                        <>
                            <h2 className="question-text">{questions[currentQuestionIndex].pergunta}</h2>
                            <div className="options-container">
                                {questions[currentQuestionIndex].opcoes.map((option, index) => (
                                    <div
                                        key={index}
                                        className={`option-button ${selectedOption === option ? 'selected' : ''}`}
                                        onClick={() => handleOptionSelect(option)}
                                    >
                                        {option}
                                    </div>
                                ))}
                            </div>
                            <button className="next-button" onClick={handleNextClick}>Prosseguir</button>
                        </>
                    )}
                </div>
            ) : (
                <div className="not-logged-in">
                    <h2>Você precisa estar logado para acessar o questionário.</h2>
                    <button className="signup-button" onClick={handleRedirectToSignup}>Ir para Cadastro</button>
                </div>
            )}
        </div>
    );
};

export default Questionario;
