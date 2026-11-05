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

Treści edytuje się w `src/pages/index.astro`, wygląd w `src/styles/global.css`. Oferta obejmuje wskazane usługi: kolportaż materiałów, reklamę w taxi, kampanie Meta i Google Ads oraz akcje promocyjne. Opisy usług są propozycją redakcyjną do zatwierdzenia. Grafika geometryczna jest autorską ilustracją SVG, nie przedstawia realizacji firmy. Kontakt używa odnośnika `mailto:` i wymaga klienta poczty; nie ma backendu ani formularza zbierającego dane. Strona nie korzysta z zewnętrznych fontów ani skryptów analitycznych. Osadzona mapa pobiera zasoby z OpenStreetMap i pokazuje Szczecin, bez oznaczenia dokładnego adresu siedziby; jej działanie wymaga dostępu do serwisu OpenStreetMap.

Kierunek wizualny: czarno-biała typografia, szarości, siatka i rytm linii. Punktem odniesienia są zasady szwajcarskiego projektowania graficznego (Josef Müller-Brockmann) oraz geometryczny minimalizm (Sol LeWitt). Projekt nie wykorzystuje reprodukcji ich prac ani zewnętrznych materiałów graficznych. Ikona strzałki jest wspólnym komponentem `src/components/Arrow.astro`.
