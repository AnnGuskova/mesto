// Функция закрытия модального окна по нажатию на Escape
const closePopupByEscape = (evt) => {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    if (openedPopup !== null) {
      closePopup(openedPopup);
    }
  }
};

// Функция закрытия модального окна
export const closePopup = (element) => {
  element.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupByEscape);
};

// Функция открытия модального окна
export function openPopup(element) {
  element.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupByEscape);
}

