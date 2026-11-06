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
- `src/data/team.ts`: obecnie tylko karta foundera po lewej stronie sekcji O nas. Pliki zdjęć pracowników są zachowane na później, ale karty nie są wyświetlane. Gotowe pliki do podmiany są w `public/zdjecia/zespol/`: `founder.jpg`, `pracownik-1.jpg`, `pracownik-2.jpg`. Ścieżki są już podłączone. Imię i opis `alt` możesz uzupełnić w pliku danych. Kolejna osoba to kolejny obiekt w tablicy. Zdjęcia do 260 px szerokości, proporcje 4:5, w szarości.
- `public/zdjecia/partnerzy/partnerzy.json`: lista nazw i plików logo, edytowalna również bezpośrednio na OVH. Aktualne obrazy to podpisane miejsca na logo. `src/data/partners.ts` tworzy z tej listy zapasową wersję HTML.

Oferta obejmuje kolportaż, reklamę w taxi, Meta i Google Ads, akcje promocyjne oraz tworzenie i obsługę stron WWW. Opisy są propozycją redakcyjną. Inspiracje wizualne: szwajcarskie projektowanie graficzne (Josef Müller-Brockmann), geometryczny minimalizm (Sol LeWitt). Grafika SVG jest autorska; nie wykorzystuje reprodukcji prac artystów ani zdjęć realizacji.

## Prywatność

Bez trackerów i reklamowych cookies. Baner daje wybór: zaakceptowanie mapy lub „Tylko niezbędne”. Dopiero zgoda ustawia adres iframe OpenStreetMap. Wybór zapisuje się pod kluczem `benny-privacy-v1` w localStorage i można go zmienić w stopce. Cofnięcie zgody odłącza mapę, ale nie cofa wcześniejszych połączeń. Bez pamięci wybór działa do odświeżenia. Mapa przedstawia województwo, bez oznaczenia adresu siedziby.

Pasek partnerów ma przycisk zatrzymania, zatrzymuje się po najechaniu i respektuje systemowe ograniczenie ruchu. Panel admina nie jest częścią projektu.


## Rozwijane usługi i zdjęcia

Opisy, zakresy i podpisy galerii są w `src/data/services.ts`. Zdjęcia są podłączone do stałych ścieżek w `public/zdjecia/uslugi/` (trzy na usługę). Nadpisanie pliku o tej samej nazwie podmienia obraz bez edycji kodu. Przy brakującym pliku pozostaje zastępcza ramka. Podpisy i opisy alternatywne dopasuj do dodawanych materiałów. Galerie rozwijają się natywnie także bez JavaScript. Przycisk „Wyceń tę usługę” otwiera formularz i zaznacza właściwe usługi (dla digital: Meta Ads i Google Ads). Dane kontaktowe wpisane w formularzu są zachowywane podczas przełączania kategorii.


## Test w podkatalogu OVH

`npm run build:test` tworzy `dist-test/` dla adresu `/test/` i dodaje noindex. Prześlij jego zawartość do folderu test na hostingu, bez zmiany głównej strony. Pełna instrukcja i diagnostyka: [docs/OVH-TEST.md](docs/OVH-TEST.md). Zwykłe `npm run build` pozostaje kompilacją dla głównego adresu `/`. Limit backendu wynosi 3 poprawne próby przekazania wiadomości na 10 minut z jednego IP; czwarta zwraca HTTP 429.


## Podmiana zdjęć bez kompilacji

Po jednorazowym wgraniu nowej paczki do OVH katalog `test/zdjecia/` zawiera wszystkie podłączone pliki. Wystarczy nadpisać właściwy JPG/PNG pod identyczną nazwą. Nie trzeba wtedy edytować HTML ani kompilować strony. Pełna lista nazw i wskazówki: `public/zdjecia/JAK-PODMIENIAC.txt` (także w paczce). Zdjęcia są kadrowane od środka przez `object-fit: cover`, logotypy mieszczą się bez przycinania przez `contain`. Ramki zachowują dotychczasowe proporcje; na telefonie galerie mają 16:9. Podmiana pliku nie zmniejsza jego rozmiaru w bajtach — zalecane są skompresowane fotografie 200–500 KB. Po zmianie odśwież stronę Ctrl+F5 i ewentualnie wyczyść cache hostingu. Zachowaj kopie swoich zdjęć w źródłach przed kolejnym pełnym wdrożeniem.


## Kategorie oferty

`serviceCategories` w `src/data/services.ts` grupuje pięć usług w reklamę bezpośrednią (główna specjalizacja), mobilną i cyfrową. Nagłówki sprzedażowe są w polu `headline`. Ścieżki zdjęć, podpisy galerii i identyfikatory formularza pozostają bez zmian. Sekcja „Kampanie łączone” przedstawia przykładowy plan otwarcia restauracji; nie opisuje zrealizowanej kampanii. Obszar działania obejmuje Szczecin, Koszalin, Stargard i pozostałe miejscowości zachodniopomorskiego z dostępnością do indywidualnego potwierdzenia.


## Mapa regionu

`src/pages/mapa.astro` jest lokalnym widokiem Leaflet ładowanym w iframe dopiero po zgodzie. Podkład pochodzi z `tile.openstreetmap.org`; geometria uproszczonego obrysu zachodniopomorskiego jest lokalna w `src/data/zachodniopomorskie.json`. Źródło danych: [polska-geojson](https://github.com/ppatrzyk/polska-geojson), dane PRG/GUGiK, licencja MIT (Copyright 2019 Piotr Patrzyk). Licencje danych i Leaflet są w `public/licencje/`. Czerwony obrys pozostaje widoczny bez podkładu, a mapa pokazuje komunikat awarii kafelków. Nie jest to mapa do pomiarów ani granic ewidencyjnych. Do połączeń sieciowych potrzebne jest dopuszczenie `tile.openstreetmap.org`; mapa nie korzysta z zewnętrznego CDN JavaScript. Polityka CSP dla ramki musi uwzględniać lokalny adres `/mapa/` (lub `/test/mapa/`) oraz obrazy z serwera kafelków wewnątrz tej ramki.


### Polityka kafelków OSM

Strona mapy i iframe używają `strict-origin-when-cross-origin`. Nie ustawiaj dla mapy `no-referrer` — serwer kafelków OSM wymaga identyfikującego Referer w żądaniach przeglądarki. Przy błędzie kafelków warstwa podkładu jest usuwana, a lokalny czerwony obrys pozostaje dostępny. Zachowanie i nagłówki przetestowano lokalnie; rzeczywiste odblokowanie domeny przez dostawcę należy potwierdzić po wgraniu na OVH.


## Lista partnerów bez kompilacji

Listą logotypów zarządza `public/zdjecia/partnerzy/partnerzy.json` (na OVH: `test/zdjecia/partnerzy/partnerzy.json`). Każdy wpis ma `name` i `logo` — samą nazwę pliku PNG/JPG/JPEG/WEBP z tego folderu. Można dodawać, usuwać i zmieniać kolejność wpisów bez przebudowy strony. Pusta lista ukrywa sekcję; błędny lub niedostępny JSON pozostawia listę zapasową z HTML. Pasek powtarza sekwencję bez pustej przerwy także przy jednym logo i respektuje ograniczenie ruchu. Zdjęcie foundera ma obecnie maksymalnie 260 px szerokości. Favicon jest dostarczany jako PNG, ICO i ikona Apple; po zmianie przeglądarka może wymagać ponownego otwarcia karty.
