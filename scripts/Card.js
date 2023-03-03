import {openPopup} from "./utils.js";

export class Card {
  #showImagePopupImageContainer = document.querySelector(
    ".popup__image-container"
  );
  #showImagePopupImageCaption = document.querySelector(".popup__image-caption");
  #showImagePopupElement = document.querySelector(".popup_show-image");

  #name;
  #link;
  #selector;

  constructor(name, link, selector = "#card") {
    this.#name = name;
    this.#link = link;
    this.#selector = selector;
  }

  #deleteCard(event) {
    event.target.closest(".place").remove();
  }

  #toggleLike(event) {
    event.target.classList.toggle("place__heart-button_active");
  }

  #showPicture() {
    this.#showImagePopupImageContainer.setAttribute("src", this.#link);
    this.#showImagePopupImageContainer.setAttribute("alt", this.#name);

    this.#showImagePopupImageCaption.textContent = this.#name;

    openPopup(this.#showImagePopupElement);
  }

  #getCardTemplate() {
    return document.querySelector(this.#selector).content.cloneNode(true);
  }

  #setEventListeners(card) {
    const image = card.querySelector(".place__picture");
    image.setAttribute("src", this.#link);
    image.setAttribute("alt", this.#name);
    image.addEventListener("click", () => this.#showPicture());

    const deleteButton = card.querySelector(".place__trash-button");
    deleteButton.addEventListener("click", this.#deleteCard);

    const likeButton = card.querySelector(".place__heart-button");
    likeButton.addEventListener("click", this.#toggleLike);
  }

  createCard() {
    const card = this.#getCardTemplate();

    this.#setEventListeners(card);

    const title = card.querySelector(".place__header");
    title.textContent = this.#name;

    return card;
  }
}
