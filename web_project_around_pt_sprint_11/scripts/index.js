import Card from "./Card.js";
import Section from "./Section.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";
import FormValidator from "./FormValidator.js";

let initialCards = [
  {
    name: "Vale de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montanhas Carecas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

// ========== POPUP IMAGE ==========
const imagePopup = new PopupWithImage("#image-popup");
imagePopup.setEventListeners();

// ========== USER INFO ==========
const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  aboutSelector: ".profile__description",
});

// ========== POPUP EDIT PROFILE ==========
const editProfilePopup = new PopupWithForm(
  "#edit-popup",
  handleProfileFormSubmit,
);
editProfilePopup.setEventListeners();

// ========== POPUP ADD CARD ==========
const addCardPopup = new PopupWithForm(
  "#new-card-popup",
  handleAddCardFormSubmit,
);
addCardPopup.setEventListeners();

// ========== SECTION CARDS ==========
const cardList = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      const card = createCard(cardData);
      cardList.addItem(card);
    },
  },
  ".cards__list",
);

// ========== VALIDATOR ==========
const editProfileForm = document.querySelector("#edit-profile-form");
const newCardForm = document.querySelector("#new-card-form");

const editProfileValidator = new FormValidator(editProfileForm);
const newCardValidator = new FormValidator(newCardForm);

editProfileValidator.enableValidation();
newCardValidator.enableValidation();

// ========== FUNCTIONS ==========

function createCard(cardData) {
  const card = new Card(cardData, "#cards__template", (cardData) => {
    imagePopup.open(cardData);
  });

  return card.generateCard();
}

function handleProfileFormSubmit(formData) {
  userInfo.setUserInfo({
    name: formData.name,
    about: formData.description,
  });

  editProfilePopup.close();
}

function handleAddCardFormSubmit(formData) {
  const newCard = createCard({
    name: formData["place-name"],
    link: formData.link,
  });
  cardList.addItem(newCard);
  addCardPopup.close();
}

// ========== EVENT LISTENERS ==========

document
  .querySelector(".profile__edit-button")
  .addEventListener("click", () => {
    const currentUserInfo = userInfo.getUserInfo();

    document.querySelector("[name='name']").value = currentUserInfo.name;
    document.querySelector("[name='description']").value =
      currentUserInfo.about;

    editProfileValidator.resetValidation();
    editProfilePopup.open();
  });

document.querySelector(".profile__add-button").addEventListener("click", () => {
  newCardValidator.resetValidation();

  addCardPopup.open();
});

cardList.renderItems();
