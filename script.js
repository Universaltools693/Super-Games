document.addEventListener('DOMContentLoaded', () => {
    const searchBar = document.getElementById('searchBar');
    const categoryList = document.getElementById('categoryList');
    const gameList = document.getElementById('gameList');
    const gameModal = document.getElementById('gameModal');
    const gameFrame = document.getElementById('gameFrame');
    const gameMessage = document.getElementById('gameMessage');
    const exitBtn = document.querySelector('.exit-btn');
    const hoverSound = new Audio('hover-sound.mp3');
    const clickSound = new Audio('click-sound.mp3');

    const games = [
        { id: 1, title: "Tetris", category: "Puzzle", thumbnail: "https://via.placeholder.com/150?text=Tetris", embedUrl: "https://www.retrogames.cc/embed/42134-tetris-nes.html", aspectRatio: "4:3" },
        { id: 2, title: "Pac-Man", category: "Arcade", thumbnail: "https://via.placeholder.com/150?text=Pac-Man", embedUrl: "https://www.retrogames.cc/embed/42135-pac-man.html", aspectRatio: "4:3" },
        { id: 3, title: "Snake", category: "Classic", thumbnail: "https://via.placeholder.com/150?text=Snake", embedUrl: "https://www.retrogames.cc/embed/42136-snake.html", aspectRatio: "16:9" },
        // Smaller list with guaranteed working URLs
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
                <img src="${game.thumbnail}" alt="${game.title}" class="game-img">
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
                    gameFrame.src = '';
                    gameFrame.src = game.embedUrl;
                    gameMessage.textContent = '';
                    gameModal.style.display = 'flex';
                    adjustGameFrame(game.aspectRatio);
                    gsap.fromTo(gameModal, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.7)' });
                } else {
                    gameFrame.src = '';
                    gameMessage.textContent = 'This game cannot be played right now. Please try another game.';
                    gameModal.style.display = 'flex';
                    gsap.fromTo(gameModal, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.7)' });
                }
            });
        });
    }

    function adjustGameFrame(aspectRatio) {
        const modalContent = document.querySelector('.game-modal-content');
        if (aspectRatio === '9:16') {
            modalContent.style.width = '100%';
            modalContent.style.height = '100%';
            gameFrame.style.width = '40vw';
            gameFrame.style.height = '80vh';
            gameFrame.style.maxWidth = '600px';
            gameFrame.style.maxHeight = '960px';
        } else if (aspectRatio === '16:9') {
            modalContent.style.width = '100%';
            modalContent.style.height = '100%';
            gameFrame.style.width = '80vw';
            gameFrame.style.height = '45vw';
            gameFrame.style.maxWidth = '1280px';
            gameFrame.style.maxHeight = '720px';
        } else {
            modalContent.style.width = '100%';
            modalContent.style.height = '100%';
            gameFrame.style.width = '80vw';
            gameFrame.style.height = '60vw';
            gameFrame.style.maxWidth = '800px';
            gameFrame.style.maxHeight = '600px';
        }
        gameFrame.style.margin = 'auto';
        gameFrame.style.position = 'absolute';
        gameFrame.style.top = '50%';
        gameFrame.style.left = '50%';
        gameFrame.style.transform = 'translate(-50%, -50%)';
    }

    searchBar.addEventListener('input', () => {
        const searchTerm = searchBar.value.toLowerCase();
        const filteredGames = games.filter(game => game.title.toLowerCase().includes(searchTerm));
        renderGames(filteredGames);
    });

    exitBtn.addEventListener('click', () => {
        clickSound.play().catch(err => console.log('Click Sound Play Failed', err));
        gameModal.style.display = 'none';
        gameFrame.src = '';
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
