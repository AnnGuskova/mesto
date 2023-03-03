export class FormValidator {
  #options;
  #element;
  #inputList;
  #buttonElement;

  constructor(options, element) {
    this.#options = options;
    this.#element = element;
    this.#inputList = Array.from(
      element.querySelectorAll(options.inputSelector)
    );
    this.#buttonElement = element.querySelector(
      options.submitButtonSelector
    );
  }

  #showInputError(inputElement, errorMessage) {
    inputElement.classList.add(this.#options.inputErrorClass);
    const errorElement = this.#element.querySelector(
      `.${inputElement.id}-error`
    );
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this.#options.errorClass);
  }

  #hideInputError(inputElement) {
    inputElement.classList.remove(this.#options.inputErrorClass);
    const errorElement = this.#element.querySelector(
      `.${inputElement.id}-error`
    );
    errorElement.classList.remove(this.#options.errorClass);
    errorElement.textContent = "";
  }

  #checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this.#showInputError(inputElement, inputElement.validationMessage);
    } else {
      this.#hideInputError(inputElement);
    }
  }

  #hasInvalidInput() {
    return this.#inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  #toggleButtonState() {
    if (this.#hasInvalidInput()) {
      this.#buttonElement.classList.add(this.#options.inactiveButtonClass);
      this.#buttonElement.setAttribute("disabled", "disabled");
    } else {
      this.#buttonElement.classList.remove(this.#options.inactiveButtonClass);
      this.#buttonElement.removeAttribute("disabled");
    }
  }

  #setEventListeners() {
    this.#toggleButtonState(
    );

    this.#element.addEventListener("reset", () => {
      setTimeout(() => {
        this.#toggleButtonState(
        );
      }, 0);
    });

    this.#inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this.#checkInputValidity(inputElement);
        this.#toggleButtonState(
        );
      });
    });
  }

  enableValidation() {
    this.#setEventListeners();
  }
}
