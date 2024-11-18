import React from 'react';
import doc from "./img/online.png";
import backgroundImg from "./img/back.png";
import './StyleInterno.css';

const ProfissionaisPage = () => {
  return (
    <div className="container mt-5 text-center">
      <h1 className="display-4 fw-bold profissional">Encontre seu profissional ideal</h1>

      <div className="row">
        <div className="col-md-12">
          <img
            className="img-fluid mx-auto d-block imgOnline"
            alt="Uma profissional da saúde saindo do celular falando com um paciente"
            src={doc}
          />
        </div>
      </div>

      <div className="search-bar-container">
        <input
          type="text"
          className="search-bar"
          placeholder="Pesquisar por profissionais da saúde..."
        />
      </div>

      <div className="row justify-content-center image-container">
        <div className="col-md-10">
          <img
            className="img-fluid mx-auto d-block imgBackground"
            alt="Imagem de fundo"
            src={backgroundImg}
          />
        </div>
      </div>


      <div className="mt-5 p-4 bg-light rounded combat-fake-news">
        <h2 className="fw-bold">Como Combater Fake News na Área da Saúde</h2>
        <p className="lead">
          Em um mundo repleto de informações, é essencial saber distinguir o que é verdadeiro do que é falso. 
          Aqui estão algumas dicas para ajudar você a identificar e evitar notícias falsas sobre saúde:
        </p>
        <ul className="text-start">
          <li>🔎 <strong>Verifique a fonte:</strong> Sempre confira se a notícia vem de uma fonte confiável, como sites oficiais, hospitais, ou órgãos governamentais de saúde.</li>
          <li>📅 <strong>Cheque a data:</strong> Notícias antigas podem circular como se fossem recentes, mas podem estar desatualizadas.</li>
          <li>📰 <strong>Desconfie de manchetes sensacionalistas:</strong> Títulos chamativos podem ser enganadores. Leia o conteúdo completo antes de acreditar.</li>
          <li>🔗 <strong>Use sites de verificação:</strong> Sites como <a href="https://www.boatos.org" target="_blank" rel="noopener noreferrer">Boatos.org</a> e <a href="https://www.fatooufake.com" target="_blank" rel="noopener noreferrer">Fato ou Fake</a> ajudam a verificar a veracidade das informações.</li>
          <li>💬 <strong>Consulte profissionais de saúde:</strong> Em caso de dúvida, pergunte a um profissional de saúde qualificado para verificar a informação.</li>
        </ul>
        <p className="text-muted">Manter-se informado é essencial, mas certifique-se de que suas fontes são confiáveis.</p>
      </div>
    </div>
  );
};

export default ProfissionaisPage;
