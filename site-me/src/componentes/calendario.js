import React, { useState, useEffect, useCallback } from 'react';
import Calendar from 'react-calendar';
import './StyleInterno.css';
import { ptBR } from 'date-fns/locale';
import axios from 'axios';
import ConsultaModal from './ConsultaModal';

const CalendarioPage = ({ usuarioId: propUsuarioId }) => {
    const [usuarioId, setUsuarioId] = useState(propUsuarioId || localStorage.getItem('usuarioId'));
    const [date, setDate] = useState(new Date());
    const [consultas, setConsultas] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const loadConsultas = useCallback(async () => {
        if (usuarioId) {
            try {
                const response = await axios.get(`http://localhost:3001/consultas?usuarioId=${usuarioId}`);

                setConsultas(response.data);
            } catch (error) {
                console.error('Erro ao carregar consultas:', error);
            }
        }
    }, [usuarioId]);

    useEffect(() => {
       
        if (!usuarioId) {
            const storedUsuarioId = localStorage.getItem('usuarioId');
            if (storedUsuarioId) {
                setUsuarioId(storedUsuarioId);
            }
        }
        loadConsultas();
    }, [usuarioId, loadConsultas]);

    const handleDateChange = (newDate) => setDate(newDate);

    const handleSaveConsulta = async (formData) => {
        const consultaData = {
            usuario_id: usuarioId,
            data: formData.data,
            descricao: formData.descricao,
        };

        try {
            const response = await axios.post('http://localhost:3001/api/consultas', consultaData);

            if (response.status === 201) {
                alert('Consulta adicionada com sucesso!');
                setIsModalOpen(false);
                loadConsultas();
            }
        } catch (error) {
            console.error('Erro ao salvar consulta:', error);
            alert('Erro ao salvar consulta.');
        }
    };

    const renderTileContent = ({ date, view }) => {
        if (view === 'month') {
            const consultaDoDia = consultas.find(
                (consulta) => new Date(consulta.data).toDateString() === date.toDateString()
            );
            return consultaDoDia ? <div className="consulta-marker">📅</div> : null;
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-lg-8 col-md-10 col-sm-12">
                    <Calendar
                        onChange={handleDateChange}
                        value={date}
                        locale={ptBR}
                        className="w-100"
                        tileContent={renderTileContent}
                    />
                    <button
                        className="btn btn-primary mt-3"
                        onClick={() => setIsModalOpen(true)}
                    >
                        Adicionar Consulta
                    </button>
                </div>
            </div>

            <ConsultaModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveConsulta}
                selectedDate={date.toISOString().split('T')[0]}
                usuarioId={usuarioId}
            />
        </div>
    );
};

export default CalendarioPage;
