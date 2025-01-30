import React from 'react';
import notFound from '../../images/not-found_v1.png';
import './NoResults.css';

function NotFound() {
  return (
    <div className="results__background">
      <img src={notFound} alt="frown" className="results__missing-image" />
      <h3 className="results__missing-title">Nada encontrado</h3>
      <p className="results__missing-text">
        Desculpe, mas nada corresponde aos seus 
        {' '}
        <br />
        {' '}
        termos de pesquisa.
      </p>
    </div>
  );
}
export default NotFound;
