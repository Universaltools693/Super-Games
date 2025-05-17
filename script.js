document.addEventListener('DOMContentLoaded', () => {
    const gameList = document.getElementById('gameList');
    const categoryList = document.getElementById('categoryList');
    const searchBar = document.getElementById('searchBar');

    // GSAP animations on page load
    gsap.from('.header', { opacity: 0, y: -50, duration: 1, ease: 'power3.out' });
    gsap.from('.search-bar', { opacity: 0, scale: 0.8, duration: 1, delay: 0.5 });
    gsap.from('.section-title', { opacity: 0, y: 20, duration: 1, delay: 0.7, stagger: 0.2 });

    // Fetch games from backend
    fetch('http://localhost:3000/api/games')
        .then(response => response.json())
        .then(data => {
            // Extract unique categories
            const categories = ['All', ...new Set(data.map(game => game.category))];
            categories.forEach(category => {
                const btn = document.createElement('button');
                btn.textContent = category;
                btn.onclick = () => filterGames(category, data);
                categoryList.appendChild(btn);
                gsap.from(btn, { opacity: 0, x: -20, duration: 0.5, delay: 1 });
            });

            // Display all games initially
            displayGames(data);

            // Search functionality
            searchBar.addEventListener('input', () => {
                const query = searchBar.value.toLowerCase();
                const filteredGames = data.filter(game =>
                    game.title.toLowerCase().includes(query)
                );
                displayGames(filteredGames);
            });
        })
        .catch(error => console.error('Error fetching games:', error));

    function displayGames(games) {
        gameList.innerHTML = '';
        games.forEach((game, index) => {
            const card = document.createElement('div');
            card.className = 'game-card';
            card.innerHTML = `
                <img src="${game.thumbnail}" alt="${game.title}">
                <h3>${game.title}</h3>
                <p>${game.category}</p>
                <button onclick="window.location.href='${game.playLink}'">Play Now <i class="fas fa-play"></i></button>
            `;
            gameList.appendChild(card);
            // GSAP animation for cards
            gsap.from(card, {
                opacity: 0,
                y: 50,
                duration: 0.8,
                delay: index * 0.1,
                ease: 'power3.out'
            });
        });
    }

    function filterGames(category, games) {
        const filteredGames = category === 'All'
            ? games
            : games.filter(game => game.category === category);
        displayGames(filteredGames);
    }
});

// PWA service worker (optional, for app-like experience)
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
        .then(() => console.log('Service Worker Registered'))
        .catch(error => console.error('Service Worker Error:', error));
}
