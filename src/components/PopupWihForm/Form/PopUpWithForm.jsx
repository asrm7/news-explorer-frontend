import React from "react";

const PopUpWithForm = ({
  onClose,
  isOpen,
  title,
  valid,
  buttonText,
  toggle,
  link,
  children,
  handleSubmit,
}) => {
  const isDisabled = () => !valid;
  return (
    <section
      onClick={onClose}
      className={`popout ${isOpen ? "popout_active" : ""}`}
    >
      <button
        className="popout__close-button"
        aria-label="close modal"
        data-close
        type="button"
        onClick={onClose}
      />

      <form onSubmit={handleSubmit} className="form">
        <h2 className="form__title">{title}</h2>
        {children}
        <span className="form__submit-error" >
          Reservado para mensagem API
        </span>
        <button
          className={`form__button ${valid ? "" : "form__button_disabled"}`}
          type="submit"
          value={buttonText}
          disabled={isDisabled()}
        >
          {buttonText}
        </button>

        <p className="form__text">
          ou{" "}
          <button type="button" className="form__link" onClick={toggle}>
            {link}
          </button>
        </p>
      </form>
    </section>
  );
};

export default PopUpWithForm;
