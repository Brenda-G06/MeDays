import React from 'react';
import doc from "./img/online.png";
import backgroundImg from "./img/back.png";
import './StyleInterno.css';

const ProfissionaisPage = () => {
  return (
    <div className="container mt-5 text-center">
      <h1 className="display-4 fw-bold">Encontre seu profissional ideal</h1>

      <div className="row">
    
        <div className="col-md-12">
          <img
            className="img-fluid mx-auto d-block imgOnline"
            alt="Uma profissional da saúde saindo do celular falando com um paciente"
            src={doc}
          />
        </div>
      </div>

      <div className="row justify-content-center">
        
        <div className="col-md-10">
          <img
            className="img-fluid mx-auto d-block imgBackground"
            alt="Imagem de fundo"
            src={backgroundImg}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfissionaisPage;
