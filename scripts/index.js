import {Card} from "./Card.js";
import {FormValidator} from "./FormValidator.js";

//  Переменные
const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

// Модальные окна
const popups = document.querySelectorAll(".popup");

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

// Функция закрытия модального окна по нажатию на Escape
const closePopupByEscape = (evt) => {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    if (openedPopup !== null) {
      closePopup(openedPopup);
    }
  }
};

// Функция открытия модального окна
window.openPopup = (element) => {
  element.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupByEscape);
};

// Функция закрытия модального окна
const closePopup = (element) => {
  element.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupByEscape);
};

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
  new Card(placeInputElement.value, linkInputElement.value).renderCard();
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
  new Card(initialCard.name, initialCard.link).renderCard()
);

Array.from(document.querySelectorAll(".popup__input-content")).forEach((formElement) =>
  new FormValidator({
    inputSelector: ".popup__field",
    submitButtonSelector: ".popup__submit-button",
    inactiveButtonClass: "popup__submit-button_inactive",
    inputErrorClass: "popup__field_invalid",
    errorClass: "popup__field-error_active",
  }, formElement).enableValidation()
);
