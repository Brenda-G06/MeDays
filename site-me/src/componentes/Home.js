import React from 'react';
import doc from "./img/doc.png";
import { Link } from 'react-router-dom';
import footerImg from "./img/fot.png";
const HomePage = () => {
  return (
    <div className="container">
      <main className="mt-4 ">
        <div className="row">
          <div className="col-md-6">
            <div className="row md-2 mt-5"> 
              <div className="col h1Tittle">
                <h1 className=''>VIGOR</h1>
              </div>
            </div>
            <div className="row">
              <div className="col sub">
                <p className=''>PARA TODO ESPORTISTA</p>
              </div>
            </div>
            <div className="row">
              <div className="col text-justify">
                <p>Encontre profissionais especializados e melhore seu desempenho, seja você um esportista iniciante ou avançado, responda a algumas perguntas e receba sugestões de consultas!</p>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <Link to="/questionario">
                  <button className="btn btn-success">Clique aqui!</button>
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
        <div className="row mt-5 justify-content-center">
          <div className="col-md-6 text-center">
            <div className="card border-0 p-3">
              <div className="card-body title-spacing">
                <h5>
                  <span className="d-block">COMO</span>
                  <span>FUNCIONA?</span>
                </h5>
              </div>
            </div>
          </div>
          <div className="col-md-6 text-center">
            <div className="card border-0 p-3">
              <div className="card-body number-list">
                <ul className="list-unstyled">
                  <li className='texcti'><span className="nu">1</span>Crie sua conta</li>
                  <li className='texcti'><span className="nu">2</span>Responda algumas perguntas</li>
                  <li className='texcti'><span className="nu">3</span>Receba recomendações de consultas baseadas em dados coletados de profissionais</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="text-center mt-4">
      <img src={footerImg} alt="Imagem do rodapé" className="img-fluid  justify-content-center footImg" />
      <p className="footer-text">Contato: (51) 980543424 | Brenda-gomes4@educar.rs.gov.br
        </p><p>
      <Link to="/" className='linqui'>Política de Privacidade</Link> | 
      <Link to="/" className='linqui'>Termos de Uso</Link> |
      </p>
      <p className='linqui' href="https://storyset.com/work">Work illustrations by Storyset</p>
      </footer>
    </div>
  );
};

export default HomePage;
