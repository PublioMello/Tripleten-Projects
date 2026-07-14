import React from 'react';
import './Main.css';
import Header from '../Header/Header';
import NewsCardList from '../NewsCardList/NewsCardList';
import About from '../About/About';
import Preloader from '../Preloader/Preloader';

function Main({
  isLoggedIn,
  currentUser,
  searchResults,
  isLoading,
  hasSearched,
  isError,
  onSearch,
  onSaveArticle,
  isArticleSaved,
  onLoginClick,
  onLogout,
}) {
  const showResults = !isLoading && !isError && hasSearched && searchResults.length > 0;
  const showNothingFound = !isLoading && !isError && hasSearched && searchResults.length === 0;
  const showError = !isLoading && isError;

  return (
    <main className="main">
      <Header
        isDark
        isLoggedIn={isLoggedIn}
        currentUser={currentUser}
        onLoginClick={onLoginClick}
        onLogout={onLogout}
        onSearch={onSearch}
      />

      {isLoading && <Preloader />}

      {showError && (
        <section className="main__status">
          <svg
            className="main__status-icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 96 96"
            fill="none"
            aria-hidden="true"
          >
            <circle cx="48" cy="48" r="48" fill="#E6E8EB" />
            <path
              d="M48 32v20M48 60v4"
              stroke="#B6BCBF"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>
          <h2 className="main__status-title">Ops! Algo deu errado</h2>
          <p className="main__status-text">
            Desculpe, algo deu errado durante a solicitação. Pode haver um
            problema de conexão ou o servidor pode estar inativo. Por favor,
            tente novamente mais tarde.
          </p>
        </section>
      )}

      {showNothingFound && (
        <section className="main__status">
          <svg
            className="main__status-icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 96 96"
            fill="none"
            aria-hidden="true"
          >
            <circle cx="48" cy="48" r="48" fill="#E6E8EB" />
            <circle cx="44" cy="43" r="16" stroke="#B6BCBF" strokeWidth="3" />
            <path
              d="M55 55l12 12"
              stroke="#B6BCBF"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M38 43h12M44 37v12"
              stroke="#B6BCBF"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
          <h2 className="main__status-title">Nada encontrado</h2>
          <p className="main__status-text">
            Desculpe, mas não há artigos com as palavras que você pesquisou.
          </p>
        </section>
      )}

      {showResults && (
        <NewsCardList
          articles={searchResults}
          onSaveArticle={onSaveArticle}
          isArticleSaved={isArticleSaved}
          isLoggedIn={isLoggedIn}
          isSavedPage={false}
        />
      )}

      <About />
    </main>
  );
}

export default Main;
