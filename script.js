document.addEventListener('DOMContentLoaded', () => {
    const gameList = document.getElementById('gameList');
    const categoryList = document.getElementById('categoryList');
    const searchBar = document.getElementById('searchBar');

    // Embedded game data (subset for brevity, add all 200+ games)
    const games = [
        {
            id: 1,
            title: "Tetris",
            category: "Puzzle",
            thumbnail: "https://via.placeholder.com/150?text=Tetris",
            playLink: "https://tetris.com/play-tetris"
        },
        {
            id: 2,
            title: "Fortnite",
            category: "Most Popular",
            thumbnail: "https://via.placeholder.com/150?text=Fortnite",
            playLink: "https://www.epicgames.com/fortnite"
        },
        {
            id: 3,
            title: "Super Mario Bros.",
            category: "Most Popular",
            thumbnail: "https://via.placeholder.com/150?text=Super+Mario",
            playLink: "https://www.retrogames.cc/nes-games/super-mario-bros.html"
        },
        {
            id: 4,
            title: "The Legend of Zelda",
            category: "Most Popular",
            thumbnail: "https://via.placeholder.com/150?text=Zelda",
            playLink: "https://www.retrogames.cc/nes-games/the-legend-of-zelda.html"
        },
        {
            id: 5,
            title: "Genshin Impact",
            category: "RPG",
            thumbnail: "https://via.placeholder.com/150?text=Genshin",
            playLink: "https://genshin.hoyoverse.com/"
        },
        {
            id: 6,
            title: "Minecraft",
            category: "Most Popular",
            thumbnail: "https://via.placeholder.com/150?text=Minecraft",
            playLink: "https://www.minecraft.net/"
        },
        {
            id: 7,
            title: "Candy Crush Saga",
            category: "Puzzle",
            thumbnail: "https://via.placeholder.com/150?text=Candy+Crush",
            playLink: "https://www.king.com/game/candycrush"
        },
        {
            id: 8,
            title: "Among Us",
            category: "Most Popular",
            thumbnail: "https://via.placeholder.com/150?text=Among+Us",
            playLink: "https://www.innersloth.com/games/among-us/"
        }
        // Add all 200+ games here in the same format...
    ];

    // GSAP animations on page load
    gsap.from('.header', { opacity: 0, y: -50, duration: 1, ease: 'power3.out' });
    gsap.from('.search-bar', { opacity: 0, scale: 0.8, duration: 1, delay: 0.5 });
    gsap.from('.section-title', { opacity: 0, y: 20, duration: 1, delay: 0.7, stagger: 0.2 });

    // Extract unique categories
    const categories = ['All', ...new Set(games.map(game => game.category))];
    categories.forEach(category => {
        const btn = document.createElement('button');
        btn.textContent = category;
        btn.onclick = () => filterGames(category, games);
        categoryList.appendChild(btn);
        gsap.from(btn, { opacity: 0, x: -20, duration: 0.5, delay: 1 });
    });

    // Display all games initially
    displayGames(games);

    // Search functionality
    searchBar.addEventListener('input', () => {
        const query = searchBar.value.toLowerCase();
        const filteredGames = games.filter(game =>
            game.title.toLowerCase().includes(query)
        );
        displayGames(filteredGames);
    });

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

// PWA service worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
        .then(() => console.log('Service Worker Registered'))
        .catch(error => console.error('Service Worker Error:', error));
}
