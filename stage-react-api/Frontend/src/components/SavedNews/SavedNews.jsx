import React from 'react';
import './SavedNews.css';
import Header from '../Header/Header';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import NewsCardList from '../NewsCardList/NewsCardList';

function SavedNews({
  savedArticles,
  isLoggedIn,
  currentUser,
  onDeleteArticle,
  onLoginClick,
  onLogout,
}) {
  return (
    <main className="saved-news">
      <Header
        isDark={false}
        isLoggedIn={isLoggedIn}
        currentUser={currentUser}
        onLoginClick={onLoginClick}
        onLogout={onLogout}
      />
      <SavedNewsHeader savedArticles={savedArticles} currentUser={currentUser} />
      {savedArticles.length > 0 ? (
        <NewsCardList
          articles={savedArticles}
          onDeleteArticle={onDeleteArticle}
          isArticleSaved={() => true}
          isLoggedIn={isLoggedIn}
          isSavedPage
        />
      ) : (
        <p className="saved-news__empty">Você ainda não tem artigos salvos.</p>
      )}
    </main>
  );
}

export default SavedNews;
