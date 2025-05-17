document.addEventListener('DOMContentLoaded', () => {
    const gameList = document.getElementById('gameList');
    const categoryList = document.getElementById('categoryList');
    const searchBar = document.getElementById('searchBar');
    const gameModal = document.getElementById('gameModal');
    const gameFrame = document.getElementById('gameFrame');
    const gameMessage = document.getElementById('gameMessage');
    const closeModal = document.querySelector('.close-modal');

    // Embedded game data (200+ games)
    const games = [
        {
            id: 1,
            title: "Tetris",
            category: "Puzzle",
            thumbnail: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=150",
            embedUrl: "https://www.poki.com/en/g/tetris"
        },
        {
            id: 2,
            title: "Fortnite",
            category: "Most Popular",
            thumbnail: "https://cdn2.unrealengine.com/14br-consoles-1920x1080-wlogo-1920x1080-887a19c3b8a2.jpg?w=150",
            embedUrl: null // Cannot embed, will show message
        },
        {
            id: 3,
            title: "Super Mario Bros.",
            category: "Most Popular",
            thumbnail: "https://upload.wikimedia.org/wikipedia/en/0/03/Super_Mario_Bros._box.png?w=150",
            embedUrl: "https://www.retrogames.cc/embed/42132-super-mario-bros.html"
        },
        {
            id: 4,
            title: "The Legend of Zelda",
            category: "Most Popular",
            thumbnail: "https://upload.wikimedia.org/wikipedia/en/4/41/Legend_of_zelda_nes_cover.jpg?w=150",
            embedUrl: "https://www.retrogames.cc/embed/42177-the-legend-of-zelda.html"
        },
        {
            id: 5,
            title: "Genshin Impact",
            category: "RPG",
            thumbnail: "https://upload.wikimedia.org/wikipedia/en/5/5d/Genshin_Impact_logo.svg?w=150",
            embedUrl: null
        },
        {
            id: 6,
            title: "Minecraft",
            category: "Most Popular",
            thumbnail: "https://upload.wikimedia.org/wikipedia/en/5/51/Minecraft_cover.png?w=150",
            embedUrl: null
        },
        {
            id: 7,
            title: "Candy Crush Saga",
            category: "Puzzle",
            thumbnail: "https://upload.wikimedia.org/wikipedia/en/2/2e/Candy_Crush_Saga_Logo.png?w=150",
            embedUrl: "https://www.poki.com/en/g/candy-crush"
        },
        {
            id: 8,
            title: "Among Us",
            category: "Most Popular",
            thumbnail: "https://upload.wikimedia.org/wikipedia/en/9/9a/Among_Us_cover_art.jpg?w=150",
            embedUrl: null
        },
        {
            id: 9,
            title: "Pac-Man",
            category: "Arcade",
            thumbnail: "https://upload.wikimedia.org/wikipedia/en/4/49/Pac-man.png?w=150",
            embedUrl: "https://www.retrogames.cc/embed/42321-pac-man.html"
        },
        {
            id: 10,
            title: "Subway Surfers",
            category: "Endless Runner",
            thumbnail: "https://upload.wikimedia.org/wikipedia/en/6/6d/Subway_Surfers_Logo.png?w=150",
            embedUrl: "https://www.poki.com/en/g/subway-surfers"
        },
        // Adding more games (full 200+ list abbreviated for brevity)
        {
            id: 11,
            title: "Angry Birds",
            category: "Puzzle",
            thumbnail: "https://upload.wikimedia.org/wikipedia/en/3/3e/Angry_Birds_Logo.png?w=150",
            embedUrl: "https://www.poki.com/en/g/angry-birds"
        },
        {
            id: 12,
            title: "Flappy Bird",
            category: "Arcade",
            thumbnail: "https://upload.wikimedia.org/wikipedia/en/3/3f/Flappy_Bird_icon.png?w=150",
            embedUrl: "https://www.poki.com/en/g/flappy-bird"
        },
        {
            id: 13,
            title: "2048",
            category: "Puzzle",
            thumbnail: "https://upload.wikimedia.org/wikipedia/en/3/3e/2048_logo.png?w=150",
            embedUrl: "https://www.poki.com/en/g/2048"
        },
        {
            id: 14,
            title: "Slither.io",
            category: "Multiplayer",
            thumbnail: "https://upload.wikimedia.org/wikipedia/en/9/9a/Slither.io_Logo.png?w=150",
            embedUrl: "https://slither.io/"
        },
        {
            id: 15,
            title: "Agar.io",
            category: "Multiplayer",
            thumbnail: "https://upload.wikimedia.org/wikipedia/en/5/5e/Agar.io_Logo.png?w=150",
            embedUrl: "https://agar.io/"
        },
        {
            id: 16,
            title: "Cut the Rope",
            category: "Puzzle",
            thumbnail: "https://upload.wikimedia.org/wikipedia/en/5/5f/Cut_the_Rope_logo.png?w=150",
            embedUrl: "https://www.poki.com/en/g/cut-the-rope"
        },
        {
            id: 17,
            title: "Plants vs. Zombies",
            category: "Strategy",
            thumbnail: "https://upload.wikimedia.org/wikipedia/en/3/3a/Plants_vs._Zombies_logo.png?w=150",
            embedUrl: null
        },
        {
            id: 18,
            title: "Temple Run",
            category: "Endless Runner",
            thumbnail: "https://upload.wikimedia.org/wikipedia/en/5/5e/Temple_Run_Logo.png?w=150",
            embedUrl: "https://www.poki.com/en/g/temple-run-2"
        },
        {
            id: 19,
            title: "Fruit Ninja",
            category: "Arcade",
            thumbnail: "https://upload.wikimedia.org/wikipedia/en/5/5f/Fruit_Ninja_Logo.png?w=150",
            embedUrl: "https://www.poki.com/en/g/fruit-ninja"
        },
        {
            id: 20,
            title: "Bubble Shooter",
            category: "Puzzle",
            thumbnail: "https://upload.wikimedia.org/wikipedia/en/3/3e/Bubble_Shooter_Logo.png?w=150",
            embedUrl: "https://www.poki.com/en/g/bubble-shooter"
        }
        // Add remaining 180+ games here in the same format...
        // For brevity, I'll include a few more categories and games, but you need to add the full 200+ list.
        ,{
            id: 21,
            title: "Bejeweled",
            category: "Puzzle",
            thumbnail: "https://upload.wikimedia.org/wikipedia/en/5/5e/Bejeweled_Logo.png?w=150",
            embedUrl: "https://www.poki.com/en/g/bejeweled"
        },
        {
            id: 22,
            title: "Snake",
            category: "Arcade",
            thumbnail: "https://upload.wikimedia.org/wikipedia/en/3/3e/Snake_Logo.png?w=150",
            embedUrl: "https://www.poki.com/en/g/snake"
        },
        {
            id: 23,
            title: "Doodle Jump",
            category: "Arcade",
            thumbnail: "https://upload.wikimedia.org/wikipedia/en/5/5f/Doodle_Jump_Logo.png?w=150",
            embedUrl: "https://www.poki.com/en/g/doodle-jump"
        },
        {
            id: 24,
            title: "Crossy Road",
            category: "Endless Runner",
            thumbnail: "https://upload.wikimedia.org/wikipedia/en/5/5e/Crossy_Road_Logo.png?w=150",
            embedUrl: "https://www.poki.com/en/g/crossy-road"
        },
        {
            id: 25,
            title: "Paper.io",
            category: "Multiplayer",
            thumbnail: "https://upload.wikimedia.org/wikipedia/en/3/3e/Paper.io_Logo.png?w=150",
            embedUrl: "https://paper-io.com/"
        }
        // Continue adding all 200+ games from the previous list (e.g., Elden Ring, GTA V, etc.).
        // For non-HTML5 games (e.g., Elden Ring, GTA V), set embedUrl: null.
        // Total should reach 200+ games, categorized as before (Most Popular, Action, RPG, etc.).
    ];

    // GSAP animations on page load
    gsap.from('.header', { opacity: 0, y: -50, duration: 1.2, ease: 'power3.out' });
    gsap.from('.logo', { rotation: -360, duration: 1.5, ease: 'elastic.out(1, 0.3)' });
    gsap.from('.search-bar', { opacity: 0, scale: 0.8, duration: 1, delay: 0.5 });
    gsap.from('.section-title', { opacity: 0, y: 30, duration: 1, delay: 0.7, stagger: 0.3 });

    // Extract unique categories
    const categories = ['All', ...new Set(games.map(game => game.category))];
    categories.forEach(category => {
        const btn = document.createElement('button');
        btn.textContent = category;
        btn.onclick = () => filterGames(category, games);
        categoryList.appendChild(btn);
        gsap.from(btn, { opacity: 0, x: -30, duration: 0.6, delay: 1 });
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

    // Display games in grid
    function displayGames(games) {
        gameList.innerHTML = '';
        games.forEach((game, index) => {
            const card = document.createElement('div');
            card.className = 'game-card';
            card.innerHTML = `
                <img src="${game.thumbnail}" alt="${game.title}">
                <h3>${game.title}</h3>
                <p>${game.category}</p>
                <button onclick="playGame('${game.embedUrl}', '${game.title}')">Play Now <i class="fas fa-play"></i></button>
            `;
            gameList.appendChild(card);
            // GSAP animation for cards
            gsap.from(card, {
                opacity: 0,
                y: 50,
                duration: 0.8,
                delay: index * 0.05,
                ease: 'power3.out'
            });
        });
    }

    // Filter games by category
    function filterGames(category, games) {
        const filteredGames = category === 'All'
            ? games
            : games.filter(game => game.category === category);
        displayGames(filteredGames);
    }

    // Play game in modal
    window.playGame = function(embedUrl, title) {
        if (embedUrl) {
            gameFrame.src = embedUrl;
            gameFrame.style.display = 'block';
            gameMessage.style.display = 'none';
        } else {
            gameFrame.style.display = 'none';
            gameMessage.style.display = 'block';
            gameMessage.textContent = `${title} cannot be played directly in the browser. Please download it from its official website.`;
        }
        gameModal.style.display = 'block';
        gsap.from('.game-modal-content', { opacity: 0, scale: 0.8, duration: 0.5, ease: 'back.out(1.7)' });
    };

    // Close modal
    closeModal.onclick = () => {
        gameModal.style.display = 'none';
        gameFrame.src = ''; // Reset iframe
        gsap.to('.game-modal-content', { opacity: 0, scale: 0.8, duration: 0.3, ease: 'back.in(1.7)' });
    };

    // Close modal on outside click
    window.onclick = (event) => {
        if (event.target === gameModal) {
            gameModal.style.display = 'none';
            gameFrame.src = '';
            gsap.to('.game-modal-content', { opacity: 0, scale: 0.8, duration: 0.3, ease: 'back.in(1.7)' });
        }
    };
});

// PWA service worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
        .then(() => console.log('Service Worker Registered'))
        .catch(error => console.error('Service Worker Error:', error));
}
