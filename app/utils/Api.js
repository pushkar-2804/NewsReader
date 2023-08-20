// utils/api.js
const API_KEY = "a7d078a5e5994af4b9fcb99d298510cc"; // Replace with your actual API key

const API_URL = "https://newsapi.org/v2/top-headlines";
const DEFAULT_COUNTRY = "in"; // You can customize this based on user preferences

// Fetch news articles from the News API
export async function fetchNewsArticles() {
  const response = await fetch(
    `${API_URL}?country=${DEFAULT_COUNTRY}&apiKey=${API_KEY}`
  );
  const data = await response.json();
  if (data.status === "ok") {
    return data.articles;
  } else {
    throw new Error("Failed to fetch news articles");
  }
}
