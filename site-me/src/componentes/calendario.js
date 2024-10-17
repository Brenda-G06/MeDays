import React, { useState } from 'react';
import Calendar from 'react-calendar';
import './StyleInterno.css';
import { ptBR } from 'date-fns/locale'; 
import ConsultaModal from './ConsultaModal';

const CalendarioPage = () => {
    const [date, setDate] = useState(new Date());
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleDateChange = (newDate) => setDate(newDate);

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
                    <button className="btn btn-primary mt-3" onClick={() => setIsModalOpen(true)}>
                        Adicionar Consulta
                    </button>
                </div>
            </div>
            <ConsultaModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
};

export default CalendarioPage;
