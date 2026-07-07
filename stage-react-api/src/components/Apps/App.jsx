import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Main from '../Main/Main';
import SavedNews from '../SavedNews/SavedNews';
import Footer from '../Footer/Footer';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import { getNews } from '../../utils/NewsApi';

const STORAGE_KEY_RESULTS = 'newsExplorer_searchResults';
const STORAGE_KEY_KEYWORD = 'newsExplorer_lastKeyword';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [savedArticles, setSavedArticles] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchError, setSearchError] = useState(false);
  const [activePopup, setActivePopup] = useState('');

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

  const handleOpenLoginPopup = () => setActivePopup('login');
  const handleOpenRegisterPopup = () => setActivePopup('register');
  const handleClosePopup = () => setActivePopup('');

  useEffect(() => {
    if (!activePopup) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') handleClosePopup();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [activePopup]);

  const handleLogin = ({ email, password }) => {
    setIsLoggedIn(true);
    setCurrentUser({ name: 'Usuário', email });
    handleClosePopup();
  };

  const handleRegister = ({ email, password, name }) => {
    setActivePopup('success');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setSavedArticles([]);
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
    setSavedArticles((prev) => [
      ...prev,
      { ...article, _id: Date.now().toString() },
    ]);
  };

  const handleDeleteArticle = (articleId) => {
    setSavedArticles((prev) => prev.filter((a) => a._id !== articleId));
  };

  const isArticleSaved = (article) =>
    savedArticles.some((a) => a.url === article.url);

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
        />
      </div>
    </BrowserRouter>
  );
}

export default App;
