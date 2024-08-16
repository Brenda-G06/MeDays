import React from 'react';
import React, { useState } from 'react';
const questions = [
    {
        question: 'Qual é a sua principal condição física?',
        options: ['Dor Articular', 'Dor Muscular']
    },
    {
        question: 'Qual é a localização da dor?',
        options: ['Braço', 'Perna', 'Costas', 'Outros']
    },
    {
        question: 'Qual é a intensidade da dor?',
        options: ['Leve', 'Moderada', 'Severa']
    }
    // Adicione mais perguntas conforme necessário
];

const Questionario = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [responses, setResponses] = useState([]);

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleNextClick = () => {
        if (selectedOption !== null) {
            setResponses([...responses, selectedOption]);
            setSelectedOption(null);
            if (currentQuestionIndex < questions.length - 1) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
            } else {
                // Submete as respostas para a API
                submitResponses();
            }
        }
    };

    const submitResponses = async () => {
        try {
            await axios.post('/api/condicao', {
                usuario_id: 1, // Substitua pelo ID real do usuário
                descricao: 'Descrição da condição', // Substitua com dados reais
                tipo: 'articular', // Substitua com dados reais
                localizacao: responses[1], // Exemplo: Resposta para localização
                intensidade: responses[2] // Exemplo: Resposta para intensidade
            });
            alert('Respostas enviadas com sucesso!');
        } catch (error) {
            console.error('Erro ao enviar respostas:', error);
            alert('Erro ao enviar respostas.');
        }
    };

    return (
        <div>
            <h2>{questions[currentQuestionIndex].question}</h2>
            {questions[currentQuestionIndex].options.map((option, index) => (
                <div key={index}>
                    <input
                        type="radio"
                        id={option}
                        name="question"
                        value={option}
                        checked={selectedOption === option}
                        onChange={handleOptionChange}
                    />
                    <label htmlFor={option}>{option}</label>
                </div>
            ))}
            <button onClick={handleNextClick} disabled={selectedOption === null}>
                {currentQuestionIndex < questions.length - 1 ? 'Próximo' : 'Enviar'}
            </button>
        </div>
    );
};

export default Questionario;

