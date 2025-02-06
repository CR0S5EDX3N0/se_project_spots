const initialCards = [
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
];

const profileEditButton = document.querySelector(".profile__edit-btn");
const addCardButton = document.querySelector(".profile__add-btn");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

const editModal = document.querySelector("#edit-modal");
const editFormElement = editModal.querySelector(".modal__form");
const addCardFormElement = editModal.querySelector("#add-card-form");
const editModalCloseBtn = editModal.querySelector(".modal__close-btn");
const editModalNameInput = editModal.querySelector("#profile-name-input");
const editModalDescriptionInput = editModal.querySelector("#profile-description-input");

const cardTemplate = document.querySelector("#card-template");
const cardsList = document.querySelector(".cards__list");
const cardModal = document.querySelector("#add-card-modal");
const cardDeleteBtn = cardModal.querySelector(".card__remove-btn");
const cardModalCloseBtn = cardModal.querySelector(".modal__close-btn");
const cardModalLinkInput = editModal.querySelector("#add-card-link-input");
const cardModalCaptionInput = editModal.querySelector("#add-card-caption-input");

function getCardElement(data) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);

  const cardNameEl = cardElement.querySelector(".card__title");
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardLikeBtn = cardElement.querySelector(".card__like-btn")

  cardNameEl.textContent = data.name;
  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;

  cardLikeBtn.addEventListener("click", () => {
    cardLikeBtn.classList.toggle("card__like-btn_liked")
  });

  return cardElement;
}

function openModal(modal) {
  modal.classList.add("modal__opened");
}

function closeModal(modal) {
  modal.classList.remove("modal__opened");
}

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  editModalNameInput.value = profileName.value;
  editModalDescriptionInput.value = profileDescription.value;
  closeModal(editModal);
}

function handleCardFormSubmit(evt){
  evt.preventDefault();
  const inputValues = {name: cardModalCaptionInput.value , link: cardModalLinkInput.value};
  const cardElement = getCardElement(inputValues);
  cardsList.push();
  cardsList.unshift
  closeModal(cardModal);
}

profileEditButton.addEventListener("click", () => {
  editModalNameInput.value = profileName.textContent;
  editModalDescriptionInput.value = profileDescription.textContent;
  openModal(editModal);
});

addCardButton.addEventListener("click", () => {
  openModal(cardModal);
});

editModalCloseBtn.addEventListener("click", () => {
  closeModal(editModal);
});

cardModalCloseBtn.addEventListener("click", () => {
  closeModal(cardModal);
});

cardDeleteBtn.addEventListener("click", function () {
  const cards = document.querySelector(".card");

  cards.forEach((item) =>{
    cards.remove(item);
  });
});

editFormElement.addEventListener("submit", handleEditFormSubmit);
addCardFormElement.addEventListener("submit", handleCardFormSubmit);

initialCards.forEach((item) => {
  const cardElement = getCardElement(item);
  cardsList.append(cardElement);
});