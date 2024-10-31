import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Questionario = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [responses, setResponses] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:3001/questionario/perguntas}`)
            .then(response => {
                const questionsWithResponses = response.data.map(q => ({
                    ...q,
                    answer: q.resposta || null
                }));
                setQuestions(questionsWithResponses);
            })
            .catch(error => {
                console.error('Erro ao carregar perguntas e respostas:', error);
            });
    });

    
    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    
    const handleNextClick = () => {
        if (selectedOption !== null) {
            const updatedResponses = [...responses];
            updatedResponses[currentQuestionIndex] = selectedOption;
            setResponses(updatedResponses);

            if (currentQuestionIndex < questions.length - 1) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
                setSelectedOption(questions[currentQuestionIndex + 1].answer || null);
            } else {
                axios.post('http://localhost:3001/questionario/respostas', {
                   
                    respostas: updatedResponses.map((answer, index) => ({
                        questionId: questions[index].pergunta_id,
                        answer
                    }))
                })
                .then(() => {
                    console.log('Respostas enviadas com sucesso');
                })
                .catch(error => {
                    console.error('Erro ao enviar respostas:', error);
                });
            }
        }
    };

    return (
        <div>
            {questions.length === 0 ? (
                <p>Carregando perguntas...</p>
            ) : (
                <>
                    <h2>{questions[currentQuestionIndex].pergunta}</h2>
                    <div>
                        {['Sim', 'Não'].map((option, index) => (
                            <label key={index}>
                                <input
                                    type="radio"
                                    value={option}
                                    checked={selectedOption === option}
                                    onChange={handleOptionChange}
                                />
                                {option}
                            </label>
                        ))}
                    </div>
                    <button onClick={handleNextClick}>Próxima</button>
                </>
            )}
        </div>
    );
};

export default Questionario;
