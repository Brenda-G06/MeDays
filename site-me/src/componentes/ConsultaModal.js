import React, { useState, useEffect } from 'react';

const ConsultaModal = ({ isOpen, onClose, onSave, selectedDate, usuarioId }) => {
    const [formData, setFormData] = useState({
        usuario_id: usuarioId || '', 
        data: selectedDate || '',
        descricao: ''
    });


    useEffect(() => {
        setFormData(prevData => ({ ...prevData, usuario_id: usuarioId }));
    }, [usuarioId]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData); 
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Adicionar Consulta</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="date"
                        name="data"
                        value={formData.data} 
                        onChange={handleChange}
                        required
                    />
                    <textarea
                        name="descricao"
                        placeholder="Descrição da consulta"
                        value={formData.descricao}
                        onChange={handleChange}
                        required
                    />
                    <button type="submit">Salvar</button>
                    <button type="button" onClick={onClose}>Fechar</button>
                </form>
            </div>
        </div>
    );
};

export default ConsultaModal;
