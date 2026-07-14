import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Main from '../Main/Main';
import SavedNews from '../SavedNews/SavedNews';
import Footer from '../Footer/Footer';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import { getNews } from '../../utils/NewsApi';
import {
  register,
  login,
  checkToken,
  logout,
  getSavedArticles,
  saveArticle,
  deleteArticle,
} from '../../utils/api';

const STORAGE_KEY_RESULTS = 'newsExplorer_searchResults';
const STORAGE_KEY_KEYWORD = 'newsExplorer_lastKeyword';

function toArticlePayload(article) {
  return {
    keyword: article.keyword,
    title: article.title,
    text: article.description,
    date: article.publishedAt,
    source: article.source?.name || article.source || '',
    link: article.url,
    image: article.urlToImage,
  };
}

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [savedArticles, setSavedArticles] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchError, setSearchError] = useState(false);
  const [activePopup, setActivePopup] = useState('');
  const [authError, setAuthError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    try {
      const storedResults = localStorage.getItem(STORAGE_KEY_RESULTS);
      if (storedResults) {
        setSearchResults(JSON.parse(storedResults));
        setHasSearched(true);
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY_RESULTS);
      localStorage.removeItem(STORAGE_KEY_KEYWORD);
    }
  }, []);

  useEffect(() => {
    checkToken()
      .then((user) => {
        setIsLoggedIn(true);
        setCurrentUser(user);
        return getSavedArticles();
      })
      .then((articles) => setSavedArticles(articles || []))
      .catch(() => {});
  }, []);

  const handleOpenLoginPopup = () => {
    setAuthError('');
    setActivePopup('login');
  };
  const handleOpenRegisterPopup = () => {
    setAuthError('');
    setActivePopup('register');
  };
  const handleClosePopup = () => {
    setAuthError('');
    setActivePopup('');
  };

  useEffect(() => {
    if (!activePopup) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') handleClosePopup();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [activePopup]);

  const handleLogin = ({ email, password }) => {
    setAuthError('');
    setIsSubmitting(true);
    login({ email, password })
      .then((user) => {
        setIsLoggedIn(true);
        setCurrentUser(user);
        setActivePopup('');
        return getSavedArticles();
      })
      .then((articles) => setSavedArticles(articles || []))
      .catch((err) => setAuthError(err.message || 'E-mail ou senha incorretos.'))
      .finally(() => setIsSubmitting(false));
  };

  const handleRegister = ({ email, password, name }) => {
    setAuthError('');
    setIsSubmitting(true);
    register({ email, password, name })
      .then(() => setActivePopup('success'))
      .catch((err) => setAuthError(err.message || 'Não foi possível concluir o registro.'))
      .finally(() => setIsSubmitting(false));
  };

  const handleLogout = () => {
    logout().finally(() => {
      setIsLoggedIn(false);
      setCurrentUser(null);
      setSavedArticles([]);
    });
  };

  const handleSearch = (keyword) => {
    setIsLoading(true);
    setHasSearched(false);
    setSearchResults([]);
    setSearchError(false);

    getNews(keyword)
      .then((data) => {
        const articles = (data.articles || []).map((article) => ({
          ...article,
          keyword,
        }));
        setSearchResults(articles);
        setHasSearched(true);
        localStorage.setItem(STORAGE_KEY_RESULTS, JSON.stringify(articles));
        localStorage.setItem(STORAGE_KEY_KEYWORD, keyword);
      })
      .catch(() => {
        setSearchError(true);
        setHasSearched(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleSaveArticle = (article) => {
    if (!isLoggedIn) {
      handleOpenLoginPopup();
      return;
    }
    saveArticle(toArticlePayload(article))
      .then((saved) => setSavedArticles((prev) => [...prev, saved]))
      .catch((err) => console.error('Não foi possível salvar o artigo:', err.message));
  };

  const handleDeleteArticle = (articleId) => {
    deleteArticle(articleId)
      .then(() => setSavedArticles((prev) => prev.filter((a) => a._id !== articleId)))
      .catch((err) => console.error('Não foi possível remover o artigo:', err.message));
  };

  const isArticleSaved = (article) =>
    savedArticles.some((a) => a.link === article.url);

  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route
            path="/"
            element={
              <Main
                isLoggedIn={isLoggedIn}
                currentUser={currentUser}
                searchResults={searchResults}
                isLoading={isLoading}
                hasSearched={hasSearched}
                isError={searchError}
                onSearch={handleSearch}
                onSaveArticle={handleSaveArticle}
                isArticleSaved={isArticleSaved}
                onLoginClick={handleOpenLoginPopup}
                onLogout={handleLogout}
              />
            }
          />
          <Route
            path="/saved-news"
            element={
              <SavedNews
                savedArticles={savedArticles}
                isLoggedIn={isLoggedIn}
                currentUser={currentUser}
                onDeleteArticle={handleDeleteArticle}
                onLoginClick={handleOpenLoginPopup}
                onLogout={handleLogout}
              />
            }
          />
        </Routes>
        <Footer />
        <PopupWithForm
          activePopup={activePopup}
          onClose={handleClosePopup}
          onLogin={handleLogin}
          onRegister={handleRegister}
          onSwitchToRegister={handleOpenRegisterPopup}
          onSwitchToLogin={handleOpenLoginPopup}
          serverError={authError}
          isSubmitting={isSubmitting}
        />
      </div>
    </BrowserRouter>
  );
}

export default App;
