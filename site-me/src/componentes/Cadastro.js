import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './StyleInterno.css';

const Questionario = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const loadQuestions = useCallback(async () => {
        try {
            const response = await axios.get('http://localhost:3001/questionario/perguntas');
            setQuestions(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Erro ao carregar perguntas:', error.response || error.message);
            if (error.response && error.response.status === 401) {
                navigate('/login');
            } else {
                alert('Erro ao carregar o questionário. Tente novamente mais tarde.');
            }
        }
    }, [navigate]);

    useEffect(() => {
        loadQuestions();
    }, [loadQuestions]);


    const handleOptionSelect = (option) => {
        setSelectedOption(option);
    };


    const handleNextClick = async () => {
        if (selectedOption !== null) {
            const currentQuestion = questions[currentQuestionIndex];
            const id_usuario = localStorage.getItem('usuarioId');
            
            if (!id_usuario) {
                navigate('/login');
                return;
            }
    
            try {
                
                const response = await axios.post('http://localhost:3001/questionario/respostas', {
                    id_usuario,
                    id_pergunta: currentQuestion.id,
                    resposta: selectedOption,
                });
    
                const { proximaPerguntaId, info } = response.data;

                if (!proximaPerguntaId) {
                    if (info === 'Fim do questionário.') {
            
                        navigate('/consultas'); 
                    }
                    return;
                }


                const nextIndex = questions.findIndex(q => q.id === proximaPerguntaId);
                if (nextIndex !== -1) {
                    setCurrentQuestionIndex(nextIndex);
                    setSelectedOption(null);
                } else {
                    console.error('Próxima pergunta não encontrada.');
                }
            } catch (error) {
                console.error('Erro ao salvar resposta:', error);
                console.log('Erro ao salvar resposta. Tente novamente mais tarde.');
            }
        }
    };

    return (
        <div className="screen-container">
            {loading ? (
                <p>Carregando perguntas...</p>
            ) : (
                <div className="question-box">
                    {questions.length > 0 && questions[currentQuestionIndex] ? (
                        <>
                            <h2 className="question-text">{questions[currentQuestionIndex].pergunta}</h2>
                            <div className="options-container">
                                {questions[currentQuestionIndex].opcoes && questions[currentQuestionIndex].opcoes.map((option, index) => (
                                    <div
                                        key={index}
                                        className={`option-button ${selectedOption === option ? 'selected' : ''}`}
                                        onClick={() => handleOptionSelect(option)}
                                    >
                                        {option}
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <p>Carregando pergunta...</p>
                    )}

                    <button
                        className="next-button"
                        onClick={handleNextClick}
                        disabled={!selectedOption}
                    >
                        Prosseguir
                    </button>
                </div>
            )}
        </div>
    );
};

export default Questionario;
