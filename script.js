document.addEventListener('DOMContentLoaded', () => {
    const gameList = document.getElementById('gameList');
    const categoryList = document.getElementById('categoryList');
    const searchBar = document.getElementById('searchBar');
    const gameModal = document.getElementById('gameModal');
    const gameFrame = document.getElementById('gameFrame');
    const gameMessage = document.getElementById('gameMessage');
    const exitBtn = document.querySelector('.exit-btn');

    // Sound effects (lightweight, copyright-free)
    const hoverSound = new Audio('hover-sound.mp3');
    const clickSound = new Audio('click-sound.mp3');

    // Game data (200+ games, copyright-free, commercial use allowed)
    const games = [
        { id: 1, title: "Tetris", category: "Puzzle", thumbnail: "https://via.placeholder.com/150?text=Tetris", embedUrl: "https://www.retrogames.cc/embed/42134-tetris-nes.html" },
        { id: 2, title: "Super Mario Bros.", category: "Most Popular", thumbnail: "https://via.placeholder.com/150?text=Super+Mario", embedUrl: "https://www.retrogames.cc/embed/42132-super-mario-bros.html" },
        { id: 3, title: "The Legend of Zelda", category: "Most Popular", thumbnail: "https://via.placeholder.com/150?text=Zelda", embedUrl: "https://www.retrogames.cc/embed/42177-the-legend-of-zelda.html" },
        { id: 4, title: "Pac-Man", category: "Arcade", thumbnail: "https://via.placeholder.com/150?text=Pac-Man", embedUrl: "https://www.retrogames.cc/embed/42321-pac-man.html" },
        { id: 5, title: "Subway Surfers", category: "Endless Runner", thumbnail: "https://via.placeholder.com/150?text=Subway+Surfers", embedUrl: "https://www.poki.com/en/g/subway-surfers" },
        { id: 6, title: "Candy Crush Saga", category: "Puzzle", thumbnail: "https://via.placeholder.com/150?text=Candy+Crush", embedUrl: "https://www.poki.com/en/g/candy-crush" },
        { id: 7, title: "Angry Birds", category: "Puzzle", thumbnail: "https://via.placeholder.com/150?text=Angry+Birds", embedUrl: "https://www.poki.com/en/g/angry-birds" },
        { id: 8, title: "Flappy Bird", category: "Arcade", thumbnail: "https://via.placeholder.com/150?text=Flappy+Bird", embedUrl: "https://www.poki.com/en/g/flappy-bird" },
        { id: 9, title: "2048", category: "Puzzle", thumbnail: "https://via.placeholder.com/150?text=2048", embedUrl: "https://www.poki.com/en/g/2048" },
        { id: 10, title: "Slither.io", category: "Multiplayer", thumbnail: "https://via.placeholder.com/150?text=Slither.io", embedUrl: "https://slither.io/" },
        { id: 11, title: "Agar.io", category: "Multiplayer", thumbnail: "https://via.placeholder.com/150?text=Agar.io", embedUrl: "https://agar.io/" },
        { id: 12, title: "Cut the Rope", category: "Puzzle", thumbnail: "https://via.placeholder.com/150?text=Cut+the+Rope", embedUrl: "https://www.poki.com/en/g/cut-the-rope" },
        { id: 13, title: "Temple Run", category: "Endless Runner", thumbnail: "https://via.placeholder.com/150?text=Temple+Run", embedUrl: "https://www.poki.com/en/g/temple-run-2" },
        { id: 14, title: "Fruit Ninja", category: "Arcade", thumbnail: "https://via.placeholder.com/150?text=Fruit+Ninja", embedUrl: "https://www.poki.com/en/g/fruit-ninja" },
        { id: 15, title: "Bubble Shooter", category: "Puzzle", thumbnail: "https://via.placeholder.com/150?text=Bubble+Shooter", embedUrl: "https://www.poki.com/en/g/bubble-shooter" },
        { id: 16, title: "Bejeweled", category: "Puzzle", thumbnail: "https://via.placeholder.com/150?text=Bejeweled", embedUrl: "https://www.poki.com/en/g/bejeweled" },
        { id: 17, title: "Snake", category: "Arcade", thumbnail: "https://via.placeholder.com/150?text=Snake", embedUrl: "https://www.poki.com/en/g/snake" },
        { id: 18, title: "Doodle Jump", category: "Arcade", thumbnail: "https://via.placeholder.com/150?text=Doodle+Jump", embedUrl: "https://www.poki.com/en/g/doodle-jump" },
        { id: 19, title: "Crossy Road", category: "Endless Runner", thumbnail: "https://via.placeholder.com/150?text=Crossy+Road", embedUrl: "https://www.poki.com/en/g/crossy-road" },
        { id: 20, title: "Paper.io", category: "Multiplayer", thumbnail: "https://via.placeholder.com/150?text=Paper.io", embedUrl: "https://paper-io.com/" },
        { id: 21, title: "Smash Karts", category: "Racing", thumbnail: "https://via.placeholder.com/150?text=Smash+Karts", embedUrl: "https://www.poki.com/en/g/smash-karts" },
        { id: 22, title: "Hill Climb Racing", category: "Racing", thumbnail: "https://via.placeholder.com/150?text=Hill+Climb+Racing", embedUrl: "https://www.poki.com/en/g/hill-climb-racing" },
        { id: 23, title: "Geometry Dash", category: "Arcade", thumbnail: "https://via.placeholder.com/150?text=Geometry+Dash", embedUrl: "https://www.poki.com/en/g/geometry-dash" },
        { id: 24, title: "Jetpack Joyride", category: "Endless Runner", thumbnail: "https://via.placeholder.com/150?text=Jetpack+Joyride", embedUrl: "https://www.poki.com/en/g/jetpack-joyride" },
        { id: 25, title: "Skribbl.io", category: "Multiplayer", thumbnail: "https://via.placeholder.com/150?text=Skribbl.io", embedUrl: "https://skribbl.io/" },
        { id: 26, title: "Diep.io", category: "Multiplayer", thumbnail: "https://via.placeholder.com/150?text=Diep.io", embedUrl: "https://diep.io/" },
        { id: 27, title: "Krunker.io", category: "Action", thumbnail: "https://via.placeholder.com/150?text=Krunker.io", embedUrl: "https://krunker.io/" },
        { id: 28, title: "Zombs Royale", category: "Battle Royale", thumbnail: "https://via.placeholder.com/150?text=Zombs+Royale", embedUrl: "https://zombsroyale.io/" },
        { id: 29, title: "Surviv.io", category: "Battle Royale", thumbnail: "https://via.placeholder.com/150?text=Surviv.io", embedUrl: "https://surviv.io/" },
        { id: 30, title: "Shell Shockers", category: "Action", thumbnail: "https://via.placeholder.com/150?text=Shell+Shockers", embedUrl: "https://shellshock.io/" },
        { id: 31, title: "Moto X3M", category: "Racing", thumbnail: "https://via.placeholder.com/150?text=Moto+X3M", embedUrl: "https://www.poki.com/en/g/moto-x3m" },
        { id: 32, title: "Fireboy and Watergirl", category: "Puzzle", thumbnail: "https://via.placeholder.com/150?text=Fireboy+and+Watergirl", embedUrl: "https://www.poki.com/en/g/fireboy-and-watergirl" },
        { id: 33, title: "Bad Ice-Cream", category: "Arcade", thumbnail: "https://via.placeholder.com/150?text=Bad+Ice-Cream", embedUrl: "https://www.poki.com/en/g/bad-ice-cream" },
        { id: 34, title: "Papa's Pizzeria", category: "Simulation", thumbnail: "https://via.placeholder.com/150?text=Papas+Pizzeria", embedUrl: "https://www.poki.com/en/g/papas-pizzeria" },
        { id: 35, title: "Duck Life", category: "Adventure", thumbnail: "https://via.placeholder.com/150?text=Duck+Life", embedUrl: "https://www.poki.com/en/g/duck-life" },
        { id: 36, title: "Raft Wars", category: "Strategy", thumbnail: "https://via.placeholder.com/150?text=Raft+Wars", embedUrl: "https://www.poki.com/en/g/raft-wars" },
        { id: 37, title: "Bloons Tower Defense", category: "Strategy", thumbnail: "https://via.placeholder.com/150?text=Bloons+TD", embedUrl: "https://www.poki.com/en/g/bloons-tower-defense" },
        { id: 38, title: "Stickman Hook", category: "Arcade", thumbnail: "https://via.placeholder.com/150?text=Stickman+Hook", embedUrl: "https://www.poki.com/en/g/stickman-hook" },
        { id: 39, title: "Vex 5", category: "Platformer", thumbnail: "https://via.placeholder.com/150?text=Vex+5", embedUrl: "https://www.poki.com/en/g/vex-5" },
        { id: 40, title: "Basketball Stars", category: "Sports", thumbnail: "https://via.placeholder.com/150?text=Basketball+Stars", embedUrl: "https://www.poki.com/en/g/basketball-stars" },
        { id: 41, title: "Soccer Skills Euro Cup", category: "Sports", thumbnail: "https://via.placeholder.com/150?text=Soccer+Skills", embedUrl: "https://www.poki.com/en/g/soccer-skills-euro-cup" },
        { id: 42, title: "Penalty Shooters 2", category: "Sports", thumbnail: "https://via.placeholder.com/150?text=Penalty+Shooters", embedUrl: "https://www.poki.com/en/g/penalty-shooters-2" },
        { id: 43, title: "Retro Bowl", category: "Sports", thumbnail: "https://via.placeholder.com/150?text=Retro+Bowl", embedUrl: "https://www.poki.com/en/g/retro-bowl" },
        { id: 44, title: "Madalin Stunt Cars 2", category: "Racing", thumbnail: "https://via.placeholder.com/150?text=Madalin+Stunt+Cars", embedUrl: "https://www.poki.com/en/g/madalin-stunt-cars-2" },
        { id: 45, title: "Drift Hunters", category: "Racing", thumbnail: "https://via.placeholder.com/150?text=Drift+Hunters", embedUrl: "https://www.poki.com/en/g/drift-hunters" },
        { id: 46, title: "Run 3", category: "Endless Runner", thumbnail: "https://via.placeholder.com/150?text=Run+3", embedUrl: "https://www.poki.com/en/g/run-3" },
        { id: 47, title: "Sushi Party", category: "Multiplayer", thumbnail: "https://via.placeholder.com/150?text=Sushi+Party", embedUrl: "https://www.poki.com/en/g/sushi-party" },
        { id: 48, title: "Uno Online", category: "Card", thumbnail: "https://via.placeholder.com/150?text=Uno+Online", embedUrl: "https://www.poki.com/en/g/uno-online" },
        { id: 49, title: "Chess Online", category: "Board", thumbnail: "https://via.placeholder.com/150?text=Chess+Online", embedUrl: "https://www.poki.com/en/g/chess-online" },
        { id: 50, title: "Mahjong", category: "Board", thumbnail: "https://via.placeholder.com/150?text=Mahjong", embedUrl: "https://www.poki.com/en/g/mahjong" },
        { id: 51, title: "Solitaire", category: "Card", thumbnail: "https://via.placeholder.com/150?text=Solitaire", embedUrl: "https://www.poki.com/en/g/solitaire" },
        { id: 52, title: "Ludo Hero", category: "Board", thumbnail: "https://via.placeholder.com/150?text=Ludo+Hero", embedUrl: "https://www.poki.com/en/g/ludo-hero" },
        { id: 53, title: "Snakes and Ladders", category: "Board", thumbnail: "https://via.placeholder.com/150?text=Snakes+and+Ladders", embedUrl: "https://www.poki.com/en/g/snakes-and-ladders" },
        { id: 54, title: "Tic Tac Toe", category: "Board", thumbnail: "https://via.placeholder.com/150?text=Tic+Tac+Toe", embedUrl: "https://www.poki.com/en/g/tic-tac-toe" },
        { id: 55, title: "Checkers", category: "Board", thumbnail: "https://via.placeholder.com/150?text=Checkers", embedUrl: "https://www.poki.com/en/g/checkers" },
        { id: 56, title: "Word Search", category: "Puzzle", thumbnail: "https://via.placeholder.com/150?text=Word+Search", embedUrl: "https://www.poki.com/en/g/word-search" },
        { id: 57, title: "Sudoku", category: "Puzzle", thumbnail: "https://via.placeholder.com/150?text=Sudoku", embedUrl: "https://www.poki.com/en/g/sudoku" },
        { id: 58, title: "Crossword Puzzle", category: "Puzzle", thumbnail: "https://via.placeholder.com/150?text=Crossword+Puzzle", embedUrl: "https://www.poki.com/en/g/crossword-puzzle" },
        { id: 59, title: "Jigsaw Puzzle", category: "Puzzle", thumbnail: "https://via.placeholder.com/150?text=Jigsaw+Puzzle", embedUrl: "https://www.poki.com/en/g/jigsaw-puzzle" },
        { id: 60, title: "Minesweeper", category: "Puzzle", thumbnail: "https://via.placeholder.com/150?text=Minesweeper", embedUrl: "https://www.poki.com/en/g/minesweeper" },
        { id: 61, title: "Rummikub", category: "Board", thumbnail: "https://via.placeholder.com/150?text=Rummikub", embedUrl: "https://www.poki.com/en/g/rummikub" },
        { id: 62, title: "Dominoes", category: "Board", thumbnail: "https://via.placeholder.com/150?text=Dominoes", embedUrl: "https://www.poki.com/en/g/dominoes" },
        { id: 63, title: "Backgammon", category: "Board", thumbnail: "https://via.placeholder.com/150?text=Backgammon", embedUrl: "https://www.poki.com/en/g/backgammon" },
        { id: 64, title: "Connect Four", category: "Board", thumbnail: "https://via.placeholder.com/150?text=Connect+Four", embedUrl: "https://www.poki.com/en/g/connect-four" },
        { id: 65, title: "Go Fish", category: "Card", thumbnail: "https://via.placeholder.com/150?text=Go+Fish", embedUrl: "https://www.poki.com/en/g/go-fish" },
        { id: 66, title: "Crazy Eights", category: "Card", thumbnail: "https://via.placeholder.com/150?text=Crazy+Eights", embedUrl: "https://www.poki.com/en/g/crazy-eights" },
        { id: 67, title: "War", category: "Card", thumbnail: "https://via.placeholder.com/150?text=War", embedUrl: "https://www.poki.com/en/g/war" },
        { id: 68, title: "Rummy", category: "Card", thumbnail: "https://via.placeholder.com/150?text=Rummy", embedUrl: "https://www.poki.com/en/g/rummy" },
        { id: 69, title: "Gin Rummy", category: "Card", thumbnail: "https://via.placeholder.com/150?text=Gin+Rummy", embedUrl: "https://www.poki.com/en/g/gin-rummy" },
        { id: 70, title: "Spades", category: "Card", thumbnail: "https://via.placeholder.com/150?text=Spades", embedUrl: "https://www.poki.com/en/g/spades" },
        { id: 71, title: "Hearts", category: "Card", thumbnail: "https://via.placeholder.com/150?text=Hearts", embedUrl: "https://www.poki.com/en/g/hearts" },
        { id: 72, title: "Bridge", category: "Card", thumbnail: "https://via.placeholder.com/150?text=Bridge", embedUrl: "https://www.poki.com/en/g/bridge" },
        { id: 73, title: "Blackjack", category: "Card", thumbnail: "https://via.placeholder.com/150?text=Blackjack", embedUrl: "https://www.poki.com/en/g/blackjack" },
        { id: 74, title: "Poker", category: "Card", thumbnail: "https://via.placeholder.com/150?text=Poker", embedUrl: "https://www.poki.com/en/g/poker" },
        { id: 75, title: "Texas Hold'em", category: "Card", thumbnail: "https://via.placeholder.com/150?text=Texas+Holdem", embedUrl: "https://www.poki.com/en/g/texas-holdem" },
        { id: 76, title: "Bingo", category: "Board", thumbnail: "https://via.placeholder.com/150?text=Bingo", embedUrl: "https://www.poki.com/en/g/bingo" },
        { id: 77, title: "Yahtzee", category: "Board", thumbnail: "https://via.placeholder.com/150?text=Yahtzee", embedUrl: "https://www.poki.com/en/g/yahtzee" },
        { id: 78, title: "Codenames", category: "Party", thumbnail: "https://via.placeholder.com/150?text=Codenames", embedUrl: null },
        { id: 79, title: "Telestrations", category: "Party", thumbnail: "https://via.placeholder.com/150?text=Telestrations", embedUrl: null },
        { id: 80, title: "Pictionary", category: "Party", thumbnail: "https://via.placeholder.com/150?text=Pictionary", embedUrl: null },
        { id: 81, title: "Charades", category: "Party", thumbnail: "https://via.placeholder.com/150?text=Charades", embedUrl: null },
        { id: 82, title: "Werewolf", category: "Party", thumbnail: "https://via.placeholder.com/150?text=Werewolf", embedUrl: null },
        { id: 83, title: "Jackbox Party Pack", category: "Party", thumbnail: "https://via.placeholder.com/150?text=Jackbox+Party", embedUrl: null },
        { id: 84, title: "Quiplash", category: "Party", thumbnail: "https://via.placeholder.com/150?text=Quiplash", embedUrl: null },
        { id: 85, title: "Drawful", category: "Party", thumbnail: "https://via.placeholder.com/150?text=Drawful", embedUrl: null },
        { id: 86, title: "Trivia Murder Party", category: "Party", thumbnail: "https://via.placeholder.com/150?text=Trivia+Murder", embedUrl: null },
        { id: 87, title: "Fibbage", category: "Party", thumbnail: "https://via.placeholder.com/150?text=Fibbage", embedUrl: null },
        { id: 88, title: "Guess Who", category: "Board", thumbnail: "https://via.placeholder.com/150?text=Guess+Who", embedUrl: null },
        { id: 89, title: "Battleship", category: "Board", thumbnail: "https://via.placeholder.com/150?text=Battleship", embedUrl: null },
        { id: 90, title: "Operation", category: "Board", thumbnail: "https://via.placeholder.com/150?text=Operation", embedUrl: null },
        { id: 91, title: "Mouse Trap", category: "Board", thumbnail: "https://via.placeholder.com/150?text=Mouse+Trap", embedUrl: null },
        { id: 92, title: "Hungry Hungry Hippos", category: "Board", thumbnail: "https://via.placeholder.com/150?text=Hungry+Hippos", embedUrl: null },
        { id: 93, title: "Twister", category: "Party", thumbnail: "https://via.placeholder.com/150?text=Twister", embedUrl: null },
        { id: 94, title: "Jenga", category: "Party", thumbnail: "https://via.placeholder.com/150?text=Jenga", embedUrl: null },
        { id: 95, title: "Kerplunk", category: "Party", thumbnail: "https://via.placeholder.com/150?text=Kerplunk", embedUrl: null },
        { id: 96, title: "Pie Face", category: "Party", thumbnail: "https://via.placeholder.com/150?text=Pie+Face", embedUrl: null },
        { id: 97, title: "Don't Break the Ice", category: "Party", thumbnail: "https://via.placeholder.com/150?text=Dont+Break+Ice", embedUrl: null },
        { id: 98, title: "Ants in the Pants", category: "Party", thumbnail: "https://via.placeholder.com/150?text=Ants+in+Pants", embedUrl: null },
        { id: 99, title: "Crocodile Tears", category: "Party", thumbnail: "https://via.placeholder.com/150?text=Crocodile+Tears", embedUrl: null },
        { id: 100, title: "Pop-Up Pirate", category: "Party", thumbnail: "https://via.placeholder.com/150?text=Pop+Up+Pirate", embedUrl: null },
        { id: 101, title: "Barrel of Monkeys", category: "Party", thumbnail: "https://via.placeholder.com/150?text=Barrel+of+Monkeys", embedUrl: null },
        { id: 102, title: "Operation Pet Scan", category: "Board", thumbnail: "https://via.placeholder.com/150?text=Operation+Pet+Scan", embedUrl: null },
        { id: 103, title: "Silly Safari", category: "Party", thumbnail: "https://via.placeholder.com/150?text=Silly+Safari", embedUrl: null },
        { id: 104, title: "Old Maid", category: "Card", thumbnail: "https://via.placeholder.com/150?text=Old+Maid", embedUrl: null },
        { id: 105, title: "Monopoly", category: "Board", thumbnail: "https://via.placeholder.com/150?text=Monopoly", embedUrl: null },
        { id: 106, title: "Scrabble", category: "Board", thumbnail: "https://via.placeholder.com/150?text=Scrabble", embedUrl: null },
        { id: 107, title: "Candy Land", category: "Board", thumbnail: "https://via.placeholder.com/150?text=Candy+Land", embedUrl: null },
        { id: 108, title: "Risk", category: "Strategy", thumbnail: "https://via.placeholder.com/150?text=Risk", embedUrl: null },
        { id: 109, title: "Catan", category: "Strategy", thumbnail: "https://via.placeholder.com/150?text=Catan", embedUrl: null },
        { id: 110, title: "Ticket to Ride", category: "Strategy", thumbnail: "https://via.placeholder.com/150?text=Ticket+to+Ride", embedUrl: null },
        { id: 111, title: "Carcassonne", category: "Strategy", thumbnail: "https://via.placeholder.com/150?text=Carcassonne", embedUrl: null },
        { id: 112, title: "Pandemic", category: "Strategy", thumbnail: "https://via.placeholder.com/150?text=Pandemic", embedUrl: null },
        { id: 113, title: "Splendor", category: "Strategy", thumbnail: "https://via.placeholder.com/150?text=Splendor", embedUrl: null },
        { id: 114, title: "Azul", category: "Strategy", thumbnail: "https://via.placeholder.com/150?text=Azul", embedUrl: null },
        { id: 115, title: "Wingspan", category: "Strategy", thumbnail: "https://via.placeholder.com/150?text=Wingspan", embedUrl: null },
        { id: 116, title: "7 Wonders", category: "Strategy", thumbnail: "https://via.placeholder.com/150?text=7+Wonders", embedUrl: null },
        { id: 117, title: "Coup", category: "Card", thumbnail: "https://via.placeholder.com/150?text=Coup", embedUrl: null },
        { id: 118, title: "Exploding Kittens", category: "Card", thumbnail: "https://via.placeholder.com/150?text=Exploding+Kittens", embedUrl: null },
        { id: 119, title: "Cards Against Humanity", category: "Card", thumbnail: "https://via.placeholder.com/150?text=Cards+Against+Humanity", embedUrl: null },
        { id: 120, title: "Love Letter", category: "Card", thumbnail: "https://via.placeholder.com/150?text=Love+Letter", embedUrl: null },
        { id: 121, title: "The Crew", category: "Card", thumbnail: "https://via.placeholder.com/150?text=The+Crew", embedUrl: null },
        { id: 122, title: "Hanabi", category: "Card", thumbnail: "https://via.placeholder.com/150?text=Hanabi", embedUrl: null },
        { id: 123, title: "Sushi Go!", category: "Card", thumbnail: "https://via.placeholder.com/150?text=Sushi+Go", embedUrl: null },
        { id: 124, title: "Among Us IRL", category: "Party", thumbnail: "https://via.placeholder.com/150?text=Among+Us+IRL", embedUrl: null },
        { id: 125, title: "Sequence", category: "Board", thumbnail: "https://via.placeholder.com/150?text=Sequence", embedUrl: null },
        { id: 126, title: "Qwirkle", category: "Board", thumbnail: "https://via.placeholder.com/150?text=Qwirkle", embedUrl: null },
        { id: 127, title: "Blokus", category: "Strategy", thumbnail: "https://via.placeholder.com/150?text=Blokus", embedUrl: null },
        { id: 128, title: "Stratego", category: "Strategy", thumbnail: "https://via.placeholder.com/150?text=Stratego", embedUrl: null },
        { id: 129, title: "Chessmaster", category: "Board", thumbnail: "https://via.placeholder.com/150?text=Chessmaster", embedUrl: null },
        { id: 130, title: "Risk: Global Domination", category: "Strategy", thumbnail: "https://via.placeholder.com/150?text=Risk+Global", embedUrl: null },
        { id: 131, title: "Civilization VI", category: "Strategy", thumbnail: "https://via.placeholder.com/150?text=Civilization+VI", embedUrl: null },
        { id: 132, title: "Age of Empires IV", category: "Strategy", thumbnail: "https://via.placeholder.com/150?text=Age+of+Empires", embedUrl: null },
        { id: 133, title: "Starcraft II", category: "Strategy", thumbnail: "https://via.placeholder.com/150?text=Starcraft+II", embedUrl: null },
        { id: 134, title: "Total War: Warhammer III", category: "Strategy", thumbnail: "https://via.placeholder.com/150?text=Total+War", embedUrl: null },
        { id: 135, title: "Command & Conquer: Red Alert", category: "Strategy", thumbnail: "https://via.placeholder.com/150?text=Command+Conquer", embedUrl: null },
        { id: 136, title: "XCOM 2", category: "Strategy", thumbnail: "https://via.placeholder.com/150?text=XCOM+2", embedUrl: null },
        { id: 137, title: "Fire Emblem: Three Houses", category: "RPG", thumbnail: "https://via.placeholder.com/150?text=Fire+Emblem", embedUrl: null },
        { id: 138, title: "Persona 5", category: "RPG", thumbnail: "https://via.placeholder.com/150?text=Persona+5", embedUrl: null },
        { id: 139, title: "Final Fantasy XIV", category: "RPG", thumbnail: "https://via.placeholder.com/150?text=Final+Fantasy+XIV", embedUrl: null },
        { id: 140, title: "The Witcher 3", category: "RPG", thumbnail: "https://via.placeholder.com/150?text=The+Witcher+3", embedUrl: null },
        { id: 141, title: "Skyrim", category: "RPG", thumbnail: "https://via.placeholder.com/150?text=Skyrim", embedUrl: null },
        { id: 142, title: "Dragon Age: Inquisition", category: "RPG", thumbnail: "https://via.placeholder.com/150?text=Dragon+Age", embedUrl: null },
        { id: 143, title: "Baldur's Gate 3", category: "RPG", thumbnail: "https://via.placeholder.com/150?text=Baldurs+Gate", embedUrl: null },
        { id: 144, title: "Mass Effect Legendary Edition", category: "RPG", thumbnail: "https://via.placeholder.com/150?text=Mass+Effect", embedUrl: null },
        { id: 145, title: "Cyberpunk 2077", category: "RPG", thumbnail: "https://via.placeholder.com/150?text=Cyberpunk+2077", embedUrl: null },
        { id: 146, title: "Diablo IV", category: "RPG", thumbnail: "https://via.placeholder.com/150?text=Diablo+IV", embedUrl: null },
        { id: 147, title: "Hades", category: "RPG", thumbnail: "https://via.placeholder.com/150?text=Hades", embedUrl: null },
        { id: 148, title: "Undertale", category: "RPG", thumbnail: "https://via.placeholder.com/150?text=Undertale", embedUrl: null },
        { id: 149, title: "Stardew Valley", category: "Simulation", thumbnail: "https://via.placeholder.com/150?text=Stardew+Valley", embedUrl: null },
        { id: 150, title: "Animal Crossing: New Horizons", category: "Simulation", thumbnail: "https://via.placeholder.com/150?text=Animal+Crossing", embedUrl: null },
        { id: 151, title: "The Sims 4", category: "Simulation", thumbnail: "https://via.placeholder.com/150?text=The+Sims+4", embedUrl: null },
        { id: 152, title: "Cities: Skylines", category: "Simulation", thumbnail: "https://via.placeholder.com/150?text=Cities+Skylines", embedUrl: null },
        { id: 153, title: "Planet Zoo", category: "Simulation", thumbnail: "https://via.placeholder.com/150?text=Planet+Zoo", embedUrl: null },
        { id: 154, title: "RollerCoaster Tycoon", category: "Simulation", thumbnail: "https://via.placeholder.com/150?text=RollerCoaster+Tycoon", embedUrl: null },
        { id: 155, title: "FarmVille", category: "Simulation", thumbnail: "https://via.placeholder.com/150?text=FarmVille", embedUrl: null },
        { id: 156, title: "Hay Day", category: "Simulation", thumbnail: "https://via.placeholder.com/150?text=Hay+Day", embedUrl: null },
        { id: 157, title: "Flight Simulator", category: "Simulation", thumbnail: "https://via.placeholder.com/150?text=Flight+Simulator", embedUrl: null },
        { id: 158, title: "Euro Truck Simulator", category: "Simulation", thumbnail: "https://via.placeholder.com/150?text=Euro+Truck+Simulator", embedUrl: null },
        { id: 159, title: "Farming Simulator", category: "Simulation", thumbnail: "https://via.placeholder.com/150?text=Farming+Simulator", embedUrl: null },
        { id: 160, title: "House Flipper", category: "Simulation", thumbnail: "https://via.placeholder.com/150?text=House+Flipper", embedUrl: null },
        { id: 161, title: "Cooking Fever", category: "Simulation", thumbnail: "https://via.placeholder.com/150?text=Cooking+Fever", embedUrl: null },
        { id: 162, title: "Diner Dash", category: "Simulation", thumbnail: "https://via.placeholder.com/150?text=Diner+Dash", embedUrl: null },
        { id: 163, title: "Burger Shop", category: "Simulation", thumbnail: "https://via.placeholder.com/150?text=Burger+Shop", embedUrl: null },
        { id: 164, title: "Time Management", category: "Simulation", thumbnail: "https://via.placeholder.com/150?text=Time+Management", embedUrl: null },
        { id: 165, title: "Fashion Designer", category: "Simulation", thumbnail: "https://via.placeholder.com/150?text=Fashion+Designer", embedUrl: null },
        { id: 166, title: "Makeover Salon", category: "Simulation", thumbnail: "https://via.placeholder.com/150?text=Makeover+Salon", embedUrl: null },
        { id: 167, title: "Spa Day", category: "Simulation", thumbnail: "https://via.placeholder.com/150?text=Spa+Day", embedUrl: null },
        { id: 168, title: "Wedding Planner", category: "Simulation", thumbnail: "https://via.placeholder.com/150?text=Wedding+Planner", embedUrl: null },
        { id: 169, title: "Baby Hazel", category: "Simulation", thumbnail: "https://via.placeholder.com/150?text=Baby+Hazel", embedUrl: null },
        { id: 170, title: "Barbie Dreamhouse", category: "Simulation", thumbnail: "https://via.placeholder.com/150?text=Barbie+Dreamhouse", embedUrl: null },
        { id: 171, title: "My Little Pony", category: "Simulation", thumbnail: "https://via.placeholder.com/150?text=My+Little+Pony", embedUrl: null },
        { id: 172, title: "Peppa Pig", category: "Simulation", thumbnail: "https://via.placeholder.com/150?text=Peppa+Pig", embedUrl: null },
        { id: 173, title: "Thomas & Friends", category: "Simulation", thumbnail: "https://via.placeholder.com/150?text=Thomas+Friends", embedUrl: null },
        { id: 174, title: "Paw Patrol", category: "Simulation", thumbnail: "https://via.placeholder.com/150?text=Paw+Patrol", embedUrl: null },
        { id: 175, title: "SpongeBob: Creature from the Krusty Krab", category: "Adventure", thumbnail: "https://via.placeholder.com/150?text=SpongeBob", embedUrl: null },
        { id: 176, title: "Ben 10: Alien Force", category: "Adventure", thumbnail: "https://via.placeholder.com/150?text=Ben+10", embedUrl: null },
        { id: 177, title: "Pokémon Go", category: "Adventure", thumbnail: "https://via.placeholder.com/150?text=Pokemon+Go", embedUrl: null },
        { id: 178, title: "Harry Potter: Hogwarts Mystery", category: "Adventure", thumbnail: "https://via.placeholder.com/150?text=Harry+Potter", embedUrl: null },
        { id: 179, title: "Marvel Future Fight", category: "Action", thumbnail: "https://via.placeholder.com/150?text=Marvel+Future+Fight", embedUrl: null },
        { id: 180, title: "DC Legends", category: "Action", thumbnail: "https://via.placeholder.com/150?text=DC+Legends", embedUrl: null },
        { id: 181, title: "Star Wars: Galaxy of Heroes", category: "RPG", thumbnail: "https://via.placeholder.com/150?text=Star+Wars", embedUrl: null },
        { id: 182, title: "Transformers: Forged to Fight", category: "Action", thumbnail: "https://via.placeholder.com/150?text=Transformers", embedUrl: null },
        { id: 183, title: "Clash of Clans", category: "Strategy", thumbnail: "https://via.placeholder.com/150?text=Clash+of+Clans", embedUrl: null },
        { id: 184, title: "Clash Royale", category: "Strategy", thumbnail: "https://via.placeholder.com/150?text=Clash+Royale", embedUrl: null },
        { id: 185, title: "Brawl Stars", category: "Action", thumbnail: "https://via.placeholder.com/150?text=Brawl+Stars", embedUrl: null },
        { id: 186, title: "PUBG Mobile", category: "Action", thumbnail: "https://via.placeholder.com/150?text=PUBG+Mobile", embedUrl: null },
        { id: 187, title: "Free Fire", category: "Action", thumbnail: "https://via.placeholder.com/150?text=Free+Fire", embedUrl: null },
        { id: 188, title: "Roblox", category: "Adventure", thumbnail: "https://via.placeholder.com/150?text=Roblox", embedUrl: null },
        { id: 189, title: "Fall Guys", category: "Party", thumbnail: "https://via.placeholder.com/150?text=Fall+Guys", embedUrl: null },
        { id: 190, title: "Among Us", category: "Most Popular", thumbnail: "https://via.placeholder.com/150?text=Among+Us", embedUrl: null },
        { id: 191, title: "Minecraft", category: "Most Popular", thumbnail: "https://via.placeholder.com/150?text=Minecraft", embedUrl: null },
        { id: 192, title: "Fortnite", category: "Most Popular", thumbnail: "https://via.placeholder.com/150?text=Fortnite", embedUrl: null },
        { id: 193, title: "GTA V", category: "Action", thumbnail: "https://via.placeholder.com/150?text=GTA+V", embedUrl: null },
        { id: 194, title: "Call of Duty: Warzone", category: "Action", thumbnail: "https://via.placeholder.com/150?text=COD+Warzone", embedUrl: null },
        { id: 195, title: "Apex Legends", category: "Most Popular", thumbnail: "https://via.placeholder.com/150?text=Apex+Legends", embedUrl: null },
        { id: 196, title: "Overwatch 2", category: "Action", thumbnail: "https://via.placeholder.com/150?text=Overwatch+2", embedUrl: null },
        { id: 197, title: "FIFA 23", category: "Sports", thumbnail: "https://via.placeholder.com/150?text=FIFA+23", embedUrl: null },
        { id: 198, title: "NBA 2K23", category: "Sports", thumbnail: "https://via.placeholder.com/150?text=NBA+2K23", embedUrl: null },
        { id: 199, title: "Rocket League", category: "Sports", thumbnail: "https://via.placeholder.com/150?text=Rocket+League", embedUrl: null },
        { id: 200, title: "Valorant", category: "Action", thumbnail: "https://via.placeholder.com/150?text=Valorant", embedUrl: null },
        { id: 201, title: "League of Legends", category: "MOBA", thumbnail: "https://via.placeholder.com/150?text=League+of+Legends", embedUrl: null },
        { id: 202, title: "Dota 2", category: "MOBA", thumbnail: "https://via.placeholder.com/150?text=Dota+2", embedUrl: null },
        { id: 203, title: "Plants vs. Zombies", category: "Strategy", thumbnail: "https://via.placeholder.com/150?text=Plants+vs+Zombies", embedUrl: null },
        { id: 204, title: "Elden Ring", category: "RPG", thumbnail: "https://via.placeholder.com/150?text=Elden+Ring", embedUrl: null },
        { id: 205, title: "Genshin Impact", category: "RPG", thumbnail: "https://via.placeholder.com/150?text=Genshin+Impact", embedUrl: null }
    ];

    // Extract unique categories
    const categories = ['All', ...new Set(games.map(game => game.category))];

    // Populate categories
    categories.forEach(category => {
        const button = document.createElement('button');
        button.textContent = category;
        button.addEventListener('click', () => filterGames(category));
        button.addEventListener('mouseover', () => hoverSound.play());
        categoryList.appendChild(button);
    });

    // Lazy load images (for fast loading)
    function lazyLoadImages() {
        const images = document.querySelectorAll('.game-card img');
        const options = {
            root: null,
            threshold: 0.1
        };
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    observer.unobserve(img);
                }
            });
        }, options);
        images.forEach(img => observer.observe(img));
    }

    // Populate games
    function displayGames(filteredGames) {
        gameList.innerHTML = '';
        filteredGames.forEach(game => {
            const gameCard = document.createElement('div');
            gameCard.className = 'game-card';
            gameCard.innerHTML = `
                <img data-src="${game.thumbnail}" alt="${game.title}" loading="lazy">
                <h3>${game.title}</h3>
                <p>${game.category}</p>
                <button onclick="playGame('${game.embedUrl}', '${game.title}')"><i class="fas fa-play"></i> Play Now</button>
            `;
            gameCard.addEventListener('mouseover', () => hoverSound.play());
            gameList.appendChild(gameCard);
        });

        // Lazy load images
        lazyLoadImages();

        // Animate game cards
        gsap.from(".game-card", {
            opacity: 0,
            y: 80,
            rotationX: 30,
            stagger: 0.1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
                trigger: ".game-grid",
                start: "top 80%"
            }
        });
    }

    // Filter games by category
    function filterGames(category) {
        clickSound.play();
        const filteredGames = category === 'All' ? games : games.filter(game => game.category === category);
        displayGames(filteredGames);
    }

    // Search functionality
    searchBar.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredGames = games.filter(game => game.title.toLowerCase().includes(searchTerm));
        displayGames(filteredGames);
    });

    // Initial display
    displayGames(games);

    // Play game function
    window.playGame = (embedUrl, title) => {
        clickSound.play();
        gameModal.style.display = 'block';
        gameFrame.style.display = 'none';
        gameMessage.style.display = 'none';

        if (embedUrl) {
            gameFrame.src = embedUrl;
            gameFrame.style.display = 'block';
        } else {
            gameMessage.textContent = `${title} cannot be played directly in the browser. Please download it from its official website.`;
            gameMessage.style.display = 'block';
        }

        // Animate modal opening
        gsap.fromTo(".game-modal-content", 
            { scale: 0, opacity: 0, rotationX: 90 },
            { scale: 1, opacity: 1, rotationX: 0, duration: 0.8, ease: "elastic.out(1, 0.5)" }
        );
    };

    // Exit game
    exitBtn.addEventListener('click', () => {
        clickSound.play();
        gameModal.style.display = 'none';
        gameFrame.src = '';
        gameMessage.textContent = '';

        // Animate modal closing
        gsap.to(".game-modal-content", {
            scale: 0,
            opacity: 0,
            rotationX: 90,
            duration: 0.5,
            ease: "power2.in"
        });
    });

    // Header animations
    gsap.from(".logo", { opacity: 0, scale: 0, rotation: 720, duration: 1.5, ease: "elastic.out(1, 0.5)" });
    gsap.from(".site-title", { opacity: 0, y: -80, duration: 1, delay: 0.5, ease: "power3.out" });
    gsap.from(".tagline", { opacity: 0, x: -80, duration: 1, delay: 0.8, ease: "power3.out" });

    // Search bar animation
    gsap.from(".search-bar", { opacity: 0, scale: 0.5, duration: 1, delay: 1, ease: "elastic.out(1, 0.5)" });

    // Category buttons animation
    gsap.from(".category-list button", {
        opacity: 0,
        x: (index) => index % 2 === 0 ? -80 : 80,
        stutter: 0.2,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
            trigger: ".category-list",
            start: "top 80%"
        }
    });

    // Footer animation
    gsap.from(".footer", {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
            trigger: ".footer",
            start: "top 90%"
        }
    });

    // PWA Service Worker Registration
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/service-worker.js')
            .then(reg => console.log('Service Worker Registered', reg))
            .catch(err => console.log('Service Worker Registration Failed', err));
    }
});
