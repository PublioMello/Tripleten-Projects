import { BACKEND_URL, NEWS_API_BASE_URL, NEWS_API_KEY, SEARCH_DAYS_RANGE } from './constants';

export function getNews(keyword) {
  const toDate = new Date();
  const fromDate = new Date(toDate.getTime() - SEARCH_DAYS_RANGE * 24 * 60 * 60 * 1000);

  const params = new URLSearchParams({
    q: keyword,
    from: fromDate.toISOString().split('T')[0],
    to: toDate.toISOString().split('T')[0],
    pageSize: '100',
    apiKey: NEWS_API_KEY,
  });

  return fetch(`${NEWS_API_BASE_URL}/everything?${params}`).then((res) => {
    if (!res.ok) throw new Error('Erro ao buscar notícias');
    return res.json();
  });
}

function request(url, options = {}) {
  return fetch(`${BACKEND_URL}${url}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    credentials: 'include',
    ...options,
  }).then((res) => {
    if (!res.ok) return res.json().then((err) => Promise.reject(err));
    return res.json();
  });
}

export function register({ email, password, name }) {
  return request('/signup', {
    method: 'POST',
    body: JSON.stringify({ email, password, name }),
  });
}

export function login({ email, password }) {
  return request('/signin', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

export function checkToken() {
  return request('/users/me');
}

export function logout() {
  return request('/signout', { method: 'POST' });
}

export function getSavedArticles() {
  return request('/articles');
}

export function saveArticle(article) {
  return request('/articles', {
    method: 'POST',
    body: JSON.stringify(article),
  });
}

export function deleteArticle(articleId) {
  return request(`/articles/${articleId}`, { method: 'DELETE' });
}
