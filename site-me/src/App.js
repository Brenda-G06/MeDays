import React, { useState, useRef, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import HomePage from './componentes/Home';
import CalendarioPage from './componentes/Calendario';
import RegistroPage from './componentes/Registro';
import ProfissionaisPage from './componentes/Profissionais';
import ConsultasPage from './componentes/Consultas';
import CadastroPage from './componentes/Registro';
import PerfilPage from './componentes/Perfil'; 
import logo from './logo/logo.png';
import QuestionarioPage from './componentes/Cadastro';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function App() {
    return (
        <Router>
            <AppContent /> 
        </Router>
    );
}

function AppContent() {
    const [userName, setUserName] = useState(null); 
    const navbarCollapseRef = useRef(null);  
    const location = useLocation(); 
    const closeNavbar = () => {
        if (navbarCollapseRef.current && navbarCollapseRef.current.classList.contains('show')) {
            navbarCollapseRef.current.classList.remove('show');
        }
    };

    useEffect(() => {
       
        closeNavbar();
    }, [location]);  

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">
                    <a className="navbar-brand" href="/">
                        <img src={logo} alt="MeDays Logo" style={{ height: '60px' }} />
                    </a>
                    <button 
                        className="navbar-toggler" 
                        type="button" 
                        data-bs-toggle="collapse" 
                        data-bs-target="#navbarNav" 
                        aria-controls="navbarNav" 
                        aria-expanded="false" 
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div 
                        className="collapse navbar-collapse" 
                        id="navbarNav" 
                        ref={navbarCollapseRef} 
                    >
                        <ul className="navbar-nav ms-auto" style={{ fontSize: '1.25rem' }}>
                            <li className="nav-item ms-3">
                                <Link className="nav-link navTittle" to="/calendario">Calendário</Link>
                            </li>
                            <li className="nav-item ms-3">
                                <Link className="nav-link navTittle" to="/profissionais">Profissionais próximos</Link>
                            </li>
                            <li className="nav-item ms-3">
                                <Link className="nav-link navTittle" to="/consultas">Consultas</Link>
                            </li>
                            {userName ? (
                                <li className="nav-item ms-3">
                                    <Link className="nav-link navTittle" to="/perfil">{userName}</Link> 
                                </li>
                            ) : (
                                <li className="nav-item ms-3">
                                    <Link className="nav-link navTittle" to="/cadastro">Cadastro</Link>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
            <main className="mt-4">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/calendario" element={<CalendarioPage />} />
                    <Route path="/registro" element={<RegistroPage setUserName={setUserName} />} /> 
                    <Route path="/profissionais" element={<ProfissionaisPage />} />
                    <Route path="/consultas" element={<ConsultasPage />} />
                    <Route path="/cadastro" element={<CadastroPage setUserName={setUserName} />} /> 
                    <Route path="/perfil" element={<PerfilPage userName={userName} />} />
                    <Route path="/questionario" element={<QuestionarioPage />} />
                </Routes>
            </main>
        </div>
    );
}

export default App;
