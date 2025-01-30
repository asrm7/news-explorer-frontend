import React, { useState } from "react";
import MainBackend from "../../utils/backend";

const Card = (props) => {
  const [isVisible, setIsVisible] = useState(false);
  const [cardId, setCardId] = useState("");
  const userToken = localStorage.getItem("jwt");

  const mainApi = new MainBackend({
    baseUrl: "https://www.news-explorer.tk.students.nomoreparties.site",
    headers: {
      Authorization: `Bearer ${userToken}`,
      "content-type": "application/json",
    },
  });
  const saveHover = () => {
    if (props.loggedIn) {
      return;
    }
    setIsVisible(true);
  };

  const handleSaveClick = (e) => {
    if (props.loggedIn) {
      if (!e.target.classList.contains("card__save-button_saved")) {
        mainApi
          .saveArticles({
            keyword: props.keyword,
            title: props.title,
            text: props.text,
            date: props.date,
            source: props.source,
            link: props.image,
            image: props.image,
          })
          .then((res) => {
            setCardId(res.id);
            e.target.classList.add("card__save-button_saved");
          });
      }
      if (e.target.classList.contains("card__save-button_saved")) {
        mainApi
          .removeArticle(cardId)
          .then(() => {
            e.target.classList.remove("card__save-button_saved");
          })
          .catch((err) => console.log(err));
      }
    }
  };

  const handleRemoveClick = (e) => {
    if (props.cardId) {
      mainApi
        .removeArticle(props.cardId)
        .then((res) => {
          props.onDelete(props.cardId);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const formattedDate = () => {
    const articleDate = props.date;
    const months = [
        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];
    const noTime = articleDate.slice(0, 10);
    const date = new Date(noTime);

    const formatDate = `${date.getDate()} de ${months[date.getMonth()]} de ${date.getFullYear()}`;
    return formatDate;
};
  return (
    <li className="card">
      <button
        className={`card__save-button ${props.savedArticles ? "hidden" : ""} `}
        onMouseEnter={saveHover}
        onMouseLeave={() => setIsVisible(false)}
        onClick={handleSaveClick}
        type="button"
      />

      <button
        className={`card__trash-button ${props.savedArticles ? "" : "hidden"} `}
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onClick={handleRemoveClick}
        type="button"
      />

      <button
        className={`card__keyword-button ${props.savedArticles ? "" : "hidden"} `}
        type="button"
      >
        {props.keyword}
      </button>

      <button
        className={`card__hover-text ${isVisible ? "" : "hidden"} `}
        type="button"
      >
        {props.hover}
      </button>

      <a
        href={props.link}
        target="_blank"
        rel="noreferrer"
        className="card__link"
      >
        <img className="card__image" src={props.image} alt={props.title} />
        <p className="card__date">{formattedDate()}</p>
        <h3 className="card__title">{props.title}</h3>
        <p className="card__text">{props.text}</p>
        <p className="card__source card__source-text">{props.source}</p>
      </a>
    </li>
  );
};

export default Card;
