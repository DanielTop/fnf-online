// Игровой движок FNF
class FNFGame {
    constructor(canvas, socket) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.socket = socket;

        // Настройки
        this.width = 0;
        this.height = 0;
        this.running = false;
        this.paused = false;

        // Игроки
        this.player1 = null;
        this.player2 = null;
        this.myId = null;
        this.isPlayer1 = true;

        // Локация
        this.location = 'stage';

        // Стрелки
        this.arrows = [];
        this.arrowSpeed = 8;
        this.spawnInterval = null;
        this.bpm = 120;

        // Зона попадания
        this.hitZoneY = 0;
        this.hitZoneHeight = 60;

        // Счёт
        this.score = 0;
        this.combo = 0;
        this.maxCombo = 0;
        this.hits = { sick: 0, good: 0, bad: 0, miss: 0 };

        // Цвета стрелок
        this.arrowColors = {
            left: '#ff00ff',
            down: '#00ffff',
            up: '#00ff00',
            right: '#ff0000'
        };

        // Позиции стрелок
        this.arrowPositions = {
            left: 0,
            down: 1,
            up: 2,
            right: 3
        };

        // Привязка клавиш
        this.keyBindings = {
            'ArrowLeft': 'left',
            'ArrowDown': 'down',
            'ArrowUp': 'up',
            'ArrowRight': 'right',
            'KeyA': 'left',
            'KeyS': 'down',
            'KeyW': 'up',
            'KeyD': 'right'
        };

        this.keysPressed = {
            left: false,
            down: false,
            up: false,
            right: false
        };

        // Анимации
        this.animations = [];

        // Время
        this.gameTime = 0;
        this.gameDuration = 60000; // 60 секунд

