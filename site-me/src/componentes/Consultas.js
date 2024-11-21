import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './StyleInterno.css';
import './Consultas.css';

const ConsultaPage = () => {
    const [cronograma, setCronograma] = useState([]);
    const navigate = useNavigate();


    const recalcularFrequencias = async () => {
        try {
            const token = localStorage.getItem('authToken');
            const id_usuario = localStorage.getItem('usuarioId'); 

            if (!id_usuario) {
                console.error('id_usuario não encontrado no localStorage');
                return;
            }

            const response = await axios.post(
                'http://localhost:3001/questionario/recalcular-frequencias',
                { id_usuario },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

           
            setCronograma(response.data.frequencias || []);
        } catch (error) {
            console.error('Erro ao recalcular frequências:', error);
        }
    };

    useEffect(() => {
        const fetchCronograma = async () => {
            try {
                const token = localStorage.getItem('authToken');
                const response = await axios.get(
                    'http://localhost:3001/usuario/cronograma',
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                setCronograma(response.data.cronograma || []);
            } catch (error) {
                console.error('Erro ao buscar cronograma:', error);
            }
        };

        fetchCronograma();
    }, []);

    return (
        <div className="report-container">
            <h2>Cronograma Aconselhável</h2>
            <div className="recommendations">
                {cronograma.length > 0 ? (
                    cronograma.map((item, index) => (
                        <div key={index} className="recommendation-item">
                            <p>
                                <strong>{item.profissional}</strong> - Frequência de {item.frequencia}
                            </p>
                            <button className="find-professional-button">
                                Buscar profissional
                            </button>
                        </div>
                    ))
                ) : (
                    <p>Nenhuma recomendação disponível.</p>
                )}
            </div>


            <button
                className="recalcular-frequencias-button"
                onClick={recalcularFrequencias}
            >
                Recalcular Frequências
            </button>

            <button
                className="full-report-button"
                onClick={() => navigate('/report')}
            >
                RELATÓRIO COMPLETO
            </button>
        </div>
    );
};

export default ConsultaPage;
