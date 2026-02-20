export default class FormValidator {
  constructor(formElement) {
    this._formElement = formElement;
  }

  showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.name}-input-error`,
    );

    inputElement.classList.add("form__input_type_error");
    errorElement.textContent = errorMessage;
    errorElement.classList.add("form__input-error_active");
  }

  hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.name}-input-error`,
    );

    inputElement.classList.remove("form__input_type_error");
    errorElement.textContent = "";
    errorElement.classList.remove("form__input-error_active");
  }

  hasInvalidInput(inputs) {
    return Array.from(inputs).some((input) => !input.validity.valid);
  }

  enableValidation() {
    const inputs = this._formElement.querySelectorAll(".popup__input");

    inputs.forEach((input) => {
      input.addEventListener("input", () => {
        if (!input.validity.valid) {
          this.showInputError(input, input.validationMessage);
        } else {
          this.hideInputError(input);
        }
      });
    });
  }

  resetValidation() {
    const inputs = this._formElement.querySelectorAll(".popup__input");
    inputs.forEach((input) => this.hideInputError(input));
  }
}
