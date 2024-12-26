const searchInput = document.getElementById("searchInput");
const newsGrid = document.getElementById("newsgrid");

async function fetchNews() {
  try {
    newsGrid.innerHTML = '<p class="loading">Loading news articles...</p>';
    const response = await fetch("https://saurav.tech/NewsAPI/everything/cnn.json");
    const data = await response.json();
    console.log(data);
    return data.articles; 
  } catch (error) {
    newsGrid.innerHTML = `
      <p class="error">
        Error: ${error.message}<br>
        Unable to load news articles.
      </p>
    `;
    return [];
  }
}
function renderNews(articles) {
  newsGrid.innerHTML = "";
  if (articles.length === 0) {
    newsGrid.innerHTML = '<p class="no-results">No news articles found.</p>';
    return;
  }
  articles.forEach((article) => {
    const card = document.createElement("div");
    card.classList.add("news-card");
    card.innerHTML = `
      <div class="news-card-title">${article.title}</div>
      <img src="${article.urlToImage || 'placeholder.jpg'}" alt="${article.title}">
      <p class="news-card-description">${article.description || 'No description available.'}</p>
      <a href="${article.url}" target="_blank" class="read-more"><button class="bt">Read More</button></a>
    `;
    newsGrid.appendChild(card);
  });
}

function filterNews(articles, searchTerm) {
  return articles.filter((article) =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
}

async function initNewsViewer() {
  const allArticles = await fetchNews();
  let currentArticles = allArticles;
  renderNews(currentArticles);

  searchInput.addEventListener("input", (e) => {
    const searchTerm = e.target.value;
    const filteredArticles = filterNews(allArticles, searchTerm);
    renderNews(filteredArticles);
  });
}

initNewsViewer();