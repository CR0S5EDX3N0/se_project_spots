class Api {
  constructor(options) {
    this._baseUrl = this._baseUrl;
    this._headers = headers;
  }

  getInitialCards() {
   return fetch(`${this._baseUrl}/cards`, {
  headers: {
    authorization: "d0008e0d-4c01-49c3-80b2-d7b7bd0cfe40"
  }
})
  .then(res => res.json())
  }


}

export default Api;