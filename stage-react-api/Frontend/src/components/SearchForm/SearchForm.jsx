import React, { useState } from 'react';
import './SearchForm.css';

function SearchForm({ onSearch }) {
  const [keyword, setKeyword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!keyword.trim()) {
      setError('Por favor, insira uma palavra-chave.');
      return;
    }
    setError('');
    onSearch(keyword.trim());
  };

  const handleChange = (e) => {
    setKeyword(e.target.value);
    if (error) setError('');
  };

  return (
    <form className="search-form" onSubmit={handleSubmit} noValidate>
      <div className="search-form__container">
        <input
          className={`search-form__input ${error ? 'search-form__input_error' : ''}`}
          type="text"
          placeholder="Insira um tópico"
          value={keyword}
          onChange={handleChange}
          aria-label="Pesquisar notícias"
        />
        <button className="search-form__btn" type="submit">
          Pesquisar
        </button>
      </div>
      {error && <p className="search-form__error">{error}</p>}
    </form>
  );
}

export default SearchForm;
