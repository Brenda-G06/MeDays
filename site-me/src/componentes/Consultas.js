import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './StyleInterno.css';

const ConsultaPage = () => {
    const [recomendacoes, setRecomendacoes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRecomendacoes = async () => {
            try {
                const token = localStorage.getItem('authToken');
                const response = await axios.get('http://localhost:3001/api/consultas/recomendacoes', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setRecomendacoes(response.data);
            } catch (error) {
                console.error('Erro ao buscar recomendações:', error);
            }
        };
        
        fetchRecomendacoes();
    }, []);

    return (
        <div className="report-container">
            <h2>Cronograma Aconselhável</h2>
            <div className="recommendations">
                {recomendacoes.length > 0 ? (
                    recomendacoes.map((rec, index) => (
                        <div key={index} className="recommendation-item">
                            <p><strong>{rec.tipo}</strong> - Frequência de {rec.frequencia}</p>
                            <button className="find-professional-button">Buscar profissional</button>
                        </div>
                    ))
                ) : (
                    <p>Nenhuma recomendação disponível.</p>
                )}
            </div>
            <button className="full-report-button" onClick={() => navigate('/report')}>RELATÓRIO COMPLETO</button>
        </div>
    );
};

export default ConsultaPage;
