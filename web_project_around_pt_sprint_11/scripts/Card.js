export default class Card {
  constructor(data, cardSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }

  _setEventListeners() {
    this._element
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        this._handleLikeClick();
      });

    this._element
      .querySelector(".card__delete-button")
      .addEventListener("click", () => {
        this._handleDeleteClick();
      });

    this._element
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this._handleCardClick({
          name: this._name,
          link: this._link,
        });
      });
  }

  _handleLikeClick() {
    this._element
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_is-active ");
  }

  _handleDeleteClick() {
    this._element.remove();
    this._element = null;
  }

  generateCard() {
    this._element = this._getTemplate();

    const cardImage = this._element.querySelector(".card__image");
    cardImage.src = this._link;
    cardImage.alt = this._name;
    this._element.querySelector(".card__title").textContent = this._name;

    this._setEventListeners();

    return this._element;
  }
}
