import React from 'react';
import doc from "./img/doc.png";
import backgroundImg from "./img/background.png"; // Supondo que esta seja a imagem de fundo que ficará atrás

const ProfissionaisPage = () => {
  return (
    <div className="container mt-5 text-center">
      <h1 className="display-4 fw-bold">Escolha seu profissional ideal</h1>
      <div className="position-relative mt-4">
        <img src={backgroundImg} alt="Imagem de fundo" className="img-fluid w-75 position-absolute top-50 start-50 translate-middle" style={{ opacity: 0.3 }} />
        <img src={doc} alt="Profissionais" className="img-fluid w-50 position-relative" />
      </div>
    </div>
  );
};

export default ProfissionaisPage;