        this.setupEventListeners();
    }

    resize() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.canvas.width = this.width;
        this.canvas.height = this.height;

        // Позиция зоны попадания
        this.hitZoneY = this.height - 150;

        // Ширина и отступы стрелок
        this.arrowWidth = 60;
        this.arrowGap = 20;
        this.arrowsStartX = (this.width - (4 * this.arrowWidth + 3 * this.arrowGap)) / 2;
    }

    setupEventListeners() {
        window.addEventListener('keydown', (e) => this.handleKeyDown(e));
        window.addEventListener('keyup', (e) => this.handleKeyUp(e));
        window.addEventListener('resize', () => this.resize());
    }

    handleKeyDown(e) {
        if (!this.running) return;

        const direction = this.keyBindings[e.code];
        if (direction && !this.keysPressed[direction]) {
            this.keysPressed[direction] = true;
            this.checkHit(direction);

            // Отправляем на сервер
            if (this.socket) {
                this.socket.emit('keyPress', {
                    key: direction,
                    hit: true
                });
            }
        }
    }

    handleKeyUp(e) {
        const direction = this.keyBindings[e.code];
        if (direction) {
            this.keysPressed[direction] = false;
        }
    }

    checkHit(direction) {
        const pos = this.arrowPositions[direction];
        const arrowX = this.arrowsStartX + pos * (this.arrowWidth + this.arrowGap);

        // Ищем ближайшую стрелку в зоне попадания
        let closestArrow = null;
        let closestDist = Infinity;

        for (const arrow of this.arrows) {
            if (arrow.direction !== direction || arrow.hit) continue;

            const dist = Math.abs(arrow.y - this.hitZoneY);
            if (dist < closestDist && dist < 100) {
                closestDist = dist;
                closestArrow = arrow;
            }
        }

        if (closestArrow) {
            closestArrow.hit = true;

            let rating = '';
            let points = 0;
            let color = '';

            if (closestDist < 20) {
                rating = 'SICK!';
                points = 350;
                color = '#00ffff';
                this.hits.sick++;
            } else if (closestDist < 45) {
                rating = 'GOOD';
                points = 200;
                color = '#00ff00';
                this.hits.good++;
            } else if (closestDist < 80) {
                rating = 'BAD';
                points = 100;
                color = '#ffff00';
                this.hits.bad++;
            } else {
                rating = 'MISS';
                points = 0;
                color = '#ff0000';
                this.hits.miss++;
                this.combo = 0;
            }

            if (points > 0) {
                this.combo++;
                this.maxCombo = Math.max(this.maxCombo, this.combo);
                this.score += points * (1 + this.combo * 0.01);
            }

            // Анимация рейтинга
            this.showRating(rating, color);
            this.showCombo();

            // Обновляем счёт на сервере
            if (this.socket) {
                this.socket.emit('scoreUpdate', { score: Math.floor(this.score) });
            }

            // Анимация попадания
            this.animations.push({
                type: 'hit',
                x: arrowX + this.arrowWidth / 2,
                y: this.hitZoneY,
                color: this.arrowColors[direction],
                alpha: 1,
                scale: 1
            });
        }
    }

    showRating(text, color) {
        const ratingEl = document.getElementById('rating-display');
        ratingEl.textContent = text;
        ratingEl.style.color = color;
        ratingEl.style.opacity = 1;
        ratingEl.style.transform = 'translate(-50%, -50%) scale(1.2)';

        setTimeout(() => {
            ratingEl.style.opacity = 0;
            ratingEl.style.transform = 'translate(-50%, -50%) scale(1)';
        }, 300);
    }

    showCombo() {
        if (this.combo < 2) return;

        const comboEl = document.getElementById('combo-display');
        comboEl.textContent = `${this.combo} COMBO`;
        comboEl.style.opacity = 1;

        setTimeout(() => {
            comboEl.style.opacity = 0;
        }, 500);
    }

    spawnArrow() {
        const directions = ['left', 'down', 'up', 'right'];
        const direction = directions[Math.floor(Math.random() * 4)];
        const pos = this.arrowPositions[direction];

        this.arrows.push({
            direction: direction,
            x: this.arrowsStartX + pos * (this.arrowWidth + this.arrowGap),
            y: -50,
            hit: false
        });
    }

    start(players, location) {
        this.resize();
        this.player1 = players[0];
        this.player2 = players[1];
        this.location = location;

        // Определяем, кто мы
        this.isPlayer1 = this.player1.id === this.myId;

        // Сброс
        this.arrows = [];
        this.score = 0;
        this.combo = 0;
        this.maxCombo = 0;
        this.hits = { sick: 0, good: 0, bad: 0, miss: 0 };
        this.gameTime = 0;
        this.animations = [];

        // Обновляем UI
        document.getElementById('p1-label').textContent = this.player1.name;
        document.getElementById('p2-label').textContent = this.player2.name;
        document.getElementById('p1-score').textContent = '0';
        document.getElementById('p2-score').textContent = '0';

        // Запускаем спавн стрелок
        const spawnRate = 60000 / this.bpm / 2;
        this.spawnInterval = setInterval(() => {
            if (!this.paused && this.running) {
                this.spawnArrow();
            }
        }, spawnRate);

        this.running = true;
        this.lastTime = performance.now();
        this.gameLoop();

        // Таймер окончания игры
        setTimeout(() => {
            this.end();
        }, this.gameDuration);
    }

    gameLoop() {
        if (!this.running) return;

        const now = performance.now();
        const delta = now - this.lastTime;
        this.lastTime = now;

        this.gameTime += delta;

        this.update(delta);
        this.render();

        requestAnimationFrame(() => this.gameLoop());
    }

    update(delta) {
        // Обновляем стрелки
        for (let i = this.arrows.length - 1; i >= 0; i--) {
            const arrow = this.arrows[i];
            arrow.y += this.arrowSpeed;

            // Промах
            if (arrow.y > this.hitZoneY + 100 && !arrow.hit) {
                this.combo = 0;
                this.hits.miss++;
                this.showRating('MISS', '#ff0000');
                this.arrows.splice(i, 1);
            } else if (arrow.hit && arrow.y > this.hitZoneY + 50) {
                this.arrows.splice(i, 1);
            }
        }

        // Обновляем анимации
        for (let i = this.animations.length - 1; i >= 0; i--) {
            const anim = this.animations[i];
            anim.alpha -= 0.05;
            anim.scale += 0.1;

            if (anim.alpha <= 0) {
                this.animations.splice(i, 1);
            }
        }
    }

    render() {
        this.ctx.clearRect(0, 0, this.width, this.height);

        // Рисуем локацию
        const loc = Locations[this.location];
        if (loc) {
            loc.draw(this.ctx, this.width, this.height);
        }

        // Затемнение для UI
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        this.ctx.fillRect(0, this.height - 200, this.width, 200);

        // Рисуем персонажей
        this.renderCharacters();

        // Рисуем зону попадания
        this.renderHitZone();

        // Рисуем стрелки
        this.renderArrows();

        // Рисуем анимации
        this.renderAnimations();

        // Прогресс бар времени
        this.renderProgressBar();
    }

    renderCharacters() {
        const char1 = Characters[this.player1.character];
        const char2 = Characters[this.player2.character];

        if (char1) {
            char1.draw(this.ctx, this.width * 0.15, this.height * 0.35, 2.5);
        }
        if (char2) {
            char2.draw(this.ctx, this.width * 0.75, this.height * 0.35, 2.5);
        }
    }

    renderHitZone() {
        const directions = ['left', 'down', 'up', 'right'];

        directions.forEach((dir, i) => {
            const x = this.arrowsStartX + i * (this.arrowWidth + this.arrowGap);

            // Фон зоны
            this.ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
            this.ctx.fillRect(x, this.hitZoneY - 30, this.arrowWidth, this.hitZoneHeight);

            // Граница
            this.ctx.strokeStyle = this.arrowColors[dir];
            this.ctx.lineWidth = 3;
            this.ctx.strokeRect(x, this.hitZoneY - 30, this.arrowWidth, this.hitZoneHeight);

            // Подсветка при нажатии
            if (this.keysPressed[dir]) {
                this.ctx.fillStyle = this.arrowColors[dir] + '44';
                this.ctx.fillRect(x, this.hitZoneY - 30, this.arrowWidth, this.hitZoneHeight);
            }
        });
    }

    renderArrows() {
        for (const arrow of this.arrows) {
            if (arrow.hit) continue;

            const x = arrow.x;
            const y = arrow.y;
            const w = this.arrowWidth;
            const h = this.arrowWidth;

            this.ctx.save();
            this.ctx.translate(x + w/2, y + h/2);

            // Поворот в зависимости от направления
            const rotations = { left: Math.PI, down: Math.PI/2, up: -Math.PI/2, right: 0 };
            this.ctx.rotate(rotations[arrow.direction]);

            // Рисуем стрелку
            this.ctx.fillStyle = this.arrowColors[arrow.direction];
            this.ctx.beginPath();
            this.ctx.moveTo(w/2, 0);
            this.ctx.lineTo(0, h/2);
            this.ctx.lineTo(w/4, h/2);
            this.ctx.lineTo(w/4, h);
            this.ctx.lineTo(w*3/4, h);
            this.ctx.lineTo(w*3/4, h/2);
            this.ctx.lineTo(w, h/2);
            this.ctx.closePath();
            this.ctx.fill();

            // Обводка
            this.ctx.strokeStyle = '#ffffff';
            this.ctx.lineWidth = 2;
            this.ctx.stroke();

            this.ctx.restore();
        }
    }

    renderAnimations() {
        for (const anim of this.animations) {
            if (anim.type === 'hit') {
                this.ctx.save();
                this.ctx.globalAlpha = anim.alpha;
                this.ctx.strokeStyle = anim.color;
                this.ctx.lineWidth = 4;
                this.ctx.beginPath();
                this.ctx.arc(anim.x, anim.y, 30 * anim.scale, 0, Math.PI * 2);
                this.ctx.stroke();
                this.ctx.restore();
            }
        }
    }

    renderProgressBar() {
        const progress = this.gameTime / this.gameDuration;
        const barWidth = this.width * 0.4;
        const barX = (this.width - barWidth) / 2;
        const barY = 70;

        // Фон
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        this.ctx.fillRect(barX, barY, barWidth, 10);

        // Прогресс
        this.ctx.fillStyle = '#00d9ff';
        this.ctx.fillRect(barX, barY, barWidth * progress, 10);

        // Рамка
        this.ctx.strokeStyle = '#ffffff';
        this.ctx.lineWidth = 2;
        this.ctx.strokeRect(barX, barY, barWidth, 10);
    }

    updateOpponentScore(playerId, score) {
        if (this.player1 && this.player1.id === playerId) {
            document.getElementById('p1-score').textContent = score;
        } else if (this.player2 && this.player2.id === playerId) {
            document.getElementById('p2-score').textContent = score;
        }
    }

    opponentKeyPress(data) {
        // Визуальный эффект для противника
        // Можно добавить анимацию персонажа
    }

    end() {
        this.running = false;

        if (this.spawnInterval) {
            clearInterval(this.spawnInterval);
            this.spawnInterval = null;
        }

        // Отправляем результат
        if (this.socket) {
            this.socket.emit('gameEnd');
        }
    }

    getResults() {
        return {
            score: Math.floor(this.score),
            combo: this.maxCombo,
            hits: this.hits
        };
    }

    stop() {
        this.running = false;
        if (this.spawnInterval) {
            clearInterval(this.spawnInterval);
        }
    }
}

window.FNFGame = FNFGame;
