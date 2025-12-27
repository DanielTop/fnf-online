// Основная логика FNF Online
document.addEventListener('DOMContentLoaded', () => {
    // Подключение к серверу
    const socket = io();

    // Состояние
    let currentScreen = 'main-menu';
    let isHost = false;
    let roomId = null;
    let selectedCharacter = 'boyfriend';
    let selectedLocation = 'stage';
    let playerName = '';
    let game = null;

    // DOM элементы
    const screens = {
        mainMenu: document.getElementById('main-menu'),
        lobbySetup: document.getElementById('lobby-setup'),
        roomLobby: document.getElementById('room-lobby'),
        gameScreen: document.getElementById('game-screen'),
        results: document.getElementById('results-screen')
    };

    const notification = document.getElementById('notification');

    // Инициализация
    initCharacterPreviews();
    initLocationPreviews();

    // Переключение экранов
    function showScreen(screenName) {
        Object.values(screens).forEach(s => s.classList.remove('active'));
        screens[screenName].classList.add('active');
        currentScreen = screenName;
    }

    // Уведомления
    function showNotification(message, type = '') {
        notification.textContent = message;
        notification.className = 'notification show ' + type;
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }

    // ===== Главное меню =====
    document.getElementById('btn-create').addEventListener('click', () => {
        isHost = true;
        document.getElementById('setup-title').textContent = 'СОЗДАТЬ КОМНАТУ';
        document.getElementById('room-id-group').style.display = 'none';
        showScreen('lobbySetup');
    });

    document.getElementById('btn-join').addEventListener('click', () => {
        isHost = false;
        document.getElementById('setup-title').textContent = 'ПРИСОЕДИНИТЬСЯ';
        document.getElementById('room-id-group').style.display = 'block';
        showScreen('lobbySetup');
    });

    // ===== Экран настройки =====
    // Выбор персонажа
    document.querySelectorAll('.character-card').forEach(card => {
        card.addEventListener('click', () => {
            document.querySelectorAll('.character-card').forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            selectedCharacter = card.dataset.char;
        });
    });

    document.getElementById('btn-back').addEventListener('click', () => {
        showScreen('mainMenu');
    });

    document.getElementById('btn-confirm').addEventListener('click', () => {
        playerName = document.getElementById('player-name').value.trim();

        if (!playerName) {
            showNotification('Введите имя игрока!', 'error');
            return;
        }

        if (isHost) {
            // Создаём комнату
            socket.emit('createRoom', {
                playerName: playerName,
                character: selectedCharacter,
                location: selectedLocation
            });
        } else {
            // Присоединяемся к комнате
            const inputRoomId = document.getElementById('room-id-input').value.trim().toUpperCase();

            if (!inputRoomId) {
                showNotification('Введите ID комнаты!', 'error');
                return;
            }

            socket.emit('joinRoom', {
                roomId: inputRoomId,
                playerName: playerName,
                character: selectedCharacter
            });
        }
    });

    // ===== Лобби комнаты =====
    // Выбор локации (только для хоста)
    document.querySelectorAll('.location-card').forEach(card => {
        card.addEventListener('click', () => {
            if (!isHost) {
                showNotification('Только хост может менять локацию', 'error');
                return;
            }

            document.querySelectorAll('.location-card').forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            selectedLocation = card.dataset.loc;

            socket.emit('changeLocation', { location: selectedLocation });
        });
    });

    document.getElementById('btn-copy-code').addEventListener('click', () => {
        navigator.clipboard.writeText(roomId).then(() => {
            showNotification('Код скопирован!', 'success');
        });
    });

    document.getElementById('btn-leave').addEventListener('click', () => {
        socket.disconnect();
        socket.connect();
        showScreen('mainMenu');
        roomId = null;
    });

    document.getElementById('btn-ready').addEventListener('click', () => {
        socket.emit('playerReady');
        document.getElementById('btn-ready').disabled = true;
        document.getElementById('btn-ready').textContent = 'ГОТОВ!';
    });

    document.getElementById('btn-start').addEventListener('click', () => {
        socket.emit('startGame');
    });

    document.getElementById('btn-rematch').addEventListener('click', () => {
        // Сброс готовности
        document.getElementById('btn-ready').disabled = false;
        document.getElementById('btn-ready').textContent = 'ГОТОВ';
        document.getElementById('btn-start').style.display = 'none';
        showScreen('roomLobby');
    });

    // ===== Socket события =====

    // Комната создана
    socket.on('roomCreated', (data) => {
        roomId = data.roomId;
        isHost = data.isHost;
        document.getElementById('room-code').textContent = roomId;
        document.getElementById('btn-start').style.display = isHost ? 'inline-block' : 'none';
        showScreen('roomLobby');
        showNotification('Комната создана! Ждём второго игрока...', 'success');

        updatePlayerSlots([{
            name: playerName,
            character: selectedCharacter,
            ready: false
        }]);
    });

    // Присоединились к комнате
    socket.on('roomJoined', (data) => {
        roomId = data.roomId;
        isHost = data.isHost;
        selectedLocation = data.location;
        document.getElementById('room-code').textContent = roomId;
        document.getElementById('btn-start').style.display = 'none';

        // Обновляем выбор локации
        document.querySelectorAll('.location-card').forEach(c => {
            c.classList.toggle('selected', c.dataset.loc === selectedLocation);
        });

        showScreen('roomLobby');
        showNotification('Вы присоединились к комнате!', 'success');
    });

    // Игрок присоединился
    socket.on('playerJoined', (data) => {
        updatePlayerSlots(data.players);
        showNotification('Игрок присоединился!', 'success');
    });

    // Игрок вышел
    socket.on('playerLeft', (data) => {
        updatePlayerSlots(data.players);
        isHost = data.newHost === socket.id;
        document.getElementById('btn-start').style.display = isHost ? 'inline-block' : 'none';
        showNotification('Игрок покинул комнату', 'error');

        // Если игра шла - останавливаем
        if (game) {
            game.stop();
            showScreen('roomLobby');
        }
    });

    // Смена персонажа
    socket.on('characterChanged', (data) => {
        updatePlayerSlots(data.players);
    });

    // Смена локации
    socket.on('locationChanged', (data) => {
        selectedLocation = data.location;
        document.querySelectorAll('.location-card').forEach(c => {
            c.classList.toggle('selected', c.dataset.loc === selectedLocation);
        });
        initLocationPreviews();
    });

    // Обновление готовности
    socket.on('playerReadyUpdate', (data) => {
        updatePlayerSlots(data.players);
    });

    // Все готовы
    socket.on('allPlayersReady', () => {
        if (isHost) {
            document.getElementById('btn-start').classList.add('pulse');
            showNotification('Все игроки готовы! Можно начинать!', 'success');
        }
    });

    // Игра началась
    socket.on('gameStarted', (data) => {
        showScreen('gameScreen');

        // Создаём игру
        const canvas = document.getElementById('game-canvas');
        game = new FNFGame(canvas, socket);
        game.myId = socket.id;
        game.start(data.players, data.location);

        showNotification('Игра началась!', 'success');
    });

    // Нажатие противника
    socket.on('opponentKeyPress', (data) => {
        if (game) {
            game.opponentKeyPress(data);
        }
    });

    // Обновление счёта
    socket.on('scoresUpdated', (data) => {
        if (game) {
            data.players.forEach(p => {
                game.updateOpponentScore(p.id, p.score);
            });
        }

        // Обновляем UI
        if (data.players[0]) {
            document.getElementById('p1-score').textContent = data.players[0].score;
        }
        if (data.players[1]) {
            document.getElementById('p2-score').textContent = data.players[1].score;
        }
    });

    // Игра окончена
    socket.on('gameEnded', (data) => {
        if (game) {
            game.stop();
        }

        // Показываем результаты
        const p1 = data.players[0];
        const p2 = data.players[1];

        document.getElementById('final-p1-name').textContent = p1.name;
        document.getElementById('final-p1-score').textContent = p1.score;
        document.getElementById('final-p2-name').textContent = p2.name;
        document.getElementById('final-p2-score').textContent = p2.score;

        let winnerText = 'НИЧЬЯ!';
        if (p1.score > p2.score) {
            winnerText = `${p1.name} ПОБЕДИЛ!`;
        } else if (p2.score > p1.score) {
            winnerText = `${p2.name} ПОБЕДИЛ!`;
        }

        document.getElementById('winner-text').textContent = winnerText;
        showScreen('results');
    });

    // Ошибка
    socket.on('error', (data) => {
        showNotification(data.message, 'error');
    });

    // ===== Вспомогательные функции =====

    function updatePlayerSlots(players) {
        const slot1 = document.getElementById('player1-slot');
        const slot2 = document.getElementById('player2-slot');

        // Игрок 1
        if (players[0]) {
            document.getElementById('player1-name').textContent = players[0].name;
            document.getElementById('player1-status').textContent = players[0].ready ? 'ГОТОВ' : '';
            document.getElementById('player1-status').className = 'player-status' + (players[0].ready ? ' ready' : '');
            slot1.classList.toggle('ready', players[0].ready);
            drawCharacter('player1-char', players[0].character, 1.5);
        } else {
            document.getElementById('player1-name').textContent = 'Ожидание...';
            document.getElementById('player1-status').textContent = '';
            slot1.classList.remove('ready');
        }

        // Игрок 2
        if (players[1]) {
            document.getElementById('player2-name').textContent = players[1].name;
            document.getElementById('player2-status').textContent = players[1].ready ? 'ГОТОВ' : '';
            document.getElementById('player2-status').className = 'player-status' + (players[1].ready ? ' ready' : '');
            slot2.classList.toggle('ready', players[1].ready);
            drawCharacter('player2-char', players[1].character, 1.5);
        } else {
            document.getElementById('player2-name').textContent = 'Ожидание...';
            document.getElementById('player2-status').textContent = '';
            slot2.classList.remove('ready');
        }
    }

    // Переинициализация превью при изменении размера
    window.addEventListener('resize', () => {
        initCharacterPreviews();
        initLocationPreviews();
    });

    // Инициализация превью при загрузке
    setTimeout(() => {
        initCharacterPreviews();
        initLocationPreviews();
    }, 100);
});
