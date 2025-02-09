
import React from 'react';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';

const Main = ({
  headerClick, loggedIn, search, isLoading,
}) => (
  <section className="main">
    <Header buttonClick={headerClick} loggedIn={loggedIn} />
    <section className="main__container">
      <h1 className="main__container-title">O que está acontecendo no mundo?</h1>
      <p className="main__container-subtitle">Encontre as últimas notícias sobre qualquer tema e salve elas em sua conta pessoal</p>
      <SearchForm onSubmit={search} isLoading={isLoading} />

    </section>
  </section>
);

export default Main;
