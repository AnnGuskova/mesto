export class FormValidator {
  constructor(options, element) {
    this.options = options;
    this.element = element;
  }

  #showInputError(inputElement, errorMessage) {
    inputElement.classList.add(this.options.inputErrorClass);
    const errorElement = this.element.querySelector(
      `.${inputElement.id}-error`
    );
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this.options.errorClass);
  }

  #hideInputError(inputElement) {
    inputElement.classList.remove(this.options.inputErrorClass);
    const errorElement = this.element.querySelector(
      `.${inputElement.id}-error`
    );
    errorElement.classList.remove(this.options.errorClass);
    errorElement.textContent = "";
  }

  #checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this.#showInputError(inputElement, inputElement.validationMessage);
    } else {
      this.#hideInputError(inputElement);
    }
  }

  #hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  #toggleButtonState(inputList, buttonElement, inactiveButtonClass) {
    if (this.#hasInvalidInput(inputList)) {
      buttonElement.classList.add(inactiveButtonClass);
      buttonElement.setAttribute("disabled", "disabled");
    } else {
      buttonElement.classList.remove(inactiveButtonClass);
      buttonElement.removeAttribute("disabled");
    }
  }

  #setEventListeners() {
    const inputList = Array.from(
      this.element.querySelectorAll(this.options.inputSelector)
    );
    const buttonElement = this.element.querySelector(
      this.options.submitButtonSelector
    );
    this.#toggleButtonState(
      inputList,
      buttonElement,
      this.options.inactiveButtonClass
    );

    this.element.addEventListener("reset", () => {
      setTimeout(() => {
        this.#toggleButtonState(
          inputList,
          buttonElement,
          this.options.inactiveButtonClass
        );
      }, 0);
    });

    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this.#checkInputValidity(inputElement);
        this.#toggleButtonState(
          inputList,
          buttonElement,
          this.options.inactiveButtonClass
        );
      });
    });
  }

  enableValidation() {
    this.#setEventListeners();
  }
}
