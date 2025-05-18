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
        { id: 1, title: "Tetris", category: "Puzzle", thumbnail: "https://upload.wikimedia.org/wikipedia/en/7/7b/Tetris_NES_cover_art.jpg", embedUrl: "https://www.retrogames.cc/embed/42134-tetris-nes.html", aspectRatio: "4:3" },
        { id: 2, title: "Pac-Man", category: "Arcade", thumbnail: "https://upload.wikimedia.org/wikipedia/en/1/14/Pac-man.png", embedUrl: "https://www.retrogames.cc/embed/42135-pac-man.html", aspectRatio: "4:3" },
        { id: 3, title: "Snake", category: "Classic", thumbnail: "https://upload.wikimedia.org/wikipedia/en/9/94/Snake_game_logo.png", embedUrl: "https://www.retrogames.cc/embed/42136-snake.html", aspectRatio: "16:9" },
        { id: 4, title: "Space Invaders", category: "Arcade", thumbnail: "https://upload.wikimedia.org/wikipedia/en/4/46/Space_Invaders_flyer.jpg", embedUrl: "https://www.retrogames.cc/embed/42137-space-invaders.html", aspectRatio: "4:3" },
        { id: 5, title: "Galaga", category: "Arcade", thumbnail: "https://upload.wikimedia.org/wikipedia/en/2/24/Galaga_arcade_flyer.jpg", embedUrl: "https://www.retrogames.cc/embed/42138-galaga.html", aspectRatio: "4:3" },
        { id: 6, title: "Donkey Kong", category: "Classic", thumbnail: "https://upload.wikimedia.org/wikipedia/en/1/1a/Donkey_Kong_flyer.jpg", embedUrl: "https://www.retrogames.cc/embed/42139-donkey-kong.html", aspectRatio: "4:3" },
        { id: 7, title: "Frogger", category: "Classic", thumbnail: "https://upload.wikimedia.org/wikipedia/en/5/5e/Frogger_arcade_flyer.jpg", embedUrl: "https://www.retrogames.cc/embed/42140-frogger.html", aspectRatio: "4:3" },
        { id: 8, title: "Centipede", category: "Arcade", thumbnail: "https://upload.wikimedia.org/wikipedia/en/2/27/Centipede_flyer.jpg", embedUrl: "https://www.retrogames.cc/embed/42141-centipede.html", aspectRatio: "4:3" },
        { id: 9, title: "Asteroids", category: "Arcade", thumbnail: "https://upload.wikimedia.org/wikipedia/en/8/8d/Asteroids_flyer.jpg", embedUrl: "https://www.retrogames.cc/embed/42142-asteroids.html", aspectRatio: "4:3" },
        { id: 10, title: "Breakout", category: "Puzzle", thumbnail: "https://upload.wikimedia.org/wikipedia/en/2/29/Breakout_flyer.jpg", embedUrl: "https://www.retrogames.cc/embed/42143-breakout.html", aspectRatio: "4:3" },
        { id: 11, title: "Defender", category: "Arcade", thumbnail: "https://upload.wikimedia.org/wikipedia/en/6/6a/Defender_flyer.jpg", embedUrl: "https://www.retrogames.cc/embed/42144-defender.html", aspectRatio: "4:3" },
        { id: 12, title: "Q*bert", category: "Puzzle", thumbnail: "https://upload.wikimedia.org/wikipedia/en/1/1e/Qbert_flyer.jpg", embedUrl: "https://www.retrogames.cc/embed/42145-q-bert.html", aspectRatio: "4:3" },
        { id: 13, title: "Pong", category: "Classic", thumbnail: "https://upload.wikimedia.org/wikipedia/en/1/1e/Pong_flyer.jpg", embedUrl: "https://www.retrogames.cc/embed/42146-pong.html", aspectRatio: "4:3" },
        { id: 14, title: "Missile Command", category: "Arcade", thumbnail: "https://upload.wikimedia.org/wikipedia/en/5/5f/Missile_Command_flyer.jpg", embedUrl: "https://www.retrogames.cc/embed/42147-missile-command.html", aspectRatio: "4:3" },
        { id: 15, title: "Burger Time", category: "Classic", thumbnail: "https://upload.wikimedia.org/wikipedia/en/8/8b/Burger_Time_flyer.jpg", embedUrl: "https://www.retrogames.cc/embed/42148-burger-time.html", aspectRatio: "4:3" },
        { id: 16, title: "Joust", category: "Arcade", thumbnail: "https://upload.wikimedia.org/wikipedia/en/9/9e/Joust_flyer.jpg", embedUrl: "https://www.retrogames.cc/embed/42149-joust.html", aspectRatio: "4:3" },
        { id: 17, title: "Dig Dug", category: "Arcade", thumbnail: "https://upload.wikimedia.org/wikipedia/en/3/3b/Dig_Dug_flyer.jpg", embedUrl: "https://www.retrogames.cc/embed/42150-dig-dug.html", aspectRatio: "4:3" },
        { id: 18, title: "Pole Position", category: "Racing", thumbnail: "https://upload.wikimedia.org/wikipedia/en/7/7e/Pole_Position_flyer.jpg", embedUrl: "https://www.retrogames.cc/embed/42151-pole-position.html", aspectRatio: "4:3" },
        { id: 19, title: "Tempest", category: "Arcade", thumbnail: "https://upload.wikimedia.org/wikipedia/en/5/5e/Tempest_flyer.jpg", embedUrl: "https://www.retrogames.cc/embed/42152-tempest.html", aspectRatio: "4:3" },
        { id: 20, title: "Arkanoid", category: "Puzzle", thumbnail: "https://upload.wikimedia.org/wikipedia/en/0/0c/Arkanoid_flyer.jpg", embedUrl: "https://www.retrogames.cc/embed/42153-arkanoid.html", aspectRatio: "4:3" },
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
                <img src="${game.thumbnail}" alt="${game.title}" class="game-img" onerror="this.src='https://via.placeholder.com/150?text=Game+Thumbnail'">
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
                    gameFrame.setAttribute('data-aspect', game.aspectRatio);
                    gameMessage.textContent = '';
                    gameModal.style.display = 'flex';
                    gsap.fromTo(gameModal, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.7)' });
                } else {
                    loadingSpinner.style.display = 'none';
                    gameFrame.src = '';
                    gameMessage.textContent = 'This game cannot be played right now. Please try another game.';
                    gameModal.style.display = 'flex';
                    gsap.fromTo(gameModal, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.7)' });
                }
            });
        });
    }

    gameFrame.addEventListener('load', () => {
        loadingSpinner.style.display = 'none';
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
        gsap.to(gameModal, { opacity: 0, scale: 0.8, duration: 0.5, ease: 'back.in(1.7)' });
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
