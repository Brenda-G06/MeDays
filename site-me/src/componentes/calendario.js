
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Calendario.css';   
 // Seu arquivo de estilos customizados

function CalendarioPage() {
  return (
    <div className="calendar-container">
      <Calendar value={new Date()} />
      <button className="add-appointment-button">Adicionar Consulta</button>
    </div>
  );
}

export default CalendarioPage;