import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import online from "./img/online.png";
import back from "./img/back";


const ProfissionaisPage = () => {
  return (
    <div className="container text-center my-5">
      <h1 className="display-4 font-weight-bold">Escolha seu profissional ideal</h1>
      <div className="position-relative d-flex justify-content-center align-items-center mt-5">
      <div className="card-body p-0">
                <img src={online}  className="img-fluid imgOn" />   
              </div>
              <div className="card-body p-0">
                <img src={back}  className="img-fluid imgOn" />   
              </div>
      </div>
    </div>
  );
};

export default ProfissionaisPage;
