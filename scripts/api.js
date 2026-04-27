class Api {
  constructor(options) {
    // constructor body
  }

  getInitialCards() {
   return fetch("https://around-api.en.tripleten-services.com/v1/cards", {
  headers: {
    authorization: "d0008e0d-4c01-49c3-80b2-d7b7bd0cfe40"
  }
})
  .then(res => res.json())
  }


}

export default Api;