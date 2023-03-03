import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import {initialCards, formOptions} from "./constants.js";
import {openPopup, closePopup} from "./utils.js";

// Модальные окна
const popups = document.querySelectorAll(".popup");

// Контейнеры полей ввода
const inputContents = document.querySelectorAll(".popup__input-content");

//  Элементы модального окна редактирования автора
const editAuthorPopupElement = document.querySelector(".popup_edit_author");
const editAuthorFormElement = document.querySelector(
  ".popup__input-content_edit_author"
);
const nameInputElement = document.querySelector(".popup__field_name_name");
const jobInputElement = document.querySelector(
  ".popup__field_name_description"
);

// Элементы модального окна добавления места
const addPlacePopupElement = document.querySelector(".popup_add_place");
const addPlaceFormElement = document.querySelector(
  ".popup__input-content_add_place"
);
const placeInputElement = document.querySelector(
  ".popup__field_name_name-place"
);
const linkInputElement = document.querySelector(".popup__field_name_link");

// Элементы профиля
const nameElement = document.querySelector(".profile__header-author");
const jobElement = document.querySelector(".profile__description");
const openEditAuthorPopupButton = document.querySelector(
  ".profile__edit-button"
);
const addPlaceButton = document.querySelector(".profile__add-button");

// Функция отображения карточки
const renderCard = (card) => {
  document.querySelector(".places").prepend(card);
}

// Функции для модального окна редактирования автора
const openPopupEditAuthor = () => {
  nameInputElement.value = nameElement.textContent;
  nameInputElement.dispatchEvent(new Event("input"));
  jobInputElement.value = jobElement.textContent;
  jobInputElement.dispatchEvent(new Event("input"));
  openPopup(editAuthorPopupElement);
};

const editProfile = (event) => {
  event.preventDefault();
  nameElement.textContent = nameInputElement.value;
  jobElement.textContent = jobInputElement.value;
  closePopup(editAuthorPopupElement);
};

// Функции для модального окна добавления места
const openPopupAddPlace = () => {
  openPopup(addPlacePopupElement);
};
const addPlace = (event) => {
  event.preventDefault();
  renderCard(new Card(placeInputElement.value, linkInputElement.value).createCard());
  closePopup(addPlacePopupElement);
  addPlaceFormElement.reset();
};

// Обработчики
// Привязка событий к элементам модального окна редактирования автора
openEditAuthorPopupButton.addEventListener("click", openPopupEditAuthor);
editAuthorFormElement.addEventListener("submit", editProfile);

// Привязка событий к элементам модального окна добавления места
addPlaceButton.addEventListener("click", openPopupAddPlace);
addPlaceFormElement.addEventListener("submit", addPlace);

// Привязка событий закрытия модальных окон
popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (
      evt.target.classList.contains("popup_opened") ||
      evt.target.classList.contains("popup__close-image")
    ) {
      closePopup(popup);
    }
  });
});

initialCards.forEach((initialCard) =>
  renderCard(new Card(initialCard.name, initialCard.link).createCard())
);

Array.from(inputContents).forEach(
  (formElement) =>
    new FormValidator(
      formOptions,
      formElement
    ).enableValidation()
);
