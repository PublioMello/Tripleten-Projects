import React from 'react';
import './Preloader.css';

function Preloader() {
  return (
    <section className="preloader">
      <div className="preloader__container">
        <span className="preloader__circle" />
        <p className="preloader__text">Buscando notícias...</p>
      </div>
    </section>
  );
}

export default Preloader;
