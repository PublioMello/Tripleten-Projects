import React, { useState } from 'react';
import './NewsCard.css';

function NewsCard({ article, onSaveArticle, onDeleteArticle, isSaved, isLoggedIn, isSavedPage }) {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleActionClick = (e) => {
    e.preventDefault();
    if (isSavedPage) {
      onDeleteArticle(article._id);
      return;
    }
    if (!isLoggedIn) {
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 2000);
      return;
    }
    onSaveArticle(article);
  };

  const formattedDate = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString('pt-BR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : '';

  return (
    <article className="news-card">
      <a
        className="news-card__link"
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Ler artigo: ${article.title}`}
      >
        <div className="news-card__image-wrapper">
          <img
            className="news-card__image"
            src={article.urlToImage || '/images/card-placeholder.svg'}
            alt={article.title || 'Imagem do artigo'}
            onError={(e) => {
              e.target.src = '/images/card-placeholder.svg';
            }}
          />

          {isSavedPage && article.keyword && (
            <span className="news-card__keyword">{article.keyword}</span>
          )}

          <div className="news-card__action-wrapper">
            <button
              className={`news-card__action-btn ${isSavedPage ? 'news-card__action-btn_delete' : ''} ${!isSavedPage && isSaved ? 'news-card__action-btn_saved' : ''}`}
              type="button"
              onClick={handleActionClick}
              aria-label={
                isSavedPage
                  ? 'Remover artigo'
                  : isSaved
                  ? 'Artigo salvo'
                  : 'Salvar artigo'
              }
            />
            {showTooltip && (
              <span className="news-card__tooltip">Entre para salvar artigos</span>
            )}
          </div>
        </div>

        <div className="news-card__info">
          <time className="news-card__date">{formattedDate}</time>
          <h3 className="news-card__title">{article.title}</h3>
          <p className="news-card__text">{article.description}</p>
          <p className="news-card__source">
            {article.source?.name || article.source || ''}
          </p>
        </div>
      </a>
    </article>
  );
}

export default NewsCard;
