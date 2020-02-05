export class Api {
  constructor(options) {
    this.url = options.url;
    this.headers = options.headers;
    this.ownerId = options.ownerId;
  }
  
  get(path) {
    return fetch(`${this.url}${path}`, {
      headers: this.headers
    })
      .then(this.checkStatus)
      .catch(this.showError);
  }
  
  updateInfo(path, event) {
    return fetch(`${this.url}${path}`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name: event.currentTarget.elements.name.value,
        about: event.currentTarget.elements.job.value
      })
    })
      .then(this.checkStatus)
      .catch(this.showError);
  }

  updateAvatar(path, event) {
    return fetch(`${this.url}${path}`, {
      method: 'PATCH',
        headers: this.headers,
        body: JSON.stringify({
          avatar: event.currentTarget.elements.avatar.value
        })
      })
      .then(this.checkStatus)
      .catch(this.showError);
  }
  
  
  post(path, event) {
    return fetch(`${this.url}${path}`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        name: event.currentTarget.elements.place.value,
        link: event.currentTarget.elements.link.value
      })
    })
      .then(this.checkStatus)
      .catch(this.showError);
  }
  
  delete(path, id) {
    return fetch(`${this.url}${path}/${id}`, {
      method: 'DELETE',
      headers: this.headers
    })
      .then(this.checkStatus)
      .then(res => res)
      .catch(this.showError);
  }
  
  put(path, id) {
    return fetch(`${this.url}${path}/${id}`, {
      method: 'PUT',
      headers: this.headers
    })
      .then(this.checkStatus)
      .catch(this.showError);
  }
  
  checkStatus(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  }
  
  showError(err) {
    return console.log(err);
  }
}

export const api = new Api({
  url: NODE_ENV === "development"?'http://95.216.175.5/cohort6':'https://95.216.175.5/cohort6',
  headers: {
      authorization: 'eaddcdab-86db-46f3-88bc-3b9671c80f29',
      'Content-Type': 'application/json'
  }
});