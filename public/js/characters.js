// Персонажи FNF - стиль оригинальной игры
const Characters = {
    // Boyfriend - голубые волосы, белая футболка, красная кепка назад
    boyfriend: {
        name: 'Boyfriend',
        draw: function(ctx, x, y, scale = 1, pose = 'idle') {
            const s = scale;
            ctx.imageSmoothingEnabled = false;

            // Тень
            ctx.fillStyle = 'rgba(0,0,0,0.3)';
            ctx.beginPath();
            ctx.ellipse(x + 20*s, y + 68*s, 18*s, 6*s, 0, 0, Math.PI * 2);
            ctx.fill();

            // Ноги
            ctx.fillStyle = '#1a1a2e';
            ctx.fillRect(x + 8*s, y + 52*s, 10*s, 16*s);
            ctx.fillRect(x + 22*s, y + 52*s, 10*s, 16*s);

            // Обувь
            ctx.fillStyle = '#ff3333';
            ctx.fillRect(x + 6*s, y + 64*s, 12*s, 6*s);
            ctx.fillRect(x + 22*s, y + 64*s, 12*s, 6*s);

            // Тело - белая футболка
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(x + 6*s, y + 30*s, 28*s, 24*s);

            // Символ на футболке
            ctx.fillStyle = '#ff6b6b';
            ctx.fillRect(x + 16*s, y + 38*s, 8*s, 8*s);

            // Руки
            ctx.fillStyle = '#ffcc99';
            ctx.fillRect(x + 0*s, y + 32*s, 8*s, 18*s);
            ctx.fillRect(x + 32*s, y + 32*s, 8*s, 18*s);

            // Микрофон в руке
            ctx.fillStyle = '#333333';
            ctx.fillRect(x + 34*s, y + 44*s, 4*s, 12*s);
            ctx.fillStyle = '#666666';
            ctx.beginPath();
            ctx.arc(x + 36*s, y + 44*s, 4*s, 0, Math.PI * 2);
            ctx.fill();

            // Голова
            ctx.fillStyle = '#ffcc99';
            ctx.fillRect(x + 6*s, y + 8*s, 28*s, 24*s);

            // Волосы - голубые
            ctx.fillStyle = '#00bfff';
            ctx.fillRect(x + 4*s, y + 2*s, 32*s, 14*s);
            ctx.fillRect(x + 2*s, y + 8*s, 8*s, 14*s);
            ctx.fillRect(x + 32*s, y + 6*s, 6*s, 10*s);
            // Чёлка
            ctx.fillRect(x + 6*s, y + 14*s, 6*s, 6*s);

            // Кепка красная (назад)
            ctx.fillStyle = '#ff3333';
            ctx.fillRect(x + 8*s, y + 0*s, 26*s, 8*s);
            // Козырёк назад
            ctx.fillStyle = '#cc0000';
            ctx.fillRect(x + 28*s, y + 4*s, 14*s, 5*s);

            // Глаза
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(x + 10*s, y + 14*s, 8*s, 8*s);
            ctx.fillRect(x + 22*s, y + 14*s, 8*s, 8*s);
            // Зрачки
            ctx.fillStyle = '#000000';
            ctx.fillRect(x + 14*s, y + 16*s, 4*s, 5*s);
            ctx.fillRect(x + 24*s, y + 16*s, 4*s, 5*s);
            // Блики
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(x + 14*s, y + 16*s, 2*s, 2*s);
            ctx.fillRect(x + 24*s, y + 16*s, 2*s, 2*s);

            // Рот
            if (pose === 'sing') {
                ctx.fillStyle = '#000000';
                ctx.fillRect(x + 14*s, y + 26*s, 12*s, 4*s);
                ctx.fillStyle = '#ff6b6b';
                ctx.fillRect(x + 16*s, y + 27*s, 8*s, 2*s);
            } else {
                ctx.fillStyle = '#ffcc99';
                ctx.fillRect(x + 18*s, y + 26*s, 6*s, 3*s);
            }
        }
    },

    // Pico - зелёные волосы, оранжевая футболка, пистолет
    pico: {
        name: 'Pico',
        draw: function(ctx, x, y, scale = 1, pose = 'idle') {
            const s = scale;
            ctx.imageSmoothingEnabled = false;

            // Тень
            ctx.fillStyle = 'rgba(0,0,0,0.3)';
            ctx.beginPath();
            ctx.ellipse(x + 20*s, y + 68*s, 18*s, 6*s, 0, 0, Math.PI * 2);
            ctx.fill();

            // Ноги
            ctx.fillStyle = '#2a2a3a';
            ctx.fillRect(x + 8*s, y + 52*s, 10*s, 16*s);
            ctx.fillRect(x + 22*s, y + 52*s, 10*s, 16*s);

            // Обувь
            ctx.fillStyle = '#444444';
            ctx.fillRect(x + 6*s, y + 64*s, 12*s, 6*s);
            ctx.fillRect(x + 22*s, y + 64*s, 12*s, 6*s);

            // Тело - оранжевая футболка
            ctx.fillStyle = '#ff7722';
            ctx.fillRect(x + 6*s, y + 30*s, 28*s, 24*s);

            // Руки
            ctx.fillStyle = '#ffcc99';
            ctx.fillRect(x + 0*s, y + 32*s, 8*s, 16*s);
            ctx.fillRect(x + 32*s, y + 32*s, 8*s, 16*s);

            // Пистолет UZI
            ctx.fillStyle = '#2a2a2a';
            ctx.fillRect(x + 36*s, y + 38*s, 14*s, 6*s);
            ctx.fillRect(x + 38*s, y + 44*s, 4*s, 8*s);
            ctx.fillStyle = '#444444';
            ctx.fillRect(x + 48*s, y + 39*s, 4*s, 4*s);

            // Голова
            ctx.fillStyle = '#ffcc99';
            ctx.fillRect(x + 6*s, y + 6*s, 28*s, 26*s);

            // Волосы зелёные - торчащие
            ctx.fillStyle = '#8bc34a';
            // Основа
            ctx.fillRect(x + 4*s, y + 0*s, 32*s, 12*s);
            // Торчащие пряди
            ctx.fillRect(x + 8*s, y - 6*s, 6*s, 8*s);
            ctx.fillRect(x + 16*s, y - 8*s, 8*s, 10*s);
            ctx.fillRect(x + 26*s, y - 4*s, 6*s, 6*s);
            ctx.fillRect(x + 0*s, y + 4*s, 8*s, 10*s);
            ctx.fillRect(x + 32*s, y + 2*s, 8*s, 12*s);

            // Глаза - белые с красными зрачками (психо)
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(x + 8*s, y + 12*s, 10*s, 10*s);
            ctx.fillRect(x + 22*s, y + 12*s, 10*s, 10*s);
            // Красные зрачки
            ctx.fillStyle = '#ff0000';
            ctx.fillRect(x + 12*s, y + 14*s, 5*s, 6*s);
            ctx.fillRect(x + 25*s, y + 14*s, 5*s, 6*s);
            // Чёрные точки
            ctx.fillStyle = '#000000';
            ctx.fillRect(x + 13*s, y + 16*s, 3*s, 3*s);
            ctx.fillRect(x + 26*s, y + 16*s, 3*s, 3*s);

            // Рот - ухмылка
            ctx.fillStyle = '#000000';
            if (pose === 'sing') {
                ctx.fillRect(x + 12*s, y + 26*s, 16*s, 4*s);
            } else {
                ctx.fillRect(x + 14*s, y + 26*s, 14*s, 3*s);
                ctx.fillRect(x + 26*s, y + 24*s, 4*s, 3*s);
            }
        }
    },

    // Tankman - военный, шлем с визором
    tankman: {
        name: 'Tankman',
        draw: function(ctx, x, y, scale = 1, pose = 'idle') {
            const s = scale;
            ctx.imageSmoothingEnabled = false;

            // Тень
            ctx.fillStyle = 'rgba(0,0,0,0.3)';
            ctx.beginPath();
            ctx.ellipse(x + 20*s, y + 68*s, 18*s, 6*s, 0, 0, Math.PI * 2);
            ctx.fill();

            // Ноги - военные штаны
            ctx.fillStyle = '#3a3a3a';
            ctx.fillRect(x + 6*s, y + 50*s, 12*s, 18*s);
            ctx.fillRect(x + 22*s, y + 50*s, 12*s, 18*s);

            // Сапоги
            ctx.fillStyle = '#1a1a1a';
            ctx.fillRect(x + 4*s, y + 62*s, 14*s, 8*s);
            ctx.fillRect(x + 22*s, y + 62*s, 14*s, 8*s);

            // Тело - военная форма
            ctx.fillStyle = '#4a4a4a';
            ctx.fillRect(x + 4*s, y + 26*s, 32*s, 26*s);

            // Бронежилет
            ctx.fillStyle = '#3a3a3a';
            ctx.fillRect(x + 8*s, y + 30*s, 24*s, 18*s);
            ctx.fillStyle = '#2a2a2a';
            ctx.fillRect(x + 12*s, y + 32*s, 16*s, 4*s);
            ctx.fillRect(x + 12*s, y + 40*s, 16*s, 4*s);

            // Руки
            ctx.fillStyle = '#4a4a4a';
            ctx.fillRect(x - 2*s, y + 28*s, 10*s, 20*s);
            ctx.fillRect(x + 32*s, y + 28*s, 10*s, 20*s);

            // Голова - шлем
            ctx.fillStyle = '#5a5a5a';
            ctx.fillRect(x + 4*s, y + 2*s, 32*s, 26*s);
            ctx.fillRect(x + 8*s, y + 0*s, 24*s, 4*s);

            // Визор - чёрный
            ctx.fillStyle = '#1a1a1a';
            ctx.fillRect(x + 8*s, y + 8*s, 24*s, 12*s);

            // Отражение на визоре
            ctx.fillStyle = '#3a3a3a';
            ctx.fillRect(x + 10*s, y + 10*s, 8*s, 3*s);
            ctx.fillRect(x + 22*s, y + 12*s, 6*s, 2*s);

            // Рот/подбородок
            ctx.fillStyle = '#ffcc99';
            ctx.fillRect(x + 12*s, y + 22*s, 16*s, 6*s);

            // Рот
            ctx.fillStyle = '#000000';
            if (pose === 'sing') {
                ctx.fillRect(x + 14*s, y + 24*s, 12*s, 3*s);
            } else {
                ctx.fillRect(x + 16*s, y + 25*s, 8*s, 2*s);
            }
        }
    },

    // Nene - розовые волосы, школьница
    nene: {
        name: 'Nene',
        draw: function(ctx, x, y, scale = 1, pose = 'idle') {
            const s = scale;
            ctx.imageSmoothingEnabled = false;

            // Тень
            ctx.fillStyle = 'rgba(0,0,0,0.3)';
            ctx.beginPath();
            ctx.ellipse(x + 20*s, y + 68*s, 18*s, 6*s, 0, 0, Math.PI * 2);
            ctx.fill();

            // Ноги
            ctx.fillStyle = '#ffcc99';
            ctx.fillRect(x + 10*s, y + 56*s, 8*s, 12*s);
            ctx.fillRect(x + 22*s, y + 56*s, 8*s, 12*s);

            // Туфли
            ctx.fillStyle = '#8b0000';
            ctx.fillRect(x + 8*s, y + 64*s, 10*s, 6*s);
            ctx.fillRect(x + 22*s, y + 64*s, 10*s, 6*s);

            // Юбка
            ctx.fillStyle = '#1a3a5a';
            ctx.beginPath();
            ctx.moveTo(x + 6*s, y + 44*s);
            ctx.lineTo(x + 34*s, y + 44*s);
            ctx.lineTo(x + 38*s, y + 58*s);
            ctx.lineTo(x + 2*s, y + 58*s);
            ctx.closePath();
            ctx.fill();

            // Тело - белая блузка
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(x + 8*s, y + 28*s, 24*s, 18*s);

            // Бант на блузке
            ctx.fillStyle = '#ff1493';
            ctx.fillRect(x + 16*s, y + 30*s, 8*s, 6*s);
            ctx.fillRect(x + 14*s, y + 32*s, 4*s, 3*s);
            ctx.fillRect(x + 22*s, y + 32*s, 4*s, 3*s);

            // Руки
            ctx.fillStyle = '#ffcc99';
            ctx.fillRect(x + 2*s, y + 30*s, 8*s, 16*s);
            ctx.fillRect(x + 30*s, y + 30*s, 8*s, 16*s);

            // Голова
            ctx.fillStyle = '#ffcc99';
            ctx.fillRect(x + 8*s, y + 8*s, 24*s, 22*s);

            // Волосы розовые
            ctx.fillStyle = '#ff69b4';
            // Основа
            ctx.fillRect(x + 4*s, y + 2*s, 32*s, 14*s);
            // Длинные пряди по бокам
            ctx.fillRect(x + 0*s, y + 8*s, 10*s, 36*s);
            ctx.fillRect(x + 30*s, y + 8*s, 10*s, 36*s);
            // Чёлка
            ctx.fillRect(x + 10*s, y + 6*s, 20*s, 8*s);

            // Хвостики
            ctx.fillRect(x - 4*s, y + 0*s, 10*s, 14*s);
            ctx.fillRect(x + 34*s, y + 0*s, 10*s, 14*s);

            // Резинки для хвостиков
            ctx.fillStyle = '#ff1493';
            ctx.fillRect(x - 2*s, y + 6*s, 6*s, 4*s);
            ctx.fillRect(x + 36*s, y + 6*s, 6*s, 4*s);

            // Глаза
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(x + 12*s, y + 14*s, 7*s, 7*s);
            ctx.fillRect(x + 21*s, y + 14*s, 7*s, 7*s);
            // Розовые зрачки
            ctx.fillStyle = '#ff69b4';
            ctx.fillRect(x + 14*s, y + 15*s, 4*s, 5*s);
            ctx.fillRect(x + 23*s, y + 15*s, 4*s, 5*s);
            // Блики
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(x + 14*s, y + 15*s, 2*s, 2*s);
            ctx.fillRect(x + 23*s, y + 15*s, 2*s, 2*s);

            // Румянец
            ctx.fillStyle = '#ffaaaa';
            ctx.fillRect(x + 10*s, y + 22*s, 4*s, 2*s);
            ctx.fillRect(x + 26*s, y + 22*s, 4*s, 2*s);

            // Рот
            ctx.fillStyle = '#ff6b6b';
            if (pose === 'sing') {
                ctx.fillRect(x + 16*s, y + 26*s, 8*s, 4*s);
            } else {
                ctx.fillRect(x + 18*s, y + 26*s, 5*s, 2*s);
            }
        }
    },

    // Lemon Demon - Monster
    lemon: {
        name: 'Lemon Demon',
        draw: function(ctx, x, y, scale = 1, pose = 'idle') {
            const s = scale;
            ctx.imageSmoothingEnabled = false;

            // Тень
            ctx.fillStyle = 'rgba(0,0,0,0.3)';
            ctx.beginPath();
            ctx.ellipse(x + 20*s, y + 68*s, 20*s, 8*s, 0, 0, Math.PI * 2);
            ctx.fill();

            // Ноги - чёрные
            ctx.fillStyle = '#1a1a1a';
            ctx.fillRect(x + 6*s, y + 54*s, 10*s, 16*s);
            ctx.fillRect(x + 24*s, y + 54*s, 10*s, 16*s);

            // Тело - чёрный костюм
            ctx.fillStyle = '#1a1a1a';
            ctx.fillRect(x + 4*s, y + 32*s, 32*s, 24*s);

            // Руки длинные
            ctx.fillRect(x - 4*s, y + 34*s, 10*s, 24*s);
            ctx.fillRect(x + 34*s, y + 34*s, 10*s, 24*s);

            // Когти
            ctx.fillStyle = '#333333';
            ctx.fillRect(x - 6*s, y + 54*s, 4*s, 8*s);
            ctx.fillRect(x - 2*s, y + 56*s, 4*s, 8*s);
            ctx.fillRect(x + 38*s, y + 54*s, 4*s, 8*s);
            ctx.fillRect(x + 42*s, y + 56*s, 4*s, 8*s);

            // Голова - лимон
            ctx.fillStyle = '#ffee00';
            // Основа лимона
            ctx.fillRect(x + 2*s, y + 4*s, 36*s, 30*s);
            ctx.fillRect(x + 6*s, y + 0*s, 28*s, 6*s);
            ctx.fillRect(x + 6*s, y + 32*s, 28*s, 4*s);

            // Тёмные участки лимона
            ctx.fillStyle = '#ddcc00';
            ctx.fillRect(x + 2*s, y + 8*s, 4*s, 20*s);
            ctx.fillRect(x + 34*s, y + 8*s, 4*s, 20*s);

            // Глаза - чёрные с красным
            ctx.fillStyle = '#000000';
            ctx.fillRect(x + 6*s, y + 10*s, 12*s, 10*s);
            ctx.fillRect(x + 22*s, y + 10*s, 12*s, 10*s);
            // Красные зрачки
            ctx.fillStyle = '#ff0000';
            ctx.fillRect(x + 10*s, y + 12*s, 6*s, 6*s);
            ctx.fillRect(x + 26*s, y + 12*s, 6*s, 6*s);
            // Белые точки
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(x + 10*s, y + 12*s, 2*s, 2*s);
            ctx.fillRect(x + 26*s, y + 12*s, 2*s, 2*s);

            // Рот с зубами
            ctx.fillStyle = '#000000';
            ctx.fillRect(x + 8*s, y + 22*s, 24*s, 12*s);

            // Зубы острые
            ctx.fillStyle = '#ffffff';
            for (let i = 0; i < 6; i++) {
                // Верхние зубы
                ctx.beginPath();
                ctx.moveTo(x + (10 + i*4)*s, y + 22*s);
                ctx.lineTo(x + (12 + i*4)*s, y + 28*s);
                ctx.lineTo(x + (14 + i*4)*s, y + 22*s);
                ctx.fill();
                // Нижние зубы
                ctx.beginPath();
                ctx.moveTo(x + (10 + i*4)*s, y + 34*s);
                ctx.lineTo(x + (12 + i*4)*s, y + 28*s);
                ctx.lineTo(x + (14 + i*4)*s, y + 34*s);
                ctx.fill();
            }
        }
    },

    // Skid & Pump (Spooky Kids)
    spooky: {
        name: 'Spooky Kids',
        draw: function(ctx, x, y, scale = 1, pose = 'idle') {
            const s = scale;
            ctx.imageSmoothingEnabled = false;

            // Skid (скелет) - слева
            this.drawSkid(ctx, x - 10*s, y, s);

            // Pump (тыква) - справа
            this.drawPump(ctx, x + 22*s, y, s);
        },

        drawSkid: function(ctx, x, y, s) {
            // Тень
            ctx.fillStyle = 'rgba(0,0,0,0.3)';
            ctx.beginPath();
            ctx.ellipse(x + 12*s, y + 68*s, 10*s, 4*s, 0, 0, Math.PI * 2);
            ctx.fill();

            // Тело - чёрный костюм скелета
            ctx.fillStyle = '#000000';
            ctx.fillRect(x + 4*s, y + 24*s, 16*s, 28*s);

            // Рёбра белые
            ctx.fillStyle = '#ffffff';
            for (let i = 0; i < 4; i++) {
                ctx.fillRect(x + 6*s, y + (28 + i*6)*s, 12*s, 3*s);
            }

            // Ноги
            ctx.fillStyle = '#000000';
            ctx.fillRect(x + 4*s, y + 52*s, 6*s, 16*s);
            ctx.fillRect(x + 14*s, y + 52*s, 6*s, 16*s);

            // Кости ног
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(x + 5*s, y + 54*s, 4*s, 12*s);
            ctx.fillRect(x + 15*s, y + 54*s, 4*s, 12*s);

            // Руки
            ctx.fillStyle = '#000000';
            ctx.fillRect(x + 0*s, y + 26*s, 6*s, 16*s);
            ctx.fillRect(x + 18*s, y + 26*s, 6*s, 16*s);
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(x + 1*s, y + 28*s, 4*s, 12*s);
            ctx.fillRect(x + 19*s, y + 28*s, 4*s, 12*s);

            // Голова - череп
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(x + 2*s, y + 4*s, 20*s, 22*s);
            ctx.fillRect(x + 6*s, y + 2*s, 12*s, 4*s);

            // Глазницы
            ctx.fillStyle = '#000000';
            ctx.fillRect(x + 4*s, y + 8*s, 7*s, 8*s);
            ctx.fillRect(x + 13*s, y + 8*s, 7*s, 8*s);

            // Оранжевое свечение в глазах
            ctx.fillStyle = '#ff6600';
            ctx.fillRect(x + 5*s, y + 9*s, 5*s, 6*s);
            ctx.fillRect(x + 14*s, y + 9*s, 5*s, 6*s);

            // Нос
            ctx.fillStyle = '#000000';
            ctx.fillRect(x + 10*s, y + 16*s, 4*s, 4*s);

            // Зубы
            ctx.fillStyle = '#000000';
            ctx.fillRect(x + 6*s, y + 22*s, 12*s, 4*s);
            ctx.fillStyle = '#ffffff';
            for (let i = 0; i < 4; i++) {
                ctx.fillRect(x + (7 + i*3)*s, y + 22*s, 2*s, 3*s);
            }
        },

        drawPump: function(ctx, x, y, s) {
            // Тень
            ctx.fillStyle = 'rgba(0,0,0,0.3)';
            ctx.beginPath();
            ctx.ellipse(x + 12*s, y + 68*s, 10*s, 4*s, 0, 0, Math.PI * 2);
            ctx.fill();

            // Тело - чёрный костюм
            ctx.fillStyle = '#000000';
            ctx.fillRect(x + 4*s, y + 28*s, 16*s, 26*s);

            // Ноги
            ctx.fillRect(x + 4*s, y + 54*s, 6*s, 14*s);
            ctx.fillRect(x + 14*s, y + 54*s, 6*s, 14*s);

            // Руки
            ctx.fillRect(x + 0*s, y + 30*s, 6*s, 14*s);
            ctx.fillRect(x + 18*s, y + 30*s, 6*s, 14*s);

            // Голова - тыква
            ctx.fillStyle = '#ff8800';
            ctx.fillRect(x + 0*s, y + 4*s, 24*s, 26*s);
            ctx.fillRect(x + 4*s, y + 2*s, 16*s, 4*s);

            // Полоски тыквы
            ctx.fillStyle = '#dd6600';
            ctx.fillRect(x + 0*s, y + 6*s, 3*s, 22*s);
            ctx.fillRect(x + 21*s, y + 6*s, 3*s, 22*s);
            ctx.fillRect(x + 11*s, y + 4*s, 2*s, 26*s);

            // Хвостик тыквы
            ctx.fillStyle = '#228800';
            ctx.fillRect(x + 10*s, y - 2*s, 4*s, 6*s);

            // Глаза - вырезанные треугольники
            ctx.fillStyle = '#ffff00';
            ctx.beginPath();
            ctx.moveTo(x + 4*s, y + 18*s);
            ctx.lineTo(x + 8*s, y + 10*s);
            ctx.lineTo(x + 12*s, y + 18*s);
            ctx.fill();

            ctx.beginPath();
            ctx.moveTo(x + 12*s, y + 18*s);
            ctx.lineTo(x + 16*s, y + 10*s);
            ctx.lineTo(x + 20*s, y + 18*s);
            ctx.fill();

            // Рот - зубастая улыбка
            ctx.fillStyle = '#ffff00';
            ctx.fillRect(x + 4*s, y + 20*s, 16*s, 8*s);
            ctx.fillStyle = '#ff8800';
            // Зубы (вырезы)
            for (let i = 0; i < 3; i++) {
                ctx.fillRect(x + (6 + i*5)*s, y + 20*s, 3*s, 4*s);
                ctx.fillRect(x + (6 + i*5)*s, y + 24*s, 3*s, 4*s);
            }
        }
    }
};

// Отрисовка персонажа на canvas
function drawCharacter(canvasId, charName, scale = 1) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const char = Characters[charName];
    if (char) {
        const centerX = (canvas.width - 40 * scale) / 2;
        const centerY = (canvas.height - 70 * scale) / 2;
        char.draw(ctx, centerX, centerY, scale);
    }
}

// Инициализация превью персонажей
function initCharacterPreviews() {
    const characters = ['boyfriend', 'pico', 'tankman', 'nene', 'lemon', 'spooky'];
    characters.forEach(char => {
        drawCharacter(`preview-${char}`, char, 1);
    });
}

// Экспорт
window.Characters = Characters;
window.drawCharacter = drawCharacter;
window.initCharacterPreviews = initCharacterPreviews;
