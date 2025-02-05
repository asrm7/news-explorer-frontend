
class MainBackend {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  saveArticles({
    keyword, title, text, date, source, link, image,
  }) {
    return fetch(`${this._baseUrl}/articles`, {
      headers: this._headers,
      method: 'POST',
      body: JSON.stringify({
        keyword,
        title,
        text,
        date,
        source,
        link,
        image,
      }),
    }).then((res) => (res.ok ? res.json() : Promise.reject(`error${res.statusText}`)));
  }

  getSavedArticles() {
    return fetch(`${this._baseUrl}/articles`, {
      headers: this._headers,
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(`Error!${res.status}${res.statusText}`)));
  }

  removeArticle(articleId) {
    console.log("Removendo artigo com ID:", articleId); // Log do ID antes da requisição
    return fetch(`${this._baseUrl}/articles/${articleId}`, {
      headers: this._headers,
      method: 'DELETE',
    }).then((res) => 
      res.ok ? res.json() : Promise.reject(`error! ${res.status} ${res.statusText}`)
    );
  }
  
}

export default MainBackend;
