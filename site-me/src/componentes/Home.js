import React from 'react';
import doc from "./img/doc.png";
import { Link } from 'react-router-dom';
import footerImg from "./img/fot.png";

const HomePage = () => {
  return (
    <div className="container-fluid">
      <main className="mt-4">
        <div className="row">
          <div className="col-md-6">
            <div className="row mt-5">
              <div className="col text-center">
                <h1 className="h1Title">VIGOR</h1>
                <p className="sub">PARA TODO ESPORTISTA</p>
                <p className="text-justify">
                  Encontre profissionais especializados e melhore seu desempenho, seja você um esportista iniciante ou avançado. Responda a algumas perguntas e receba sugestões de consultas!
                </p>
                <Link to="/questionario">
                  <button className="btn btn-success">Clique aqui!</button>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-4 d-flex justify-content-center">
            <div className="card border-0">
              <div className="card-body p-0">
                <img src={doc} alt="7 profissionais da saúde em volta de um grande símbolo de cruz" className="img-fluid imgDoc" style={{ maxWidth: '100%' }} />
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-5 justify-content-center">
          <div className="col-md-6 text-center">
            <div className="card border-0 p-3">
              <div className="card-body">
                <h5>
                  <span className="d-block">COMO</span>
                  <span>FUNCIONA?</span>
                </h5>
              </div>
            </div>
          </div>
          <div className="col-md-6 text-center">
            <div className="card border-0 p-3">
              <div className="card-body">
                <ul className="list-unstyled">
                  <li><span className="nu">1</span> Crie sua conta</li>
                  <li><span className="nu">2</span> Responda algumas perguntas</li>
                  <li><span className="nu">3</span> Receba recomendações de consultas</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="text-center mt-4">
        <img src={footerImg} alt="Imagem do rodapé" className="img-fluid footImg" style={{ maxWidth: '100%' }} />
        <p className="footer-text">Contato: (51) 980543424 | Brenda-gomes4@educar.rs.gov.br</p>
        <p>
          <Link to="/" className="linqui">Política de Privacidade</Link> |
          <Link to="/" className="linqui">Termos de Uso</Link>
        </p>
        <p className="linqui">Work illustrations by Storyset</p>
      </footer>
    </div>
  );
};

export default HomePage;
