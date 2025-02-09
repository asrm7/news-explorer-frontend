import React from 'react';
import notFound from '../../images/not-found_v1.png';

function ResultError() {
  return (
    <div className="results__background">
      <img src={notFound} alt="frown" className="results__missing-image" />
      <h3 className="results__missing-title">Algo deu errado</h3>
      <p className="results__missing-text">Desculpe, algo deu errado durante a solicitação. Pode haver um problema de conexão ou o servidor pode estar inativo. Tente novamente mais tarde.</p>
    </div>
  );
}
export default ResultError;
