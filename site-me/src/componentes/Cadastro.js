import React, { useState } from 'react';

const Perguntas = [
    {
        question: 'Você pratica algum tipo de atividade física?',
        options: ['Sim, pratico', 'Não, não pratico'] 
    },
    {
        question: 'Você segue algum plano alimentar específico para seus objetivos?',
        options: ['Sim, sigo', 'Não, não sigo'] 
    },
    {
        question: 'Você sente algum desconforto muscular?',
        options: ['Sim', 'Não'] 
    },
    {
        question: 'Você sente algum desconforto articular?',
        options: ['Sim', 'Não'] 
    },
    {
        question: 'Você pretende praticar algum novo esporte?',
        options: ['Sim', 'Não'] 
    }
];

const perguntasCondicionais = {
    'Sim, sigo (plano alimentar)': {
        question: 'Esse plano foi montado por um profissional em nutrição?',
        options: ['Sim', 'Não']
    },
    'Sim (muscular)': {
        question: 'Em que região muscular você sente desconforto?',
        options: ['Braço', 'Perna', 'Costas', 'Outros']
    },
    'Sim (articular)': {
        question: 'Em que região articular você sente desconforto?',
        options: ['Ombro', 'Joelho', 'Quadril', 'Outros']
    },
    'Sim, pratico': {
        question: 'Que tipo de atividade física você pratica?',
        options: ['Resistência', 'Força', 'Velocidade', 'Agilidade', 'Aquáticos']
    },
    'Sim, pretendo (novo esporte)': {
        question: 'Que tipo de esporte você gostaria de praticar?',
        options: ['Futebol', 'Natação', 'Corrida', 'Ciclismo', 'Outros']
    }
};

const Questionario = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [responses, setResponses] = useState([]);
    const [showConditionalQuestion, setShowConditionalQuestion] = useState(false);
    const [conditionalQuestion, setConditionalQuestion] = useState(null);

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleNextClick = () => {
        if (selectedOption !== null) {
            const newResponses = [...responses, selectedOption];
            setResponses(newResponses);
            if (currentQuestionIndex === 1 && selectedOption === 'Sim, sigo') {
                setConditionalQuestion(perguntasCondicionais['Sim, sigo (plano alimentar)']);
                setShowConditionalQuestion(true);
            } else if (currentQuestionIndex === 2 && selectedOption === 'Sim') {
                setConditionalQuestion(perguntasCondicionais['Sim (muscular)']);
                setShowConditionalQuestion(true);
            } else if (currentQuestionIndex === 3 && selectedOption === 'Sim') {
                setConditionalQuestion(perguntasCondicionais['Sim (articular)']);
                setShowConditionalQuestion(true);
            } else if (currentQuestionIndex === 0 && selectedOption === 'Sim, pratico') {
                setConditionalQuestion(perguntasCondicionais['Sim, pratico']);
                setShowConditionalQuestion(true);
            } else if (currentQuestionIndex === 4 && selectedOption === 'Sim') {
                setConditionalQuestion(perguntasCondicionais['Sim, pretendo (novo esporte)']);
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
