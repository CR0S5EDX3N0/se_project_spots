export function setButtonText(btn, isLoading, defaultText, loadingText) {
  if (isLoading) {
    btn.textContent = loadingText;
  } else {
    btn.textContent = defaultText;
  }
}

export function renderLoading(isLoading, buttonElement, defaultText, loadingText) {
  if (isLoading) {
    buttonElement.textContent = loadingText;
  } else {
    buttonElement.textContent = defaultText;
  }
}

export function handleSubmit(evt, apiMethod, successCallback) {
  evt.preventDefault();
  const submitButton = evt.submitter;
  const initialText = submitButton.textContent;
  renderLoading(true, submitButton, initialText, "Saving...");

  request(apiMethod)
    .then(() => {
      successCallback();
      evt.target.reset();
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      renderLoading(false, submitButton, initialText, "Saving...");
    });

}