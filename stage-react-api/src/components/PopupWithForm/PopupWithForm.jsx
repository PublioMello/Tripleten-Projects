import React, { useState, useEffect } from 'react';
import './PopupWithForm.css';

function PopupWithForm({
  activePopup,
  onClose,
  onLogin,
  onRegister,
  onSwitchToRegister,
  onSwitchToLogin,
}) {
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({ email: '', password: '', name: '' });
  const [loginErrors, setLoginErrors] = useState({});
  const [registerErrors, setRegisterErrors] = useState({});

  useEffect(() => {
    if (!activePopup) {
      setLoginData({ email: '', password: '' });
      setRegisterData({ email: '', password: '', name: '' });
      setLoginErrors({});
      setRegisterErrors({});
    }
  }, [activePopup]);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const errors = {};
    if (!validateEmail(loginData.email)) errors.email = 'E-mail inválido.';
    if (loginData.password.length < 6) errors.password = 'A senha deve ter no mínimo 6 caracteres.';
    if (Object.keys(errors).length > 0) {
      setLoginErrors(errors);
      return;
    }
    onLogin(loginData);
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    const errors = {};
    if (!validateEmail(registerData.email)) errors.email = 'E-mail inválido.';
    if (registerData.password.length < 6) errors.password = 'A senha deve ter no mínimo 6 caracteres.';
    if (!registerData.name.trim()) errors.name = 'Insira seu nome de usuário.';
    if (Object.keys(errors).length > 0) {
      setRegisterErrors(errors);
      return;
    }
    onRegister(registerData);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  if (!activePopup) return null;

  return (
    <div className="popup popup_opened" role="dialog" aria-modal="true" onClick={handleOverlayClick}>
      <div className="popup__container">
        <button
          className="popup__close-btn"
          type="button"
          aria-label="Fechar janela"
          onClick={onClose}
        />

        {activePopup === 'login' && (
          <>
            <h2 className="popup__title">Entrar</h2>
            <form className="popup__form" onSubmit={handleLoginSubmit} noValidate>
              <label className="popup__label">
                E-mail
                <input
                  className={`popup__input ${loginErrors.email ? 'popup__input_error' : ''}`}
                  type="email"
                  placeholder="Insira seu e-mail"
                  value={loginData.email}
                  onChange={(e) =>
                    setLoginData((prev) => ({ ...prev, email: e.target.value }))
                  }
                  required
                />
                {loginErrors.email && (
                  <span className="popup__error">{loginErrors.email}</span>
                )}
              </label>
              <label className="popup__label">
                Senha
                <input
                  className={`popup__input ${loginErrors.password ? 'popup__input_error' : ''}`}
                  type="password"
                  placeholder="Insira sua senha"
                  value={loginData.password}
                  onChange={(e) =>
                    setLoginData((prev) => ({ ...prev, password: e.target.value }))
                  }
                  required
                />
                {loginErrors.password && (
                  <span className="popup__error">{loginErrors.password}</span>
                )}
              </label>
              <button
                className="popup__submit-btn"
                type="submit"
                disabled={!loginData.email.trim() || !loginData.password.trim()}
              >
                Entrar
              </button>
            </form>
            <p className="popup__switch">
              ou{' '}
              <button
                className="popup__switch-btn"
                type="button"
                onClick={onSwitchToRegister}
              >
                Inscreva-se
              </button>
            </p>
          </>
        )}

        {activePopup === 'register' && (
          <>
            <h2 className="popup__title">Inscrição</h2>
            <form className="popup__form" onSubmit={handleRegisterSubmit} noValidate>
              <label className="popup__label">
                E-mail
                <input
                  className={`popup__input ${registerErrors.email ? 'popup__input_error' : ''}`}
                  type="email"
                  placeholder="Insira seu e-mail"
                  value={registerData.email}
                  onChange={(e) =>
                    setRegisterData((prev) => ({ ...prev, email: e.target.value }))
                  }
                  required
                />
                {registerErrors.email && (
                  <span className="popup__error">{registerErrors.email}</span>
                )}
              </label>
              <label className="popup__label">
                Senha
                <input
                  className={`popup__input ${registerErrors.password ? 'popup__input_error' : ''}`}
                  type="password"
                  placeholder="Insira sua senha"
                  value={registerData.password}
                  onChange={(e) =>
                    setRegisterData((prev) => ({ ...prev, password: e.target.value }))
                  }
                  required
                />
                {registerErrors.password && (
                  <span className="popup__error">{registerErrors.password}</span>
                )}
              </label>
              <label className="popup__label">
                Nome de usuário
                <input
                  className={`popup__input ${registerErrors.name ? 'popup__input_error' : ''}`}
                  type="text"
                  placeholder="Insira seu apelido"
                  value={registerData.name}
                  onChange={(e) =>
                    setRegisterData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  required
                />
                {registerErrors.name && (
                  <span className="popup__error">{registerErrors.name}</span>
                )}
              </label>
              <button
                className="popup__submit-btn"
                type="submit"
                disabled={
                  !registerData.email.trim() ||
                  !registerData.password.trim() ||
                  !registerData.name.trim()
                }
              >
                Inscrever-se
              </button>
            </form>
            <p className="popup__switch">
              ou{' '}
              <button
                className="popup__switch-btn"
                type="button"
                onClick={onSwitchToLogin}
              >
                Entrar
              </button>
            </p>
          </>
        )}

        {activePopup === 'success' && (
          <div className="popup__success">
            <h2 className="popup__title">Registro concluído com sucesso!</h2>
            <button
              className="popup__switch-btn popup__switch-btn_standalone"
              type="button"
              onClick={onSwitchToLogin}
            >
              Entrar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default PopupWithForm;
