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

Treści edytuje się w `src/pages/index.astro`, wygląd w `src/styles/global.css`. Oferta obejmuje wskazane usługi: kolportaż materiałów, reklamę w taxi, kampanie Meta i Google Ads oraz akcje promocyjne. Opisy usług są propozycją redakcyjną do zatwierdzenia. Grafika geometryczna jest autorską ilustracją SVG, nie przedstawia realizacji firmy. Kontakt i formularz wyceny korzystają z `mailto:`; nie ma backendu wysyłającego pocztę ani zapisu danych na stronie. Formularz przygotowuje wiadomość, którą użytkownik sam wysyła ze swojego programu pocztowego. Treść można również skopiować. Strona nie korzysta z zewnętrznych fontów ani skryptów analitycznych. Osadzona mapa pokazuje Szczecin, bez oznaczenia dokładnego adresu siedziby. Zasoby OpenStreetMap są pobierane dopiero po zgodzie użytkownika; jej działanie wymaga dostępu do tego serwisu.

Kierunek wizualny: czarno-biała typografia, szarości, siatka i rytm linii. Punktem odniesienia są zasady szwajcarskiego projektowania graficznego (Josef Müller-Brockmann) oraz geometryczny minimalizm (Sol LeWitt). Projekt nie wykorzystuje reprodukcji ich prac ani zewnętrznych materiałów graficznych. Ikona strzałki jest wspólnym komponentem `src/components/Arrow.astro`.


## Zdjęcie foundera i kolejne osoby

Dane kart są w `src/data/team.ts`. Karta ma szerokość do 220 px i proporcje zdjęcia 4:5. Aby zastąpić prostokąt zdjęciem, dodaj plik np. `public/team/founder.jpg` i ustaw w pierwszym wpisie `photo: '/team/founder.jpg'`, `name` oraz opis `alt`. Zdjęcia są prezentowane w szarości. Aby dodać kolejną osobę, dopisz obiekt z polami `name`, `role`, `photo`, `alt` do tablicy `team` — układ utworzy kolejną kartę automatycznie.

## Formularz wyceny

Przycisk „Wyceń kampanię” otwiera dostępne z klawiatury okno dialogowe. Formularz wymaga wyboru co najmniej jednej usługi, imienia lub firmy, poprawnego e-maila, obszaru działań i krótkiego opisu celu. Termin i budżet mogą pozostać do ustalenia. Po walidacji powstaje zakodowany odnośnik `mailto:` oraz treść do ręcznego skopiowania. Przygotowanie wiadomości nie oznacza jej wysłania. Wysyłanie bezpośrednio ze strony wymaga osobnego podłączenia backendu lub usługi formularzy. Bez JavaScript dostępny jest zwykły kontakt e-mail.


## Partnerzy i prywatność

Pasek partnerów edytuje się w `src/data/partners.ts`. Aktualne wpisy są podpisanymi miejscami na logo — nie deklarują rzeczywistych współprac. Dla potwierdzonego partnera podaj nazwę, ścieżkę do logotypu z `public/partners/` i ustaw `placeholder: false`. Pasek można zatrzymać przyciskiem, zatrzymuje się również po najechaniu; respektuje ograniczenie ruchu w systemie.

Baner prywatności pozwala zaakceptować mapę lub wybrać „Tylko niezbędne”. Wybór jest przechowywany w `localStorage` pod kluczem `benny-privacy-v1`. Przed zgodą nie jest ustawiany adres iframe mapy. Wybór można zmienić w stopce; cofnięcie zgody usuwa adres mapy i blokuje jej ponowne wczytanie. Wcześniejszego połączenia z dostawcą nie można cofnąć. Nie dodano trackerów ani reklamowych cookies. W przypadku braku dostępu do pamięci wybór działa w bieżącej karcie, ale nie przetrwa odświeżenia.

Panel admina nie jest częścią projektu; zarządzanie treścią odbywa się przez pliki danych.
