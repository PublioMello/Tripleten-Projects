import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <p className="footer__copyright">© 2024 NewsExplorer, Powered by News API</p>
        <nav className="footer__nav" aria-label="Rodapé">
          <ul className="footer__nav-links">
            <li>
              <Link to="/" className="footer__nav-link">
                Início
              </Link>
            </li>
            <li>
              <a
                className="footer__nav-link"
                href="https://tripleten.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                TripleTen
              </a>
            </li>
          </ul>
          <ul className="footer__social-links">
            <li>
              <a
                className="footer__social-link footer__social-link_github"
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              />
            </li>
            <li>
              <a
                className="footer__social-link footer__social-link_fb"
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              />
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
