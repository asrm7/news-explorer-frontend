
import React, { useLayoutEffect, useState } from 'react';
import { INITIALNEWS } from '../../utils/utils';
import Card from '../Card/Card';

const NewsCardList = ({ cards, setCards, keyword, hover, loggedIn, mainApi }) => {
  const [displayedCards, setDisplayedCards] = useState([]);
  const [count, setCount] = useState(INITIALNEWS);

  useLayoutEffect(() => {
    setDisplayedCards(cards.slice(0, count));
  }, [count, cards]);

  const handleSave = (cardData) => {
    return mainApi
      .saveArticles(cardData)
      .then((savedCard) => {
        const updatedCards = cards.map((card) =>
          card.link === cardData.link ? { ...card, saved: true, _id: savedCard._id } : card
        );
        setCards(updatedCards);
        return savedCard; 
      })
      .catch((err) => console.error("Erro ao salvar artigo:", err));
  };
  
  const handleRemove = (cardId) => {
    return mainApi
      .removeArticle(cardId)
      .then(() => {
        const updatedCards = cards.map((card) =>
          card._id === cardId ? { ...card, saved: false, _id: null } : card
        );
        setCards(updatedCards);
      })
      .catch((err) => console.error("Erro ao remover artigo:", err));
  };
  
  
  return (
    <section className="cards">
      <div className="cards__container">
        <h2 className={`cards__container_title ${cards.length === 0 ? "hidden" : ""}`}>
          Resultados encontrados
        </h2>
        <ul className="cards__container-list">
          {displayedCards.map((card, index) => (
            <Card
              key={index}
              keyword={keyword}
              title={card.title}
              text={card.description}
              date={card.publishedAt}
              source={card.source.name}
              link={card.url}
              image={card.urlToImage}
              saved={card.saved || false}
              cardId={card._id || null}
              loggedIn={loggedIn}
              hover={hover}
              onSave={handleSave}
              onRemove={handleRemove}
              buttonType="save"   
            />
          ))}
        </ul>
      </div>
      <button
        type="button"
        onClick={() => setCount((prevCount) => prevCount + 3)}
        className={`cards__btn ${cards.length > count ? "" : "hidden"}`}
      >
        Mostrar mais
      </button>
    </section>
  );
};

export default NewsCardList;
