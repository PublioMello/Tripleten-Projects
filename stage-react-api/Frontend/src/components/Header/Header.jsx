import React from 'react';
import './Header.css';
import Navigation from '../Navigation/Navigation';
import SearchForm from '../SearchForm/SearchForm';

function Header({ isLoggedIn, currentUser, onLoginClick, onLogout, onSearch, isDark }) {
  return (
    <header className="header">
      <div className={`header__nav-bar ${isDark ? 'header__nav-bar_over-hero' : 'header__nav-bar_light'}`}>
        <div className="header__container">
          <Navigation
            isLoggedIn={isLoggedIn}
            currentUser={currentUser}
            onLoginClick={onLoginClick}
            onLogout={onLogout}
            isDark={false}
          />
        </div>
      </div>

      {isDark && (
        <div className="header__hero">
          <div className="header__container">
            <div className="header__content">
              <h1 className="header__title">O que está acontecendo no mundo?</h1>
              <p className="header__subtitle">
                Encontre as últimas notícias sobre qualquer tópico e salve-as na sua conta pessoal.
              </p>
              <SearchForm onSearch={onSearch} />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
