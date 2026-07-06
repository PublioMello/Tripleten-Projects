import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';

function Navigation({ isLoggedIn, currentUser, onLoginClick, onLogout, isDark }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="navigation">
      <Link
        to="/"
        className={`navigation__logo ${isDark ? 'navigation__logo_white' : 'navigation__logo_dark'}`}
      >
        NewsExplorer
      </Link>

      <button
        className={`navigation__burger ${isDark ? 'navigation__burger_white' : 'navigation__burger_dark'} ${isMenuOpen ? 'navigation__burger_active' : ''}`}
        type="button"
        aria-label="Abrir menu"
        onClick={toggleMenu}
      >
        <span />
        <span />
        <span />
      </button>

      <ul
        className={`navigation__links ${isMenuOpen ? 'navigation__links_open' : ''} ${isDark ? 'navigation__links_dark' : 'navigation__links_light'}`}
      >
        <li>
          <Link
            to="/"
            className={`navigation__link ${isDark ? 'navigation__link_white' : 'navigation__link_dark'} ${location.pathname === '/' ? 'navigation__link_active' : ''}`}
            onClick={closeMenu}
          >
            Início
          </Link>
        </li>

        {isLoggedIn && (
          <li>
            <Link
              to="/saved-news"
              className={`navigation__link ${isDark ? 'navigation__link_white' : 'navigation__link_dark'} ${location.pathname === '/saved-news' ? 'navigation__link_active' : ''}`}
              onClick={closeMenu}
            >
              Artigos salvos
            </Link>
          </li>
        )}

        <li>
          {isLoggedIn ? (
            <button
              className={`navigation__auth-btn ${isDark ? 'navigation__auth-btn_white' : 'navigation__auth-btn_dark'}`}
              type="button"
              onClick={() => {
                onLogout();
                closeMenu();
              }}
            >
              {currentUser?.name || 'Usuário'}
              <span className={`navigation__logout-icon ${isDark ? 'navigation__logout-icon_white' : ''}`} />
            </button>
          ) : (
            <button
              className={`navigation__auth-btn ${isDark ? 'navigation__auth-btn_white' : 'navigation__auth-btn_dark'}`}
              type="button"
              onClick={() => {
                onLoginClick();
                closeMenu();
              }}
            >
              Entrar
            </button>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
