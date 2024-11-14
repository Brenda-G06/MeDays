import React from 'react';
import { useNavigate } from 'react-router-dom';
import './StyleInterno.css';

const ConsultaPage = () => {
    const navigate = useNavigate();
    
    
    const recomendacoes = [
         
    ];

    return (
        <div className="report-container">
            <h2>Cronograma Aconselhável</h2>
            <div className="recommendations">
                {recomendacoes.map((rec, index) => (
                    <div key={index} className="recommendation-item">
                        <p><strong>{rec.tipo}</strong> - Frequência de {rec.frequencia}</p>
                        <button className="find-professional-button">Buscar profissional</button>
                    </div>
                ))}
            </div>
            <button className="full-report-button" onClick={() => navigate('/report')}>RELATÓRIO COMPLETO</button>
        </div>
    );
};

export default ConsultaPage;
