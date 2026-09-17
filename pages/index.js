import Api from "../utils/api.js";
import { enableValidation, settings, resetValidation } from "../scripts/validation.js";
import { initialTodos, validationConfig } from "../utils/constants.js";
import { setButtonText } from "../utils/helpers.js";


// const initialCards = [
//   {
//     name: "Val Thorens",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
//   },
//   {
//     name: "Restaurant terrace",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
//   },
//   {
//     name: "An outdoor cafe",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
//   },
//   {
//     name: "A very long bridge, over the forest and through the trees",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
//   },
//   {
//     name: "Tunnel with morning light",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
//   },
//   {
//     name: "Mountain house",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
//   },
// ];

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "d0008e0d-4c01-49c3-80b2-d7b7bd0cfe40",
    "Content-Type": "application/json"
  }
});

api.getUserInfo()
.then((userData) => {
  profileName.textContent = userData.name;
  profileDescription.textContent = userData.about;
  profileAvatar.src = userData.avatar;
})
.catch(console.error);

api.getappInfo()
.then(([cards, userInfo]) => {
  cards.forEach((item) => {
    const cardElement = getCardElement(item);
    cardsList.append(cardElement);
  });
  profileName.textContent = userInfo.name;
  profileDescription.textContent = userInfo.about;
  profileAvatar.src = userInfo.avatar;
})
.catch(console.error);




// Avatar form elements
const profileEditButton = document.querySelector(".profile__edit-btn");
const addCardButton = document.querySelector(".profile__add-btn");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const profileAvatar = document.querySelector(".profile__avatar");

const editModal = document.querySelector("#edit-modal");

const profileForm = document.forms["profile-form"];
const profileAvatarForm = document.forms["edit-avatar"];
const editModalNameInput = editModal.querySelector("#profile-name-input");
const editModalDescriptionInput = editModal.querySelector(
  "#profile-description-input"
);

// Card related elements
const cardTemplate = document.querySelector("#card-template");
const cardsList = document.querySelector(".cards__list");
const cardModal = document.querySelector("#add-card-modal");
const addCardFormElement = cardModal.querySelector("#add-card-form");
const cardModalLinkInput = cardModal.querySelector("#add-card-link-input");
const cardModalCaptionInput = cardModal.querySelector(
  "#add-card-caption-input"
);

// Preview image popup elements
const previewModal = document.querySelector("#preview-card");
const previewModalImageEl = previewModal.querySelector(".modal__image");
const previewModalCaptionEl = previewModal.querySelector(".modal__caption");

// Delete form elements
const deleteModal = document.querySelector("#delete-card-modal");
const deleteForm = deleteModal.querySelector("#delete-card-form");
const deleteFormCancelButton = deleteForm.querySelector(".modal__cancel-btn");
const deleteFormSubmitButton = deleteForm.querySelector(".modal__delete-btn");

const editAvatarModal = document.querySelector("#avatar-modal");
const editAvatarForm = editAvatarModal.querySelector("#edit-avatar-form");
const editAvatarInput = editAvatarForm.querySelector("#avatar-link-input");
const editAvatarButton = document.querySelector(".profile__avatar-btn");

function getCardElement(data) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);

  const cardNameEl = cardElement.querySelector(".card__title");
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardLikeBtn = cardElement.querySelector(".card__like-btn");
  const cardDeleteBtn = cardElement.querySelector(".card__remove-btn");


  cardNameEl.textContent = data.name;
  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;

 if (data.isLiked) {
    cardLikeBtn.classList.add("card__like-btn_active");
  }
  cardLikeBtn.addEventListener("click", () => {
    const isLiked = cardLikeBtn.classList.contains("card__like-btn_active");
    api.changeLikeCardStatus({ id: data._id, isLiked })
      .then((updatedCard) => {
        cardLikeBtn.classList.toggle("card__like-btn_active", !isLiked);
      })
      .catch(console.error);
  });

  cardDeleteBtn.addEventListener("click", (evt) => {
    handleDeleteCard(cardElement, data);
  });

  cardImageEl.addEventListener("click", () => {
    openModal(previewModal);
    previewModalImageEl.src = data.link;
    previewModalImageEl.alt = data.name;
    previewModalCaptionEl.textContent = data.name;
  });
  return cardElement;

}

