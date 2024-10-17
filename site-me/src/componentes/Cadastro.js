import React, { useState } from 'react';


const Perguntas = [
    {
        question: 'Você pratica algum tipo de atividade física?',
        options: ['Sim, pratico', 'Não, não pratico']
    },
    {
        question: 'Com que frequência você pratica atividades físicas?',
        options: ['Diariamente', '3-4 vezes por semana', '1-2 vezes por semana', 'Raramente']
    },
    {
        question: 'Você segue algum plano alimentar específico para seus objetivos?',
        options: ['Sim, sigo', 'Não, não sigo']
    },
    {
        question: 'Você toma suplementos alimentares?',
        options: ['Sim', 'Não']
    },
    {
        question: 'Você já teve alguma lesão relacionada à prática de esportes?',
        options: ['Sim', 'Não']
    },
    {
        question: 'Você costuma fazer aquecimento antes de praticar esportes?',
        options: ['Sempre', 'Às vezes', 'Nunca']
    },
    {
        question: 'Você sente cansaço ou fadiga excessiva após a prática de esportes?',
        options: ['Sim', 'Não']
    },
    {
        question: 'Você sente dores ou desconfortos após as atividades físicas?',
        options: ['Sim', 'Não']
    },
    {
        question: 'Você sente que a pressão competitiva afeta seu desempenho esportivo?',
        options: ['Sim', 'Não', 'Às vezes']
    },
    {
        question: 'Com que frequência você sente necessidade de acompanhamento psicológico devido ao estresse esportivo?',
        options: ['Frequentemente', 'Ocasionalmente', 'Raramente', 'Nunca']
    },
    {
        question: 'Você já realizou avaliação hormonal para otimizar sua performance esportiva?',
        options: ['Sim', 'Não']
    },
    {
        question: 'Você percebe mudanças significativas no seu peso ou desempenho sem motivo aparente?',
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
    },
    'Sim (lesão)': {
        question: 'Qual foi a lesão?',
        options: ['Entorse', 'Luxação', 'Fratura', 'Outros']
    },
    'Sim (dores)': {
        question: 'Quais dores ou desconfortos você sente e qual a intensidade?',
        options: ['Leve', 'Moderada', 'Intensa']
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

    const submitResponses = (responses) => {
        console.log('Responses submitted:', responses);
        // Add the logic to send responses to your server or process them.
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
