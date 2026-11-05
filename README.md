# Benny Invest

One-page w Astro i Tailwind CSS 4, Node.js 24 LTS. Strona generuje statyczne HTML/CSS/JS; bezpośrednia wysyłka zapytań wymaga PHP 8.1+ z działającym transportem `mail()` na hostingu.

```sh
export ASTRO_TELEMETRY_DISABLED=1
npm ci
npm run dev
```

Serwer Astro domyślnie korzysta z portu 4321. Sam Astro nie wykonuje PHP — formularz w takim podglądzie pokaże opcję kontaktu e-mail zamiast potwierdzenia wysyłki.

```sh
npm run check
npm run build
npm run preview
```

`dist/` zawiera statyczną stronę i `api/quote.php`. Do lokalnego podglądu z backendem użyj PHP:

```sh
php -S 127.0.0.1:8085 -t dist
```

Samo uruchomienie PHP nie konfiguruje poczty. PHP CLI musi mieć transport sendmail; na hostingu OVH trzeba potwierdzić obsługę PHP, `mail()` oraz uprawnienia zapisu do katalogu tymczasowego. Wysyłka nie zadziała na hostingu obsługującym wyłącznie statyczne pliki. Nie publikowano strony na OVH. Projekt nie zawiera automatycznego wdrożenia.

## Formularz

Okno „Wyceń kampanię” wymaga usługi, imienia lub firmy, poprawnego e-maila, obszaru działań i opisu. Termin oraz budżet mogą pozostać do ustalenia. Endpoint `/api/quote.php` wysyła wiadomości tylko do `biuro@bennyinvest.pl`. Nadawca jest stały; poprawny e-mail klienta trafia do `Reply-To`. Funkcja `mail()` potwierdza przekazanie do transportu, nie doręczenie do skrzynki.

Backend waliduje dane, ogranicza rozmiar zapytania, sprawdza pochodzenie i format JSON, korzysta z pola pułapki oraz limitu 3 prób na 10 minut dla adresu IP. Licznik w katalogu tymczasowym zawiera hashe adresów i znaczniki czasu; plik ma ograniczony rozmiar przez limit wpisów. Za reverse proxy bez konfiguracji odrębnego zaufania limit może być wspólny dla użytkowników tego proxy. Po błędzie lub braku potwierdzenia formularz zachowuje treść i udostępnia kontakt `mailto:` oraz możliwość kopiowania. Nie zapisuje zapytania w pamięci przeglądarki ani bazie danych.

Wymagany test na docelowym hostingu: wysłać uzgodnione zapytanie, sprawdzić skrzynkę odbiorczą i możliwość odpowiedzi. Nie przeprowadzono jeszcze testu doręczania na OVH. Testy lokalne używają przechwycenia poczty; niczego nie wysyłają do zewnętrznych skrzynek.

```sh
npm run build
npm run test:quote
```

Test wymaga PHP CLI w PATH lub zmiennej `PHP_BIN` wskazującej jego plik wykonywalny. Sprawdza walidację, pochodzenie, adresata i Reply-To, limit prób oraz awarię transportu.

## Treści i wygląd

- `src/pages/index.astro`: usługi, hasło i dane spółki podane przez właściciela. Nie dodano niepodanego numeru budynku ani danych sądu rejestrowego lub kapitału.
- `src/styles/global.css`: monochromatyczna oprawa, typografia i układ.
- `src/data/team.ts`: founder i dwie karty pracowników. Dodaj zdjęcie np. `public/team/founder.jpg`, ustaw `photo: '/team/founder.jpg'`, imię i opis `alt`. Kolejna osoba to kolejny obiekt w tablicy. Zdjęcia do 220 px szerokości, proporcje 4:5, w szarości.
- `src/data/partners.ts`: nazwy i logotypy. Aktualne wpisy to podpisane miejsca na logo, bez deklarowania rzeczywistych współprac. Dla potwierdzonego partnera ustaw nazwę, ścieżkę do pliku z `public/partners/` i `placeholder: false`.

Oferta obejmuje kolportaż, reklamę w taxi, Meta i Google Ads, akcje promocyjne oraz tworzenie i obsługę stron WWW. Opisy są propozycją redakcyjną. Inspiracje wizualne: szwajcarskie projektowanie graficzne (Josef Müller-Brockmann), geometryczny minimalizm (Sol LeWitt). Grafika SVG jest autorska; nie wykorzystuje reprodukcji prac artystów ani zdjęć realizacji.

## Prywatność

Bez trackerów i reklamowych cookies. Baner daje wybór: zaakceptowanie mapy lub „Tylko niezbędne”. Dopiero zgoda ustawia adres iframe OpenStreetMap. Wybór zapisuje się pod kluczem `benny-privacy-v1` w localStorage i można go zmienić w stopce. Cofnięcie zgody odłącza mapę, ale nie cofa wcześniejszych połączeń. Bez pamięci wybór działa do odświeżenia. Mapa przedstawia miasto, nie dokładny adres siedziby.

Pasek partnerów ma przycisk zatrzymania, zatrzymuje się po najechaniu i respektuje systemowe ograniczenie ruchu. Panel admina nie jest częścią projektu.
