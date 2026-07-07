# News Explorer

News Explorer is a React application for searching recent news articles, viewing results, and saving articles to a personal saved-news page. It was built as a TripleTen React/API stage project with Vite, React Router, NewsAPI integration, responsive layouts, and modal authentication flows.

## Features

- Search for news articles by keyword.
- Fetches articles from the last 7 days through NewsAPI.
- Shows loading, empty-result, and request-error states.
- Displays article cards with image fallback, publication date, source, title, and description.
- Opens original articles in a new browser tab.
- Saves articles for a signed-in user and displays them on `/saved-news`.
- Supports deleting saved articles.
- Persists the latest search results in `localStorage` after page refresh.
- Includes sign-in, registration, and success popups with basic client-side validation.
- Uses responsive styling for desktop, tablet, and mobile screens.

## Tech Stack

- React 19
- React Router
- Vite
- ESLint
- NewsAPI
- CSS with BEM-style class names

## Project Structure

```text
src/
  components/        Reusable UI sections and pages
  images/            Local image assets
  utils/             API helpers and constants
  vendor/            Font declarations
public/
  images/            Public fallback images
  favicon.svg
  icons.svg
```

## Getting Started

Install dependencies:

```bash
npm install
```

Create a local environment file:

```bash
cp .env.example .env
```

Add your NewsAPI key:

```env
VITE_NEWS_API_KEY=your_news_api_key_here
```

Start the development server:

```bash
npm run dev
```

Open the local URL printed by Vite in your terminal.

## Available Scripts

```bash
npm run dev
```

Runs the app locally with Vite.

```bash
npm run build
```

Builds the production version into `dist/`.

```bash
npm run preview
```

Serves the production build locally.

```bash
npm run lint
```

Runs ESLint across the project.

## API Notes

In development, Vite proxies `/v2` requests to `https://newsapi.org` to avoid browser CORS issues. In production, the app uses the TripleTen News API proxy at `https://nomoreparties.co/news/v2`.

Authentication and saved articles are currently handled in React state for this stage of the project. The `src/utils/api.js` file contains backend request helpers intended for a future backend integration.

## Routes

- `/` - search page with news results and author/about section.
- `/saved-news` - saved articles page.

## Author

TripleTen React/API stage project.
