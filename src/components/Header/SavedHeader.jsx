import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import blackOut from "../../images/blackLog.png";

const SavedHeader = ({ buttonClick }) => {
  const currentUser = useContext(CurrentUserContext);
  const [burger, setBurger] = useState(true);

  const toggleDropDown = () => {
    setBurger(!burger);
  };

  function headerButtonClick() {
    buttonClick();
    toggleDropDown();
  }
  return (
    <header
      className={`header header__saved ${burger ? "" : "header__mobile"}`}
    >
      <NavLink
        className={`header__title header__title-saved ${burger ? "" : "header__title-burger_saved"}`}
        to="/"
      >
        NewsExplorer
      </NavLink>

      <button
        onClick={toggleDropDown}
        type="button"
        className={`header__hamburger ${burger ? "header__button header__button-saved" : "button__close"}`}
      />

      <div
        id="header__links"
        className={`header__links ${burger ? "header__links-hidden" : "header__links-open"}`}
      >
        <NavLink
          className="header__links-item header__links-item_saved "
          to="/"
        >
          Início
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `header__links-item header__links-item_saved ${isActive ? "header__links-item_selected-saved" : ""}`
          }
          to="/saved-news"
        >
          Artigos Salvos
        </NavLink>

        
        <button
          className="header__links-button header__links-button_saved"
          type="button"
          onClick={headerButtonClick}
        >
          {currentUser.name}
          <img
            className="header__links-button_image"
            src={blackOut}
            alt="Logout"
          />
        </button>
      </div>
    </header>
  );
};

export default SavedHeader;
