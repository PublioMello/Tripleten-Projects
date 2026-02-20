export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popupElement.classList.add("popup_is-opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popupElement.classList.remove("popup_is-opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(event) {
    if (event.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    // 1. Listener para o botão de fechar
    const closeButton = this._popupElement.querySelector(".popup__close");
    if (closeButton) {
      closeButton.addEventListener("click", () => {
        this.close();
      });
    }

    // 2. Listener para clicar no overlay (área sombreada)
    this._popupElement.addEventListener("mousedown", (event) => {
      if (event.target === this._popupElement) {
        this.close();
      }
    });
  }
}
