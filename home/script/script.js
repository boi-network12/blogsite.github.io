let cancleBar = document.getElementById('cancelBar');
let bars = document.getElementById('bars');
let navBars = document.querySelector('nav .navbar');

bars.addEventListener('click', () => {
    navBars.style.display = 'flex';
});

cancleBar.addEventListener('click', () => {
    navBars.style.display = 'none';
});

// Replace 'YOUR_API_KEY' with your actual News API key
const apiKey = '6442fdb0c04e4403b8f6709f7b734304';
const apiUrl = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=' + apiKey;

fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        const articles = data.articles;
        const newsContainer = document.querySelector('.content .side1');

        articles.forEach(article => {
            const articleBox = document.createElement('div');
            articleBox.classList.add('box');

            const articleImg = document.createElement('img');
            articleImg.src = article.urlToImage;
            articleImg.alt = 'Article Image';
            articleImg.classList.add('urlToImg');

            const articleContent = document.createElement('div');
            articleContent.classList.add('boxcontent');

            const publishedAt = document.createElement('span');
            publishedAt.innerText = article.publishedAt;

            const title = document.createElement('h3');
            title.innerText = article.title;

            const author = document.createElement('p');
            author.innerText = article.author;

            articleContent.appendChild(publishedAt);
            articleContent.appendChild(title);
            articleContent.appendChild(author);

            articleBox.appendChild(articleImg);
            articleBox.appendChild(articleContent);

            articleBox.addEventListener('click', async () => {
                const response = await fetch(article.url);
                const fullArticleData = await response.json();
                newsContainer.innerHTML = `<h2>${fullArticleData.title}</h2><p>${fullArticleData.content}</p>`;
            });

            newsContainer.appendChild(articleBox);
        });
    })
    .catch(error => console.log('Error fetching data: ', error));
