# Benny Invest

Statyczna strona one-page w Astro i Tailwind CSS 4. Node.js 24 LTS, npm.

```sh
export ASTRO_TELEMETRY_DISABLED=1
npm ci
npm run dev
```

Podgląd deweloperski korzysta domyślnie z portu 4321. Kompilacja i podgląd wersji produkcyjnej:

```sh
npm run check
npm run build
npm run preview
```

Wynik kompilacji znajduje się w `dist/`. Zwykły hosting OVH obsługuje te pliki bez Node.js na serwerze. Projekt nie zawiera automatycznej publikacji.

Treści edytuje się w `src/pages/index.astro`, wygląd w `src/styles/global.css`. Poza nazwą spółki, NIP, lokalizacją i e-mailem teksty są propozycją redakcyjną do zatwierdzenia. Grafika architektoniczna jest abstrakcyjną ilustracją CSS, nie przedstawia realizacji firmy. Kontakt używa odnośnika `mailto:` i wymaga klienta poczty; nie ma backendu ani formularza zbierającego dane. Strona nie korzysta z zewnętrznych fontów, skryptów analitycznych ani cookies.
