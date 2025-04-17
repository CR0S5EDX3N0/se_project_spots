const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-btn",
  inactiveButtonClass: "modal__submit-btn_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible"
};


const showInputError = (formEl, inputEl, errorMessage) => {
  const errorElement = formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.add("modal__input_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("modal__error-active");
};

const hideInputError = (formEl, inputEl) => {
  const errorElement = formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.remove("modal__input_error");
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
  const inputList = Array.from(formEl.querySelectorAll(settings.inputSelector));
  const buttonElement = formEl.querySelector(settings.submitButtonSelector);

    inputList.forEach((inputEl) => {
      inputEl.addEventListener("input", function () {
        checkInputValidity(formEl, inputEl);
        toggleButtonState(inputList, buttonElement);
      });
    });
  };

const enableValidation = (settings) => {
    const formList = document.querySelectorAll(".modal__form");
    formList.forEach((formEl) => {
      setEventListeners(formEl);
    });
}

enableValidation(settings);

const toggleButtonState = (inputList, buttonElement) => {
  if (!buttonElement) return;

  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(settings.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(settings.inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

function hasInvalidInput(inputList) {
  return inputList.some((inputEl) => !inputEl.validity.valid);
}

function resetValidation(formEl, settings) {
  const inputList = Array.from(formEl.querySelectorAll(settings.inputSelector));
  const buttonElement = formEl.querySelector(settings.submitButtonSelector);

  inputList.forEach((inputEl) => {
      hideInputError(formEl, inputEl);
  });
  formEl.reset();
  toggleButtonState(inputList, buttonElement);
 }

 export { settings, resetValidation };
 