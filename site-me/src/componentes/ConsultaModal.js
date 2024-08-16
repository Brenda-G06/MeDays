import React, { useState } from 'react';
import Calendar from 'react-calendar';

import './StyleInterno.css'; // Importa seus estilos personalizados
import { ptBR } from 'date-fns/locale'; // Importa a configuração do local
import ConsultaModal from './ConsultaModal'; // Importa o modal

const CalendarioPage = () => {
    const [date, setDate] = useState(new Date()); // Define o estado da data selecionada
    const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar a abertura do modal

    // Função para atualizar a data selecionada
    const handleDateChange = (newDate) => {
        setDate(newDate);
    };

    // Função para abrir o modal
    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    // Função para fechar o modal
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="calendario-container">
            <div className="calendario-port">
                <Calendar
                    onChange={handleDateChange} // Atualiza a data selecionada
                    value={date} // Data selecionada atualmente
                    locale={ptBR} // Configuração do local em português
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