profileAvatarForm.addEventListener("clcik", (evt) => {
  resetValidation(profileAvatarForm, settings);
  openModal(editModal);
});

profileEditButton.addEventListener("click", () => {
  resetValidation(profileForm, settings);
  openModal(editModal);

  editModalNameInput.value = profileName.textContent;
  editModalDescriptionInput.value = profileDescription.textContent;
});

addCardButton.addEventListener("click", () => {
  addCardFormElement.reset();
  const submitButton = cardModal.querySelector(".modal__submit-btn");
  submitButton.classList.add(settings.inactiveButtonClass);
  submitButton.disabled = true;
  openModal(cardModal);
  });

const closeButtons = document.querySelectorAll(".modal__close-btn");

closeButtons.forEach((button) => {
  const popup = button.closest(".modal");
  button.addEventListener("click", () => closeModal(popup));
});

editAvatarButton.addEventListener("click", () => {
  openModal(editAvatarModal);
});

deleteFormCancelButton.addEventListener("click", () => {
  closeModal(deleteModal);
});

deleteFormSubmitButton.addEventListener("click", () => {
  closeModal(deleteModal);
});

editAvatarForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const submitButton = evt.submitter;
  setButtonText(submitButton, true, "Save", "Saving...");

  api.editUserAvatar({ avatar: editAvatarInput.value })
    .then((data) => {
      profileAvatar.src = data.avatar;
      closeModal(editAvatarModal);
    })
    .catch(console.error)
    .finally(() => {
      setButtonText(submitButton, false, "Save", "Saving...");
    });
});

profileForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const submitButton = evt.submitter;
  setButtonText(submitButton, true, "Save", "Saving...");

  api.editUserInfo({ name: editModalNameInput.value, about: editModalDescriptionInput.value })
    .then((data) => {
      profileName.textContent = data.name;
      profileDescription.textContent = data.about;
      profileAvatar.src = data.avatar;
      closeModal(editModal);
    })
    .catch(console.error)
    .finally(() => {
      setButtonText(submitButton, false, "Save", "Saving...");
    });
});

profileAvatarForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const submitButton = evt.submitter;
  setButtonText(submitButton, true, "Save", "Saving...");

  api.editUserAvatar({ avatar: profileAvatarForm.elements["avatar-link"].value })
    .then((data) => {
      profileAvatar.src = data.avatar;
      closeModal(editModal);
    })
    .catch(console.error)
    .finally(() => {
      setButtonText(submitButton, false, "Save", "Saving...");
    });
});

addCardFormElement.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const submitButton = evt.submitter;
  setButtonText(submitButton, true, "Create", "Creating...");

  api.addNewCard({ name: cardModalCaptionInput.value, link: cardModalLinkInput.value })
    .then((data) => {
      const cardElement = getCardElement(data);
      cardsList.prepend(cardElement);
      closeModal(cardModal);
      resetValidation(addCardFormElement, settings);
    })
    .catch(console.error)
    .finally(() => {
      setButtonText(submitButton, false, "Create", "Creating...");
    });
});

function handleEscape(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal_opened");
    if (openedModal) {
      closeModal(openedModal);
    }
  }
}

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", handleEscape);
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscape);
}

const modals = document.querySelectorAll(".modal");
modals.forEach((modal) => {
  modal.addEventListener("mousedown", (evt) => {
    if (evt.target === modal) {
      closeModal(modal);
    }
  });
});

function handleDeleteCard(cardElement, data) {
  openModal(deleteModal);

  const deleteForm = deleteModal.querySelector("#delete-card-form");
  deleteForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    const submitButton = evt.submitter;
    setButtonText(submitButton, true, "Yes", "Deleting...");

    api.deleteCard(data._id)
      .then(() => {
        cardElement.remove();
        closeModal(deleteModal);
      })
      .catch(console.error)
      .finally(() => {
        setButtonText(submitButton, false, "Yes", "Deleting...");
      });
  }, { once: true });
}
