# Калькулятор веса металла онлайн и расхода краски — УралМетСтрой

Онлайн-калькулятор веса металлопроката и расхода краски. Мигрирован с React+Vite на **Next.js 14** (App Router).

**Продакшен:** [calc.uralmetstroy.ru](https://calc.uralmetstroy.ru)

---

## Стек

- **Next.js 14** (App Router, SSR/Static)
- **TypeScript**
- **styled-components** — стилизация компонентов
- **Zustand** — глобальное состояние (тема, история расчётов)
- **react-hook-form** — формы
- **react-slider** — ползунки
- **Sass** — глобальные стили
- **nanoid** — генерация ID результатов

---

## Страницы

| Маршрут | Описание |
|---------|----------|
| `/` | Калькулятор веса металлопроката |
| `/paint` | Калькулятор расхода краски |
| `/info` | Справка и инструкция |

---

## Возможности

**Калькулятор веса металла онлайн:**
- 10 форм профилей: труба профильная, лист, труба круглая, круг, уголок, квадрат, швеллер, полоса, балка, шестигранник
- 200+ марок металлов: сталь, чугун, алюминий, бронза, латунь, медь, магний, никель, олово, свинец, титан, цинк
- Единицы длины: мм / см / м; единицы веса: кг / тн
- История расчётов (localStorage)

**Калькулятор краски:**
- Расчёт расхода по площади металлоизделия
- Учёт удельного веса, толщины покрытия, эффективности нанесения
- Поддержка валют: руб / USD / EUR
- Двусторонняя покраска для листов и полос

**UI:**
- Тёмная и светлая тема (сохраняется в localStorage)
- Адаптивная вёрстка (desktop / tablet / mobile)

---

## Структура проекта

```
src/
├── app/
│   ├── layout.tsx          # Root layout, metadata, styled-components registry
│   ├── page.tsx            # Калькулятор металла + JSON-LD WebApplication
│   ├── paint/page.tsx      # Калькулятор краски + JSON-LD WebApplication
│   ├── info/page.tsx       # Справка + JSON-LD FAQPage
│   └── globals.scss        # Глобальные стили, CSS-переменные, темы
├── components/
│   ├── pages/              # Клиентские компоненты страниц
│   ├── results/            # Таблицы результатов
│   ├── sidebar/            # Боковое меню
│   └── ui/                 # Кнопки, поля, select, range, spoiler
├── lib/
│   └── registry.tsx        # styled-components SSR registry
├── store/
│   ├── appStore.ts         # Тема, состояние сайдбара
│   ├── resultStore.ts      # История расчётов металла
│   └── resultPaintStore.ts # История расчётов краски
├── helpers.ts              # Формулы расчёта, списки форм и размеров
├── selects.ts              # Данные по металлам и маркам (200+ записей)
└── types.ts                # TypeScript типы
```

---

## Запуск локально

```bash
npm install
npm run dev
# http://localhost:3000
```

## Сборка и деплой

```bash
npm run build
pm2 reload calc.uralmetstroy.ru
```

**Сервер:** `138.249.141.64`, порт `3002` (PM2 fork), Nginx reverse proxy, SSL Let's Encrypt

---

## SEO

- Уникальные `title`, `description`, `canonical` для каждой страницы
- OpenGraph теги
- JSON-LD Schema.org: `WebApplication` (главная, краска), `FAQPage` (справка)
