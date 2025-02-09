import React, { useState } from "react";


const formattedDate = (dateString) => {
  const months = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];
  const date = new Date(dateString);
  return `${date.getDate()} de ${months[date.getMonth()]} de ${date.getFullYear()}`;
};


const Card = ({
  keyword,
  title,
  text,
  date,
  source,
  link,
  image,
  saved,
  cardId: initialCardId,
  loggedIn,
  hover,
  onSave,
  onRemove,
  buttonType, 
}) => {
  const [isSaved, setIsSaved] = useState(saved);
  const [cardId, setCardId] = useState(initialCardId);
  const [showHint, setShowHint] = useState(false); 

  const handleSaveClick = () => {
    if (!loggedIn) {
       return;
    }

    if (isSaved) {
      onRemove(cardId)
        .then(() => {
          setIsSaved(false);
          setCardId(null);
        })
        .catch((err) => console.error("Erro ao remover artigo:", err));
    } else {
      const cardData = {
        keyword,
        title,
        text,
        date,
        source,
        link,
        image,
      };

      onSave(cardData)
        .then((savedCard) => {
          setIsSaved(true);
          setCardId(savedCard._id);
        })
        .catch((err) => console.error("Erro ao salvar artigo:", err));
    }
  };

  return (
    <li className="card">
      <img src={image} alt={title} className="card__image" />
      
        <button
        type="button"
        className={
          buttonType === "save"
            ? `card__save-button ${isSaved ? "card__save-button_saved" : ""}`
            : "card__trash-button"
        }
        onClick={handleSaveClick }
        onMouseEnter={() => setShowHint(true)} 
        onMouseLeave={() => setShowHint(false)} 
      >
        {/* Adicione um ícone ou texto aqui, se necessário */}
      </button>
      {!loggedIn && showHint && ( 
        <div className="card__hover-text">
          {hover}
        </div>
      )}
        
        <div className="card__content">
        <p className="card__date">{formattedDate(date)}</p>
        <h3 className="card__title">{title}</h3>
        <p className="card__text">{text}</p>
        <p className="card__source" ><a href={link} target="_blank" rel="noreferrer" className="card__link">{source}</a></p>
      </div>
    </li>
  );
};

export default Card;
