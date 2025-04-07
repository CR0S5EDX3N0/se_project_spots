const showInputError = (formEl, inputEl, errorMessage) => {
  const errorElement = formEl.querySelector(`.${inputEl.id}-error`);
  inputEl.classList.add("modal__error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("modal__error-active");
};

const hideInputError = (formEl, inputEl) => {
  const errorElement = formEl.querySelector(`.${inputEl.id}-error`);
  inputEl.classList.remove("modal__error");
  errorElement.classList.remove("modal__error-active");
  errorElement.textContent = "";
};

const checkInputValidity = (formEl, inputEl) => {
  if (!inputEl.validity.valid) {
    showInputError(formEl, inputEl, inputEl.validationMessage);
  } else {
    hideInputError(formEl, inputEl);
  }
};

const setEventListeners = (formEl) => {
    const inputList = Array.from(formEl.querySelectorAll(".modal__input"));
    const buttonElement = formEl.querySelector(".modal__submit-btn");

    inputList.forEach((inputEl) => {
      inputEl.addEventListener("input", function () {
        checkInputValidity(formEl, inputEl);
        toggleButtonState(inputList, buttonElement);
      });
    });
  };

  ;

const enableValidation = () => {
    const formList = document.querySelectorAll(".modal__form");
    formList.forEach((formEl) => {
      setEventListeners(formEl);
    });
}

enableValidation();

const toggleButtonState = () => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add("modal__submit-btn_disabled");
        buttonElement.disabled = true;
    } else {
        buttonElement.classList.remove("modal__submit-btn_disabled");
        buttonElement.disabled = false; 
    }
}

function hasInvalidInput(inputList) {
  return inputList.some((inputEl) => !inputEl.validity.valid);
}