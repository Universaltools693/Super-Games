document.addEventListener('DOMContentLoaded', () => {
    const searchBar = document.getElementById('searchBar');
    const categoryList = document.getElementById('categoryList');
    const gameList = document.getElementById('gameList');
    const gameModal = document.getElementById('gameModal');
    const gameFrame = document.getElementById('gameFrame');
    const gameMessage = document.getElementById('gameMessage');
    const loadingSpinner = document.getElementById('loadingSpinner');
    const exitBtn = document.querySelector('.exit-btn');
    const hoverSound = new Audio('hover-sound.mp3');
    const clickSound = new Audio('click-sound.mp3');

    const games = [
        { id: 1, title: "Tetris", category: "Puzzle", thumbnail: "https://i.imgur.com/5nq0j5G.png", embedUrl: "https://www.retrogames.cc/embed/42134-tetris-nes.html" },
        { id: 2, title: "Pac-Man", category: "Arcade", thumbnail: "https://i.imgur.com/2uYd5kN.png", embedUrl: "https://www.retrogames.cc/embed/42135-pac-man.html" },
        { id: 3, title: "Snake", category: "Classic", thumbnail: "https://i.imgur.com/6yKz5qT.png", embedUrl: "https://www.retrogames.cc/embed/42136-snake.html" },
        { id: 4, title: "Space Invaders", category: "Arcade", thumbnail: "https://i.imgur.com/9zX5kW7.png", embedUrl: "https://www.retrogames.cc/embed/42137-space-invaders.html" },
        { id: 5, title: "Galaga", category: "Arcade", thumbnail: "https://i.imgur.com/8vY2t4Q.png", embedUrl: "https://www.retrogames.cc/embed/42138-galaga.html" },
        { id: 6, title: "Donkey Kong", category: "Classic", thumbnail: "https://i.imgur.com/3kW5v9P.png", embedUrl: "https://www.retrogames.cc/embed/42139-donkey-kong.html" },
        { id: 7, title: "Frogger", category: "Classic", thumbnail: "https://i.imgur.com/1qT5y8M.png", embedUrl: "https://www.retrogames.cc/embed/42140-frogger.html" },
        { id: 8, title: "Centipede", category: "Arcade", thumbnail: "https://i.imgur.com/7mR4z2L.png", embedUrl: "https://www.retrogames.cc/embed/42141-centipede.html" },
        { id: 9, title: "Asteroids", category: "Arcade", thumbnail: "https://i.imgur.com/4pN8x3R.png", embedUrl: "https://www.retrogames.cc/embed/42142-asteroids.html" },
        { id: 10, title: "Breakout", category: "Puzzle", thumbnail: "https://i.imgur.com/2wV6t9H.png", embedUrl: "https://www.retrogames.cc/embed/42143-breakout.html" },
        { id: 11, title: "Defender", category: "Arcade", thumbnail: "https://i.imgur.com/5xY7u2K.png", embedUrl: "https://www.retrogames.cc/embed/42144-defender.html" },
        { id: 12, title: "Q*bert", category: "Puzzle", thumbnail: "https://i.imgur.com/8nT4v5J.png", embedUrl: "https://www.retrogames.cc/embed/42145-q-bert.html" },
        { id: 13, title: "Pong", category: "Classic", thumbnail: "https://i.imgur.com/1rE3y6N.png", embedUrl: "https://www.retrogames.cc/embed/42146-pong.html" },
        { id: 14, title: "Missile Command", category: "Arcade", thumbnail: "https://i.imgur.com/3tW5v8Q.png", embedUrl: "https://www.retrogames.cc/embed/42147-missile-command.html" },
        { id: 15, title: "Burger Time", category: "Classic", thumbnail: "https://i.imgur.com/6kR2z9P.png", embedUrl: "https://www.retrogames.cc/embed/42148-burger-time.html" },
        { id: 16, title: "Joust", category: "Arcade", thumbnail: "https://i.imgur.com/9pY4w3T.png", embedUrl: "https://www.retrogames.cc/embed/42149-joust.html" },
        { id: 17, title: "Dig Dug", category: "Arcade", thumbnail: "https://i.imgur.com/2qT6y7R.png", embedUrl: "https://www.retrogames.cc/embed/42150-dig-dug.html" },
        { id: 18, title: "Pole Position", category: "Racing", thumbnail: "https://i.imgur.com/4mW8x5S.png", embedUrl: "https://www.retrogames.cc/embed/42151-pole-position.html" },
        { id: 19, title: "Tempest", category: "Arcade", thumbnail: "https://i.imgur.com/7vR3z8U.png", embedUrl: "https://www.retrogames.cc/embed/42152-tempest.html" },
        { id: 20, title: "Arkanoid", category: "Puzzle", thumbnail: "https://i.imgur.com/5hY9w2V.png", embedUrl: "https://www.retrogames.cc/embed/42153-arkanoid.html" },
    ];

    const categories = [...new Set(games.map(game => game.category))];

    function renderCategories() {
        categoryList.innerHTML = '';
        const allCategory = document.createElement('div');
        allCategory.classList.add('category-item', 'active');
        allCategory.textContent = 'All';
        allCategory.addEventListener('click', () => {
            document.querySelectorAll('.category-item').forEach(item => item.classList.remove('active'));
            allCategory.classList.add('active');
            renderGames(games);
        });
        categoryList.appendChild(allCategory);

        categories.forEach(category => {
            const categoryItem = document.createElement('div');
            categoryItem.classList.add('category-item');
            categoryItem.textContent = category;
            categoryItem.addEventListener('click', () => {
                document.querySelectorAll('.category-item').forEach(item => item.classList.remove('active'));
                categoryItem.classList.add('active');
                const filteredGames = games.filter(game => game.category === category);
                renderGames(filteredGames);
            });
            categoryList.appendChild(categoryItem);
        });
    }

    function renderGames(gamesToRender) {
        gameList.innerHTML = '';
        gamesToRender.forEach(game => {
            const gameCard = document.createElement('div');
            gameCard.classList.add('game-card');
            gameCard.dataset.id = game.id;
            gameCard.innerHTML = `
                <img src="${game.thumbnail}" alt="${game.title}" class="game-img" onerror="this.src='https://picsum.photos/150?random=${game.id}'">
                <h3 class="game-title">${game.title}</h3>
                <button class="play-btn">Play Now</button>
            `;
            gameList.appendChild(gameCard);
        });

        const gameCards = document.querySelectorAll('.game-card');
        gameCards.forEach(card => {
            card.addEventListener('mouseover', () => {
                gsap.to(card, { scale: 1.05, duration: 0.3, ease: 'power2.out' });
                hoverSound.play().catch(err => console.log('Hover Sound Play Failed', err));
            });
            card.addEventListener('mouseout', () => {
                gsap.to(card, { scale: 1, duration: 0.3, ease: 'power2.out' });
            });
        });

        const playButtons = document.querySelectorAll('.play-btn');
        playButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                clickSound.play().catch(err => console.log('Click Sound Play Failed', err));
                const gameId = btn.parentElement.dataset.id;
                const game = games.find(g => g.id == gameId);
                if (game.embedUrl) {
                    loadingSpinner.style.display = 'block';
                    gameFrame.src = '';
                    gameFrame.src = game.embedUrl;
                    gameMessage.textContent = '';
                    gameModal.style.display = 'block';
                    gsap.fromTo(gameModal, { opacity: 0 }, { opacity: 1, duration: 0.5, ease: 'power2.out' });
                } else {
                    loadingSpinner.style.display = 'none';
                    gameFrame.src = '';
                    gameMessage.textContent = 'This game cannot be played right now. Please try another game.';
                    gameModal.style.display = 'block';
                    gsap.fromTo(gameModal, { opacity: 0 }, { opacity: 1, duration: 0.5, ease: 'power2.out' });
                }
            });
        });
    }

    gameFrame.addEventListener('load', () => {
        loadingSpinner.style.display = 'none';
    });

    gameFrame.addEventListener('error', () => {
        loadingSpinner.style.display = 'none';
        gameMessage.textContent = 'Failed to load the game. Please try another game.';
    });

    searchBar.addEventListener('input', () => {
        const searchTerm = searchBar.value.toLowerCase();
        const filteredGames = games.filter(game => game.title.toLowerCase().includes(searchTerm));
        renderGames(filteredGames);
    });

    exitBtn.addEventListener('click', () => {
        clickSound.play().catch(err => console.log('Click Sound Play Failed', err));
        gameModal.style.display = 'none';
        gameFrame.src = '';
        loadingSpinner.style.display = 'none';
        gsap.to(gameModal, { opacity: 0, duration: 0.5, ease: 'power2.in' });
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                gsap.from(entry.target, {
                    opacity: 0,
                    y: 50,
                    duration: 1,
                    ease: 'power3.out'
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.game-card, .category-item, .section-title').forEach(el => {
        observer.observe(el);
    });

    renderCategories();
    renderGames(games);

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/service-worker.js')
            .then(reg => console.log('Service Worker Registered', reg))
            .catch(err => console.log('Service Worker Registration Failed', err));
    }
});
