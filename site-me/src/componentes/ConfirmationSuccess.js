import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ConfirmationSuccess = () => {
    const location = useLocation();
    const navigate = useNavigate();  
    const [message, setMessage] = useState('Confirmando seu e-mail...');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = new URLSearchParams(location.search).get('token');

        if (token) {
           
            fetch(`http://localhost:3001/confirm-email?token=${token}`)
                .then(response => response.json())
                .then(data => {
                    if (data.message) {
                        setMessage(data.message);
                      
                        setTimeout(() => {
                            navigate('/login');  
                        }, 2000); 
                    } else if (data.error) {
                        setMessage(data.error);
                    }
                })
                .catch(error => {
                    setMessage('Houve um erro ao confirmar seu e-mail.');
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            setMessage('Token não encontrado.');
            setLoading(false);
        }
    }, [location, navigate]);  

    if (loading) {
        return <div>Carregando...</div>;
    }

    return (
        <div>
            <h1>{message}</h1>
        </div>
    );
};

export default ConfirmationSuccess;
