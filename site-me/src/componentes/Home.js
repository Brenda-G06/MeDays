import React from 'react';
const HomePage = () => {
  return (
    <div className="container">
        <header>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container">
            <a className="navbar-brand" href="/">
            MeDays
            </a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <a className="nav-link" href="#profissionais">Profissionais Próximos</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#calendarios">Calendários</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#configuracoes">Configurações</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#consultas">Consultas</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>

      <main className="mt-4">
        <div className="row">
          <div className="col-md-6">
          <div className="row md-3">
            <div className="col">
              <h1>VIGOR</h1>
            </div>
          </div>
          <div className="row mb-2">
            <div className="col">
              <p>Para todo esportista</p>
            </div>
          </div>
          <div className="row mb-2">
            <div className="col text-justify">
              <p>Consulte médicos especialistas e melhore seu desempenho, seja você um esportista iniciante ou avançado, responda a algumas perguntas e receba um cronograma para suas consultas! </p>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <button className="btn btn-success">Cadastre-se</button>
            </div>
          </div>
       
          </div>
          <div className="col-md-6 mb-4">
            <div className="card">
              <div className="card-body">
                
                
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer >
      {/* <a href="https://storyset.com/team">Team illustrations by Storyset</a> atribuicao da img  */}
      </footer>
    </div>
  );
};

export default HomePage;
