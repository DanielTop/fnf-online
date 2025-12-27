const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3000;

// Статические файлы
app.use(express.static(path.join(__dirname, '../public')));

// Хранилище комнат
const rooms = new Map();

// Генератор ID комнаты
function generateRoomId() {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
}

io.on('connection', (socket) => {
    console.log(`Игрок подключился: ${socket.id}`);

    // Создание комнаты
    socket.on('createRoom', (data) => {
        const roomId = generateRoomId();
        rooms.set(roomId, {
            id: roomId,
            host: socket.id,
            players: [{
                id: socket.id,
                name: data.playerName,
                character: data.character,
                ready: false,
                score: 0
            }],
            location: data.location || 'stage',
            gameStarted: false,
            song: null
        });

        socket.join(roomId);
        socket.roomId = roomId;
        socket.emit('roomCreated', { roomId, isHost: true });
        console.log(`Комната ${roomId} создана игроком ${data.playerName}`);
    });

    // Присоединение к комнате
    socket.on('joinRoom', (data) => {
        const room = rooms.get(data.roomId);

        if (!room) {
            socket.emit('error', { message: 'Комната не найдена' });
            return;
        }

        if (room.players.length >= 2) {
            socket.emit('error', { message: 'Комната заполнена' });
            return;
        }

        if (room.gameStarted) {
            socket.emit('error', { message: 'Игра уже началась' });
            return;
        }

        room.players.push({
            id: socket.id,
            name: data.playerName,
            character: data.character,
            ready: false,
            score: 0
        });

        socket.join(data.roomId);
        socket.roomId = data.roomId;

        socket.emit('roomJoined', {
            roomId: data.roomId,
            isHost: false,
            location: room.location
        });

        // Уведомляем всех в комнате
        io.to(data.roomId).emit('playerJoined', {
            players: room.players,
            location: room.location
        });

        console.log(`${data.playerName} присоединился к комнате ${data.roomId}`);
    });

    // Смена персонажа
    socket.on('changeCharacter', (data) => {
        const room = rooms.get(socket.roomId);
        if (!room) return;

        const player = room.players.find(p => p.id === socket.id);
        if (player) {
            player.character = data.character;
            io.to(socket.roomId).emit('characterChanged', {
                playerId: socket.id,
                character: data.character,
                players: room.players
            });
        }
    });

    // Смена локации (только хост)
    socket.on('changeLocation', (data) => {
        const room = rooms.get(socket.roomId);
        if (!room || room.host !== socket.id) return;

        room.location = data.location;
        io.to(socket.roomId).emit('locationChanged', {
            location: data.location
        });
    });

    // Игрок готов
    socket.on('playerReady', () => {
        const room = rooms.get(socket.roomId);
        if (!room) return;

        const player = room.players.find(p => p.id === socket.id);
        if (player) {
            player.ready = true;
            io.to(socket.roomId).emit('playerReadyUpdate', {
                playerId: socket.id,
                players: room.players
            });

            // Проверяем готовность всех
            if (room.players.length === 2 && room.players.every(p => p.ready)) {
                io.to(socket.roomId).emit('allPlayersReady');
            }
        }
    });

    // Начало игры (хост)
    socket.on('startGame', () => {
        const room = rooms.get(socket.roomId);
        if (!room || room.host !== socket.id) return;

        if (room.players.length === 2 && room.players.every(p => p.ready)) {
            room.gameStarted = true;
            room.players.forEach(p => p.score = 0);

            io.to(socket.roomId).emit('gameStarted', {
                players: room.players,
                location: room.location
            });
        }
    });

    // Нажатие клавиши
    socket.on('keyPress', (data) => {
        const room = rooms.get(socket.roomId);
        if (!room || !room.gameStarted) return;

        // Отправляем другому игроку
        socket.to(socket.roomId).emit('opponentKeyPress', {
            playerId: socket.id,
            key: data.key,
            hit: data.hit
        });
    });

    // Обновление счёта
    socket.on('scoreUpdate', (data) => {
        const room = rooms.get(socket.roomId);
        if (!room) return;

        const player = room.players.find(p => p.id === socket.id);
        if (player) {
            player.score = data.score;
            io.to(socket.roomId).emit('scoresUpdated', {
                players: room.players
            });
        }
    });

    // Конец игры
    socket.on('gameEnd', () => {
        const room = rooms.get(socket.roomId);
        if (!room) return;

        room.gameStarted = false;
        room.players.forEach(p => p.ready = false);

        io.to(socket.roomId).emit('gameEnded', {
            players: room.players
        });
    });

    // Отключение
    socket.on('disconnect', () => {
        console.log(`Игрок отключился: ${socket.id}`);

        if (socket.roomId) {
            const room = rooms.get(socket.roomId);
            if (room) {
                room.players = room.players.filter(p => p.id !== socket.id);

                if (room.players.length === 0) {
                    rooms.delete(socket.roomId);
                    console.log(`Комната ${socket.roomId} удалена`);
                } else {
                    // Передаём хоста
                    if (room.host === socket.id) {
                        room.host = room.players[0].id;
                    }
                    room.gameStarted = false;

                    io.to(socket.roomId).emit('playerLeft', {
                        players: room.players,
                        newHost: room.host
                    });
                }
            }
        }
    });
});

server.listen(PORT, '0.0.0.0', () => {
    console.log(`FNF Online server running on port ${PORT}`);
});
