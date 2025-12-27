// Локации FNF
const Locations = {
    // Главная сцена (Week 1)
    stage: {
        name: 'Сцена',
        colors: {
            sky: '#1a0a2e',
            curtain: '#8b0000',
            floor: '#2a1a3e',
            speakers: '#333333',
            lights: '#ffff00'
        },
        draw: function(ctx, width, height) {
            // Небо/фон
            const gradient = ctx.createLinearGradient(0, 0, 0, height);
            gradient.addColorStop(0, '#1a0a2e');
            gradient.addColorStop(1, '#2d1b4e');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, width, height);

            // Звёзды
            ctx.fillStyle = '#ffffff';
            for (let i = 0; i < 50; i++) {
                const x = (i * 37) % width;
                const y = (i * 23) % (height * 0.6);
                ctx.fillRect(x, y, 2, 2);
            }

            // Занавес слева
            ctx.fillStyle = this.colors.curtain;
            ctx.fillRect(0, 0, width * 0.15, height);
            ctx.fillStyle = '#6b0000';
            for (let i = 0; i < 5; i++) {
                ctx.fillRect(i * (width * 0.03), 0, width * 0.01, height);
            }

            // Занавес справа
            ctx.fillStyle = this.colors.curtain;
            ctx.fillRect(width * 0.85, 0, width * 0.15, height);
            ctx.fillStyle = '#6b0000';
            for (let i = 0; i < 5; i++) {
                ctx.fillRect(width * 0.85 + i * (width * 0.03), 0, width * 0.01, height);
            }

            // Пол/сцена
            ctx.fillStyle = this.colors.floor;
            ctx.fillRect(0, height * 0.75, width, height * 0.25);

            // Колонки
            ctx.fillStyle = this.colors.speakers;
            ctx.fillRect(width * 0.18, height * 0.5, width * 0.12, height * 0.28);
            ctx.fillRect(width * 0.70, height * 0.5, width * 0.12, height * 0.28);

            // Динамики
            ctx.fillStyle = '#1a1a1a';
            ctx.beginPath();
            ctx.arc(width * 0.24, height * 0.58, width * 0.04, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(width * 0.24, height * 0.7, width * 0.04, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(width * 0.76, height * 0.58, width * 0.04, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(width * 0.76, height * 0.7, width * 0.04, 0, Math.PI * 2);
            ctx.fill();

            // Прожекторы
            ctx.fillStyle = 'rgba(255, 255, 0, 0.1)';
            ctx.beginPath();
            ctx.moveTo(width * 0.3, 0);
            ctx.lineTo(width * 0.2, height * 0.75);
            ctx.lineTo(width * 0.4, height * 0.75);
            ctx.closePath();
            ctx.fill();

            ctx.beginPath();
            ctx.moveTo(width * 0.7, 0);
            ctx.lineTo(width * 0.6, height * 0.75);
            ctx.lineTo(width * 0.8, height * 0.75);
            ctx.closePath();
            ctx.fill();
        }
    },

    // Особняк Spooky (Week 2)
    spooky: {
        name: 'Особняк',
        colors: {
            sky: '#0a0a1a',
            moon: '#ffffcc',
            trees: '#1a1a2a',
            ground: '#2a2a3a',
            house: '#3a3a4a'
        },
        draw: function(ctx, width, height) {
            // Ночное небо
            const gradient = ctx.createLinearGradient(0, 0, 0, height);
            gradient.addColorStop(0, '#0a0a1a');
            gradient.addColorStop(1, '#1a1a3a');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, width, height);

            // Луна
            ctx.fillStyle = this.colors.moon;
            ctx.beginPath();
            ctx.arc(width * 0.8, height * 0.15, width * 0.08, 0, Math.PI * 2);
            ctx.fill();

            // Облака
            ctx.fillStyle = 'rgba(50, 50, 80, 0.5)';
            ctx.beginPath();
            ctx.ellipse(width * 0.3, height * 0.2, width * 0.15, height * 0.05, 0, 0, Math.PI * 2);
            ctx.fill();

            // Деревья (силуэты)
            ctx.fillStyle = this.colors.trees;
            // Левое дерево
            ctx.beginPath();
            ctx.moveTo(width * 0.05, height * 0.7);
            ctx.lineTo(width * 0.1, height * 0.3);
            ctx.lineTo(width * 0.15, height * 0.4);
            ctx.lineTo(width * 0.2, height * 0.25);
            ctx.lineTo(width * 0.25, height * 0.45);
            ctx.lineTo(width * 0.22, height * 0.7);
            ctx.closePath();
            ctx.fill();

            // Правое дерево
            ctx.beginPath();
            ctx.moveTo(width * 0.78, height * 0.7);
            ctx.lineTo(width * 0.82, height * 0.35);
            ctx.lineTo(width * 0.88, height * 0.28);
            ctx.lineTo(width * 0.92, height * 0.4);
            ctx.lineTo(width * 0.95, height * 0.7);
            ctx.closePath();
            ctx.fill();

            // Дом
            ctx.fillStyle = this.colors.house;
            ctx.fillRect(width * 0.3, height * 0.35, width * 0.4, height * 0.4);

            // Крыша
            ctx.fillStyle = '#2a2a3a';
            ctx.beginPath();
            ctx.moveTo(width * 0.25, height * 0.35);
            ctx.lineTo(width * 0.5, height * 0.15);
            ctx.lineTo(width * 0.75, height * 0.35);
            ctx.closePath();
            ctx.fill();

            // Окна (светящиеся)
            ctx.fillStyle = '#ffcc00';
            ctx.fillRect(width * 0.35, height * 0.45, width * 0.08, height * 0.1);
            ctx.fillRect(width * 0.57, height * 0.45, width * 0.08, height * 0.1);

            // Дверь
            ctx.fillStyle = '#1a1a2a';
            ctx.fillRect(width * 0.45, height * 0.55, width * 0.1, height * 0.2);

            // Земля
            ctx.fillStyle = this.colors.ground;
            ctx.fillRect(0, height * 0.75, width, height * 0.25);

            // Надгробия
            ctx.fillStyle = '#4a4a5a';
            ctx.fillRect(width * 0.15, height * 0.68, width * 0.04, height * 0.08);
            ctx.fillRect(width * 0.82, height * 0.7, width * 0.03, height * 0.06);
        }
    },

    // Филадельфия (Week 3)
    philly: {
        name: 'Филадельфия',
        colors: {
            sky: '#1a2a4a',
            buildings: '#2a3a5a',
            train: '#cc4444',
            street: '#3a3a4a'
        },
        draw: function(ctx, width, height) {
            // Ночное небо города
            const gradient = ctx.createLinearGradient(0, 0, 0, height * 0.7);
            gradient.addColorStop(0, '#0a1a3a');
            gradient.addColorStop(1, '#2a4a7a');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, width, height);

            // Здания на заднем плане
            ctx.fillStyle = '#1a2a4a';
            const buildings = [
                { x: 0, w: 0.12, h: 0.45 },
                { x: 0.1, w: 0.1, h: 0.55 },
                { x: 0.18, w: 0.08, h: 0.4 },
                { x: 0.25, w: 0.12, h: 0.6 },
                { x: 0.35, w: 0.1, h: 0.5 },
                { x: 0.55, w: 0.1, h: 0.55 },
                { x: 0.63, w: 0.12, h: 0.45 },
                { x: 0.73, w: 0.08, h: 0.65 },
                { x: 0.8, w: 0.1, h: 0.5 },
                { x: 0.88, w: 0.12, h: 0.55 }
            ];

            buildings.forEach(b => {
                ctx.fillStyle = '#1a2a4a';
                ctx.fillRect(width * b.x, height * (0.75 - b.h), width * b.w, height * b.h);

                // Окна
                ctx.fillStyle = '#ffcc44';
                for (let row = 0; row < 5; row++) {
                    for (let col = 0; col < 3; col++) {
                        if (Math.random() > 0.3) {
                            ctx.fillRect(
                                width * b.x + width * b.w * 0.15 + col * width * b.w * 0.28,
                                height * (0.75 - b.h) + height * 0.05 + row * height * 0.08,
                                width * b.w * 0.15,
                                height * 0.04
                            );
                        }
                    }
                }
            });

            // Улица
            ctx.fillStyle = this.colors.street;
            ctx.fillRect(0, height * 0.75, width, height * 0.25);

            // Разметка
            ctx.fillStyle = '#ffffff';
            for (let i = 0; i < 10; i++) {
                ctx.fillRect(width * 0.05 + i * width * 0.1, height * 0.85, width * 0.06, height * 0.01);
            }

            // Поезд на заднем плане
            ctx.fillStyle = this.colors.train;
            ctx.fillRect(width * 0.4, height * 0.7, width * 0.25, height * 0.06);
            ctx.fillStyle = '#aa3333';
            ctx.fillRect(width * 0.4, height * 0.7, width * 0.04, height * 0.06);
        }
    },

    // Военная база (Week 7)
    tank: {
        name: 'Военная база',
        colors: {
            sky: '#4a3a2a',
            ground: '#5a4a3a',
            tank: '#3a4a3a',
            sandbags: '#8a7a5a'
        },
        draw: function(ctx, width, height) {
            // Пустынное небо
            const gradient = ctx.createLinearGradient(0, 0, 0, height * 0.7);
            gradient.addColorStop(0, '#6a5a4a');
            gradient.addColorStop(1, '#9a8a7a');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, width, height);

            // Солнце
            ctx.fillStyle = '#ffcc66';
            ctx.beginPath();
            ctx.arc(width * 0.2, height * 0.2, width * 0.06, 0, Math.PI * 2);
            ctx.fill();

            // Горы на заднем плане
            ctx.fillStyle = '#5a4a3a';
            ctx.beginPath();
            ctx.moveTo(0, height * 0.5);
            ctx.lineTo(width * 0.2, height * 0.3);
            ctx.lineTo(width * 0.35, height * 0.45);
            ctx.lineTo(width * 0.5, height * 0.25);
            ctx.lineTo(width * 0.7, height * 0.4);
            ctx.lineTo(width * 0.85, height * 0.3);
            ctx.lineTo(width, height * 0.45);
            ctx.lineTo(width, height * 0.5);
            ctx.closePath();
            ctx.fill();

            // Земля
            ctx.fillStyle = this.colors.ground;
            ctx.fillRect(0, height * 0.5, width, height * 0.5);

            // Танк слева
            ctx.fillStyle = this.colors.tank;
            ctx.fillRect(width * 0.05, height * 0.55, width * 0.18, height * 0.12);
            ctx.fillRect(width * 0.03, height * 0.67, width * 0.22, height * 0.06);
            // Гусеницы
            ctx.fillStyle = '#2a3a2a';
            ctx.fillRect(width * 0.02, height * 0.73, width * 0.24, height * 0.04);
            // Башня
            ctx.fillStyle = this.colors.tank;
            ctx.fillRect(width * 0.08, height * 0.48, width * 0.1, height * 0.08);
            // Дуло
            ctx.fillRect(width * 0.18, height * 0.50, width * 0.1, height * 0.03);

            // Мешки с песком
            ctx.fillStyle = this.colors.sandbags;
            for (let i = 0; i < 4; i++) {
                ctx.fillRect(width * 0.6 + i * width * 0.05, height * 0.68, width * 0.045, height * 0.03);
            }
            for (let i = 0; i < 3; i++) {
                ctx.fillRect(width * 0.625 + i * width * 0.05, height * 0.65, width * 0.045, height * 0.03);
            }

            // Колючая проволока
            ctx.strokeStyle = '#4a4a4a';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(width * 0.35, height * 0.6);
            for (let i = 0; i < 10; i++) {
                ctx.lineTo(width * (0.35 + i * 0.03), height * (0.58 + (i % 2) * 0.04));
            }
            ctx.stroke();

            // Флаг
            ctx.fillStyle = '#4a4a4a';
            ctx.fillRect(width * 0.85, height * 0.4, width * 0.01, height * 0.35);
            ctx.fillStyle = '#cc4444';
            ctx.fillRect(width * 0.86, height * 0.42, width * 0.08, height * 0.06);
        }
    }
};

// Отрисовка локации на превью
function drawLocationPreview(canvasId, locName) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const loc = Locations[locName];
    if (loc) {
        loc.draw(ctx, canvas.width, canvas.height);
    }
}

// Инициализация превью локаций
function initLocationPreviews() {
    const locs = ['stage', 'spooky', 'philly', 'tank'];
    locs.forEach(loc => {
        drawLocationPreview(`loc-${loc}`, loc);
    });
}

// Экспорт
window.Locations = Locations;
window.drawLocationPreview = drawLocationPreview;
window.initLocationPreviews = initLocationPreviews;
