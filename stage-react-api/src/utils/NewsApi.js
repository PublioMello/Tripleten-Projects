const BASE_URL = import.meta.env.PROD
  ? 'https://nomoreparties.co/news/v2'
  : '/v2';

function getFromDate() {
  const date = new Date();
  date.setDate(date.getDate() - 7);
  return date.toISOString().split('T')[0];
}

function getToDate() {
  return new Date().toISOString().split('T')[0];
}

export function getNews(keyword) {
  const params = new URLSearchParams({
    q: keyword,
    from: getFromDate(),
    to: getToDate(),
    pageSize: '100',
    apiKey: import.meta.env.VITE_NEWS_API_KEY || '',
  });

  return fetch(`${BASE_URL}/everything?${params}`)
    .then((res) => {
      if (!res.ok) {
        return res
          .json()
          .then((err) => Promise.reject(new Error(err.message || `Erro ${res.status}`)))
          .catch(() => Promise.reject(new Error(`Erro ${res.status}`)));
      }
      return res.json();
    })
    .then((data) => {
      if (data.status !== 'ok') {
        return Promise.reject(new Error(data.message || 'Erro da API de notícias'));
      }
      return data;
    });
}
