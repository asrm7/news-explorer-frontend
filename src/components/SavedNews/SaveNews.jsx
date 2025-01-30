
import React, { useContext, useEffect, useState } from 'react';
import NewsCardList from '../NewsCardList/NewsCardList';
import SavedHeader from '../Header/SavedHeader';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import MainBackend from '../../utils/backend';

const SaveNews = (props) => {
  const currentUser = useContext(CurrentUserContext);
  const userToken = localStorage.getItem('jwt');
  const [savedCards, setSavedCards] = useState([]);
  const savedLength = savedCards.length;

  const mainApi = new MainBackend({
    baseUrl: 'http://localhost:3000',
    headers: {
      
      'content-type': 'application/json',
      Authorization: `Bearer ${userToken}`,
    },
  });

  const fetchCards = () => {
    mainApi.getSavedArticles().then((res) => {
      
      setSavedCards(res.articles);
    }).catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchCards();
  }, []);

  const byKeywords = () => {
    const keywords = [];
    savedCards.forEach((card) => {
      keywords.push(`${card.keyword} `);
    });

    const sortByWord = (arr) => {
      const frequency = {};

      arr.forEach((value) => { frequency[value] = 0; });
      const uniques = arr.filter((value) => ++frequency[value] === 1);
      return uniques.sort((a, b) => frequency[b] - frequency[a]);
    };

    const keywordsList = sortByWord(keywords);
    const keywordsDisplay = keywordsList.join(', ');

    if (keywords.length <= 3) {
      return keywordsDisplay;
    }
    const keywordCut = keywordsList.slice(0, 2);
    const display = `${keywordCut.join(', ')}, and ${keywordsList.length - 2} others`;
    return display;

    
  };

  const handleChange = (cardId) => {
    
    const newCards = savedCards.filter((c) => c.id !== cardId);
    setSavedCards(newCards);
    fetchCards();
  };
  return (
    <section className="saved">
      <SavedHeader buttonClick={props.headerClick} />
      <p className="saved__title">Artigos salvos</p>
      <h1 className="saved__heading">
        {currentUser.name}
        , você tem
        {' '}
        {savedLength}
        {' '}
        artigos salvos
      </h1>
      <p className="saved__text">
        Por palavras-chave:
        <span className="saved__keywords">
          {byKeywords()}
        </span>
      </p>
      <NewsCardList onChange={handleChange} cards={savedCards} savedArticles="true" loggedIn="true" hover="Remove from saved" />

    </section>
  );
};

export default SaveNews;
