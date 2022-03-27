function requestFetch(url) {
  class Request {
    static create(url) {
      return new Request(url);
    }
    fetch() {
      const { url, headers } = { ...this };
      return fetch(url, { headers });
    }
    setContentType(type = "") {
      this.headers = { accept: type }; //여기 accept 필드는 참고했습니다.
      return this;
    }
    setUrl(url) {
      this.url = url;
      return this;
    }
    constructor(url) {
      this.headers = {};
      this.url = url;
    }
  }
  const types = [
    "text/plain",
    "text/html",
    "application/json",
    "application/rainbows+unicorns",
  ];
  return Promise.all(
    types
      .map((type) => {
        return Request.create(url).setContentType(type);
      })
      .map((req) => req.fetch())
  ).then((resps) =>
    Promise.all(resps.map((resp) => resp.text())).then((texts) =>
      texts.map((text) => console.log(text))
    )
  );
}

function usingFetch() {
  const URL = "https://eloquentjavascript.net/author";
  requestFetch(URL);
}

usingFetch();
