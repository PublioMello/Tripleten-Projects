import React from 'react';
import './SavedNewsHeader.css';

function SavedNewsHeader({ savedArticles, currentUser }) {
  const keywords = savedArticles.reduce((acc, article) => {
    if (article.keyword && !acc.includes(article.keyword)) {
      acc.push(article.keyword);
    }
    return acc;
  }, []);

  const getKeywordsText = () => {
    if (keywords.length === 0) return null;
    if (keywords.length === 1) return keywords[0];
    if (keywords.length === 2) return `${keywords[0]} e ${keywords[1]}`;
    return `${keywords[0]}, ${keywords[1]} e outros ${keywords.length - 2}`;
  };

  const keywordsText = getKeywordsText();

  return (
    <section className="saved-news-header">
      <div className="saved-news-header__container">
        <p className="saved-news-header__label">Artigos salvos</p>
        <h2 className="saved-news-header__title">
          {currentUser?.name || 'Usuário'}, você tem{' '}
          {savedArticles.length}{' '}
          {savedArticles.length === 1 ? 'artigo salvo' : 'artigos salvos'}
        </h2>
        {keywordsText && (
          <p className="saved-news-header__keywords">
            Por palavras-chave:{' '}
            <span className="saved-news-header__keywords-bold">{keywordsText}</span>
          </p>
        )}
      </div>
    </section>
  );
}

export default SavedNewsHeader;
