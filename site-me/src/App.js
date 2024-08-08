import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HomePage from './componentes/Home'; // Certifique-se de que o nome e o caminho estão corretos
import Calendario from './componentes/calendario'; // Certifique-se de que o nome e o caminho estão corretos
import logo from './logo/logo.png';


function App() {
  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container">
          <a className="navbar-brand" href="/">
              <img src={logo} alt="MeDays Logo" style={{ height: '60px' }} /> 
            </a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"> </span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto" style={{ fontSize: '1.25rem' }}>
                <li className="nav-item ms-3">
                  <Link className="nav-link navTittle" to="/calendario">Calendário</Link>
                </li>
                <li className="nav-item ms-3">
                  <Link className="nav-link navTittle" to="/calendario">Profissionais próximos</Link>
                </li>
                <li className="nav-item ms-3">
                  <Link className="nav-link navTittle" to="/calendario">Configurações</Link>
                </li>
                <li className="nav-item ms-3">
                  <Link className="nav-link navTittle" to="/calendario">Consultas</Link>
                </li>
                <li className="nav-item ms-3">
                  <Link className="nav-link navTittle nav-link-login" to="/login">Login</Link> 
                </li>
  
              </ul>
            </div>
          </div>
        </nav>
        <main className="mt-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/calendario" element={<Calendario />} />
            {/* Adicione outras rotas conforme necessário */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
