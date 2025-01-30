import React from 'react';

function Preloader() {
  return (
    <div className="results__background">
      <i className="circle-preloader" />
      <p className="preloader__text">Procurando notícias...</p>
    </div>
  );
}
export default Preloader;
