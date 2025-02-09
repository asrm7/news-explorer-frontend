import React from 'react';

const RegistrationSuccessful = ({ isOpen, onClose, redirectLink }) => (

  <section className={`popout ${isOpen ? 'popout_active' : ''}`} onClick={onClose}>

    <button className="popout__close-button" onClick={onClose} type="button" />
    <div className="popout__container">

      <h2 className="popout__container-title">Cadastro concluído com sucesso!</h2>

      <button onClick={redirectLink} type="button" className="popout__container-link">Entrar</button>
    </div>
  </section>
);

export default RegistrationSuccessful;
