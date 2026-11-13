class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getInitialCards() {
    fetch("https://around-api.en.tripleten-services.com/v1", {
  headers: {
    authorization: "f861a228-ef38-49bc-8005-1498c4737f56"
  }
  })
  .then(res => res.json())
  }


  getappInfo() {
    return Promise.all([this.getInitialCards(), this.getUserInfo()])
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`,{
      headers: this._headers,
    })
     .then(this._checkResponse);
    }

  editUserInfo({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name,
        about,
      }),
    })
   .then(this._checkResponse);
  }

  deleteCard({ id }) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    })
   .then(this._checkResponse);
  }

  changeLikeCardStatus({ id, isLiked }) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: isLiked ? "DELETE" : "PUT",
      headers: this._headers,
    })
   .then(this._checkResponse);
  }

  editUserAvatar({ avatar }) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar,
      }),
    })
   .then(this._checkResponse);
  }

  addNewCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name,
        link,
      }),
    })
   .then(this._checkResponse);
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }


  _request(url, options) {
    return fetch(url, options).then(this._checkResponse)
  }


}

export default Api;