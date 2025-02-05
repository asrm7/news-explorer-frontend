import React, { useContext, useEffect, useState } from "react";
import SavedHeader from "../Header/SavedHeader";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import Card from "../Card/Card";

const SaveNews = ({ headerClick, signInDirect, mainApi, loggedIn, hover }) => {
  const currentUser = useContext(CurrentUserContext);
  const [savedCards, setSavedCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const userToken = localStorage.getItem("jwt");

  // Buscar artigos salvos ao carregar o componente
  useEffect(() => {
    if (!currentUser || !userToken) {
      console.error("Usuário não autenticado ou token ausente.");
      setIsLoading(false);
      return;
    }

    const fetchCards = async () => {
      setIsLoading(true);
      try {
        const res = await mainApi.getSavedArticles();
        setSavedCards(res || []);
      } catch (err) {
        console.error("Erro ao buscar artigos salvos:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCards();
  }, [currentUser, userToken, mainApi]);

  
  const handleRemove = (cardId) => {
    return mainApi
      .removeArticle(cardId)
      .then(() => {
        // Filtra os cartões, removendo o que foi excluído
        setSavedCards((prevCards) => prevCards.filter((card) => card._id !== cardId));
      })
      .catch((err) => console.error("Erro ao remover artigo:", err));
  };
  

  // Gerar lista de palavras-chave para exibição
  const byKeywords = () => {
    if (!savedCards || savedCards.length === 0) {
      return "Nenhuma palavra-chave disponível.";
    }

    const keywords = savedCards.map((card) => card.keyword);
    const sortByWord = (arr) => {
      const frequency = {};
      arr.forEach((value) => {
        frequency[value] = (frequency[value] || 0) + 1;
      });
      return Object.keys(frequency).sort((a, b) => frequency[b] - frequency[a]);
    };

    const keywordsList = sortByWord(keywords);
    if (keywordsList.length <= 3) {
      return keywordsList.join(", ");
    }

    const keywordCut = keywordsList.slice(0, 2);
    return `${keywordCut.join(", ")}, and ${keywordsList.length - 2} others`;
  };

  // Renderização condicional para loading ou ausência de autenticação
  if (isLoading) {
    return <p>Carregando...</p>;
  }

  if (!currentUser || !userToken) {
    return <p>Você precisa estar logado para ver seus artigos salvos.</p>;
  }

  // Renderização principal
  return (
    <section className="saved">
      <SavedHeader buttonClick={headerClick} />
      <p className="saved__title">Artigos salvos</p>
      <h1 className="saved__heading">
        {currentUser.name}, você tem {savedCards.length} artigos salvos
      </h1>
      <p className="saved__text">
        Por palavras-chave:
        <span className="saved__keywords">{byKeywords()}</span>
      </p>

      {/* Renderizar os cartões diretamente */}
      <section className="cards">
        <div className="cards__container">
          <div className="saved__cards">
            <ul className="cards__container-list">
              {savedCards.map((card, index) => (
                <Card
                  key={index}
                  keyword=""
                  title={card.title}
                  text={card.text}
                  date={card.date}
                  source={card.source}
                  link={card.url}
                  image={card.image}
                  saved={true}
                  cardId={card._id || null}
                  loggedIn={loggedIn}
                  hover={hover}
                  // onSave={handleSave}
                  onRemove={handleRemove}
                  buttonType="trash" //
                />
                
              ))}
            </ul>
          </div>
        </div>
      </section>
    </section>
  );
};

export default SaveNews;
