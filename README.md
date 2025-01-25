### Development

```bash
npm ci

PAGES_CACHE_TIME=1 npm run dev
```

# Структура

```bash
# API фолдер
./src/pages/api/9-qumalaq

# Кастомный кубик, который потом перенесем на сайт
./src/ui/constructor/blocks/TogyzQumalaq

# Класс хранящий состояние игры, хранится и на сервере и на клиенте
./src/game

# Рисование доски и анимации доски
./src/board

```
