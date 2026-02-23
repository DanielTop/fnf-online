# FNF Online

Многопользовательская версия Friday Night Funkin — играй онлайн вместе с друзьями в реальном времени.

## О проекте

Node.js-сервер + Socket.IO обеспечивают синхронизацию игроков. Оригинальный FNF-контент запускается в браузере.

## Стек

- **Server:** Node.js + Express + Socket.IO
- **Client:** JavaScript (браузер)

## Запуск

```bash
npm install
npm start
# Сервер запустится на порту 3000
```

## Структура

```
server/     — серверная логика (Socket.IO)
public/     — клиентский код и ассеты
```

## Связанные репо

- [fnf](https://github.com/nglain/fnf) — кастомный FNF-контент (НЕДЕЛЯ D)
