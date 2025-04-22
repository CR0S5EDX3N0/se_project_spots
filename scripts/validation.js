const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-btn",
  inactiveButtonClass: "modal__submit-btn_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error-active"
};


const showInputError = (settings, formSelector, inputSelector, errorMessage ) => {
  const errorElement = formSelector.querySelector(`#${inputSelector.id}-error`);
  inputSelector.classList.add(settings.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(settings.errorClass);
};

const hideInputError = (settings, formSelector, inputSelector) => {
  const errorElement = formSelector.querySelector(`#${inputSelector.id}-error`);
  inputSelector.classList.remove(settings.inputErrorClass);
  errorElement.classList.remove(settings.errorClass);
  errorElement.textContent = "";
};

const checkInputValidity = (formSelector, inputSelector) => {
  if (!inputSelector.validity.valid) {
    showInputError(formSelector, inputSelector, inputSelector.validationMessage);
  } else {
    hideInputError(formSelector, inputSelector);
  }
};

const setEventListeners = (formSelector, settings) => {
  const inputList = Array.from(formSelector.querySelectorAll(settings.inputSelector));
  const buttonElement = formSelector.querySelector(settings.submitButtonSelector);

    inputList.forEach((inputSelector) => {
      inputSelector.addEventListener("input", function () {
        checkInputValidity(formSelector, inputSelector);
        toggleButtonState(inputList, buttonElement, settings);
      });
    });
  };

const enableValidation = (settings) => {
  const formList = document.querySelectorAll(settings.formSelector);
    formList.forEach((formSelector) => {
      setEventListeners(formSelector, settings);
    });
}

enableValidation(settings);

const toggleButtonState = (inputList, buttonElement, settings) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(settings.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(settings.inactiveButtonClass);
    buttonElement.disabled = false;
  }
};

function hasInvalidInput(inputs) {
  return inputSelector.some((inputSelector) => !inputSelector.validity.valid);
}

function resetValidation(formElement, settings) {
  const inputList = formElement.querySelectorAll(settings.inputSelector);
  const buttonElement = formElement.querySelector(settings.submitButtonSelector);

  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, settings);
  });
  formElement.reset();
  toggleButtonState(inputList, buttonElement, settings);
}

