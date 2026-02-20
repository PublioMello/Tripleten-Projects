import FormValidator from "./FormValidator.js";

export function openModal(modalElement) {
  modalElement.classList.add("popup_is-opened");
}

export function closeModal(modalElement) {
  modalElement.classList.remove("popup_is-opened");
  const form = modalElement.querySelector(".popup__form");
  const modalInputs = form.querySelectorAll(".popup__input");
  const formValidator = new FormValidator(form);

  modalInputs.forEach((input) => {
    formValidator.hideInputError(input);
  });
}
