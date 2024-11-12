import React, { useState} from 'react';
import Calendar from 'react-calendar';
import './StyleInterno.css';
import { ptBR } from 'date-fns/locale'; 
import ConsultaModal from './ConsultaModal';

const CalendarioPage = ({usuarioId}) => {
    const [date, setDate] = useState(new Date());
    const [isModalOpen, setIsModalOpen] = useState(false);


   
    const handleDateChange = (newDate) => setDate(newDate);

    const handleSaveConsulta = async (formData) => {
        try {
            const response = await fetch('/api/adicionar-consulta', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                alert('Consulta adicionada com sucesso!');
                setIsModalOpen(false); 
            } else {
                alert(data.message || 'Erro ao adicionar consulta.');
            }
        } catch (error) {
            console.error('Erro ao salvar consulta:', error);
            alert('Erro ao salvar consulta.');
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-lg-8 col-md-10 col-sm-12">
                    <div className="calendario-port">
                        <Calendar
                            onChange={handleDateChange}
                            value={date}
                            locale={ptBR}
                            className="w-100"
                        />
                    </div>
                    <button className="btn btn-primary mt-3 botau" onClick={() => setIsModalOpen(true)}>
                        Adicionar Consulta
                    </button>
                </div>
            </div>
            {usuarioId && ( 
                <ConsultaModal 
                    isOpen={isModalOpen} 
                    onClose={() => setIsModalOpen(false)} 
                    onSave={handleSaveConsulta}
                    selectedDate={date.toISOString().split('T')[0]} 
                    usuarioId={usuarioId} 
                />
            )}
        </div>
    );
};

export default CalendarioPage;
