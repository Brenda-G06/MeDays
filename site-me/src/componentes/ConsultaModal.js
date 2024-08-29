import React from 'react';

const ConsultaModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Adicionar Consulta</h2>
                <button onClick={onClose}>Fechar</button>
            </div>
        </div>
    );
};

export default ConsultaModal;
