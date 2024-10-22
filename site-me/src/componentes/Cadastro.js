import React, { useState } from 'react';
import axios from 'axios';

const Perguntas = [
    {
        question: 'Você pratica algum tipo de atividade física?',
        options: ['Sim, pratico', 'Não, não pratico']
    },
    {
        question: 'Com que frequência você pratica atividades físicas?',
        options: ['Diariamente', '3-4 vezes por semana', '1-2 vezes por semana', 'Raramente']
    },
    // Adicione as demais perguntas...
];

const perguntasCondicionais = {
    'Sim, sigo (plano alimentar)': {
        question: 'Esse plano foi montado por um profissional em nutrição?',
        options: ['Sim', 'Não']
    },
    'Sim, pratico': {
        question: 'Que tipo de atividade física você pratica?',
        options: ['Resistência', 'Força', 'Velocidade', 'Agilidade', 'Aquáticos']
    },
    'Sim (dores)': {
        question: 'Quais dores ou desconfortos você sente e qual a intensidade?',
        options: ['Leve', 'Moderada', 'Intensa']
    },
    // Adicione demais perguntas condicionais...
};

const Questionario = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [responses, setResponses] = useState([]);
    const [showConditionalQuestion, setShowConditionalQuestion] = useState(false);
    const [conditionalQuestion, setConditionalQuestion] = useState(null);

    const submitResponses = (newResponses) => {
        const usuarioId = localStorage.getItem('usuarioId'); 

        axios.post('http://localhost:3001/api/questionario/respostas', {
            usuarioId: usuarioId,
            respostas: newResponses
        })
        .then(response => {
            console.log('Respostas enviadas com sucesso:', response.data);
        })
        .catch(error => {
            console.error('Erro ao enviar as respostas:', error);
        });
    };

   
    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };


    const handleNextClick = () => {
        if (selectedOption !== null) {
            const newResponses = [...responses, selectedOption];
            setResponses(newResponses);

   
            if (currentQuestionIndex === 2 && selectedOption === 'Sim, sigo') {
                setConditionalQuestion(perguntasCondicionais['Sim, sigo (plano alimentar)']);
                setShowConditionalQuestion(true);
            } else if (currentQuestionIndex === 7 && selectedOption === 'Sim') {
                setConditionalQuestion(perguntasCondicionais['Sim (dores)']);
                setShowConditionalQuestion(true);
            } else {
                setSelectedOption(null);
                setShowConditionalQuestion(false);

         
                if (currentQuestionIndex < Perguntas.length - 1) {
                    setCurrentQuestionIndex(currentQuestionIndex + 1);
                } else {
                    submitResponses(newResponses);  
                }
            }
        }
    };

    return (
        <div>
            {showConditionalQuestion ? (
                <>
                    <h2>{conditionalQuestion.question}</h2>
                    <div>
                        {conditionalQuestion.options.map((option, index) => (
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
            ) : (
                <>
                    <h2>{Perguntas[currentQuestionIndex].question}</h2>
                    <div>
                        {Perguntas[currentQuestionIndex].options.map((option, index) => (
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
