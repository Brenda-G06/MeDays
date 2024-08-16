import React, { useState } from 'react';
import Calendar from 'react-calendar';

import './StyleInterno.css'; 
import { ptBR } from 'date-fns/locale'; 
import ConsultaModal from './ConsultaModal'; 

const CalendarioPage = () => {
    const [date, setDate] = useState(new Date()); 
    const [isModalOpen, setIsModalOpen] = useState(false); 

   
    const handleDateChange = (newDate) => {
        setDate(newDate);
    };

    
    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

   
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="calendario-container">
            <div className="calendario-port">
                <Calendar
                    onChange={handleDateChange} 
                    value={date} 
                    locale={ptBR} 
                />
            </div>
            <button className="add-appointment-button" onClick={handleOpenModal}>
                Adicionar Consulta
            </button>
            <ConsultaModal isOpen={isModalOpen} onClose={handleCloseModal} />
        </div>
    );
};

export default CalendarioPage;
