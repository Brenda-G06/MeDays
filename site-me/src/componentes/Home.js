import React from 'react';
import doc from "./img/doc.png";
import { Link } from 'react-router-dom';


const HomePage = () => {
  return (
    <div className="container">
   

      <main className="mt-4">
        <div className="row">
          <div className="col-md-6">
            <div className="row md-2 mt-5"> 
              <div className="col h1Tittle">
                <h1>VIGOR</h1>
              </div>
            </div>
            <div className="row">
              <div className="col sub">
                <p>PARA TODO ESPORTISTA</p>
              </div>
            </div>
            <div className="row">
              <div className="col text-justify">
                <p>Encontre profissionais especializados e melhore seu desempenho, seja você um esportista iniciante ou avançado, responda a algumas perguntas e receba sugestões de consultas!</p>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <Link to="/cadastro">
                  <button className="btn btn-success">Cadastre-se</button>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-4">
            <div className="card border-0">
              <div className="card-body p-0">
                <img src={doc} alt="7 profissionais da saúde em volta de um grande símbolo de cruz" className="img-fluid imgDoc" />   
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer>
      
      </footer>
    </div>
  );
};

export default HomePage;
