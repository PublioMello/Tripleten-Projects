import React, { useState } from 'react';
import './NewsCardList.css';
import NewsCard from '../NewsCard/NewsCard';

const CARDS_PER_LOAD = 3;

function NewsCardList({
  articles,
  onSaveArticle,
  onDeleteArticle,
  isArticleSaved,
  isLoggedIn,
  isSavedPage,
}) {
  const [visibleCount, setVisibleCount] = useState(CARDS_PER_LOAD);

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + CARDS_PER_LOAD);
  };

  const visibleArticles = isSavedPage ? articles : articles.slice(0, visibleCount);
  const hasMore = !isSavedPage && visibleCount < articles.length;

  return (
    <section className="news-card-list">
      <div className="news-card-list__container">
        {!isSavedPage && (
          <h2 className="news-card-list__title">Resultados da pesquisa</h2>
        )}
        <ul className="news-card-list__grid">
          {visibleArticles.map((article, index) => (
            <li key={article.url || article._id || index}>
              <NewsCard
                article={article}
                onSaveArticle={onSaveArticle}
                onDeleteArticle={onDeleteArticle}
                isSaved={isArticleSaved ? isArticleSaved(article) : false}
                isLoggedIn={isLoggedIn}
                isSavedPage={isSavedPage}
              />
            </li>
          ))}
        </ul>
        {hasMore && (
          <button
            className="news-card-list__btn"
            type="button"
            onClick={handleShowMore}
          >
            Mostrar mais
          </button>
        )}
      </div>
    </section>
  );
}

export default NewsCardList;
