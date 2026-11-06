# Test na OVH w katalogu /test/

## Przygotowanie

Hosting musi obsługiwać PHP 8.1+ i mail(). Zalecana jest aktualnie wspierana wersja PHP dostępna w panelu OVH. Sama przestrzeń na statyczne pliki nie wykona backendu. Zachowaj istniejącą konfigurację PHP i nie nadpisuj głównej strony.

Przygotowanie paczki:

```sh
export ASTRO_TELEMETRY_DISABLED=1
npm ci
npm run check
npm run build:test
```

Wynikiem jest `dist-test/` dostosowany do adresu `/test/`, z oznaczeniem `noindex, nofollow`. Zawartość tego katalogu trafia bezpośrednio do folderu `test` pod katalogiem dokumentów przypisanym do domeny (często `www/test/`). Poprawna struktura:

```
www/test/index.html
www/test/favicon.svg
www/test/_astro/...
www/test/api/quote.php
```

Nie przesyłaj całego repozytorium, `.git`, `node_modules`, plików testowych ani dodatkowego nadrzędnego folderu `dist-test`. Nie zmieniaj głównego katalogu domeny w konfiguracji multisite tylko po to, by przetestować podkatalog. Korzystaj z dostępu SFTP/FTP zapewnionego przez OVH; dane logowania wprowadzaj w swoim kliencie, nie w kodzie lub czacie. Sprawdź HTTPS dla domeny.

## Sprawdzenie

1. Otwórz `https://twoja-domena.pl/test/` (z końcowym ukośnikiem). Powinny działać wygląd, formularz i galerie.
2. Otwórz `https://twoja-domena.pl/test/api/quote.php` bez wysyłania danych. Oczekiwany jest status **405** i krótki JSON „Użyj formularza wyceny.”. To sprawdza wykonanie PHP. Jeśli pobiera się plik lub widać kod PHP, usuń endpoint z serwera i popraw konfigurację PHP przed dalszym testem.
3. W formularzu wpisz swój prawdziwy e-mail, wybierz usługę i wyślij opis oznaczony „TEST OVH”. W narzędziach przeglądarki, zakładka Network/Sieć, żądanie musi trafić do `/test/api/quote.php` i zwrócić **200** z `ok: true`.
4. Sprawdź odbiór na `biuro@bennyinvest.pl`, również folder spam. Odpowiedź na wiadomość powinna kierować do e-maila wpisanego w formularzu. HTTP 200 oznacza przyjęcie do transportu poczty, nie gwarancję doręczenia.
5. Dla testu limitu wyślij łącznie trzy poprawne zapytania z tego samego publicznego IP w czasie krótszym niż 10 minut. Czwarte ma zwrócić **429** z komunikatem blokady. Współdzielone Wi-Fi/NAT lub proxy może współdzielić limit. Próba przekazania do poczty, która skończyła się błędem transportu, także zużywa próbę. Nieprawidłowo wypełnione pola nie zużywają limitu.
6. Po wygaśnięciu najstarszej z trzech prób (10 minut od jej wykonania) będzie można wysłać kolejną. Zmiana limitu w przeglądarce nie omija zabezpieczenia serwera.

## Diagnoza błędów

- **404**: sprawdź strukturę folderu i adres `/test/api/quote.php`.
- **403**: sprawdź domenę, protokół HTTPS, Origin oraz konfigurację reverse proxy. Nie wyłączaj sprawdzania Origin w celu obejścia problemu.
- **429**: zaczekaj na wygaśnięcie limitu.
- **500/503**: sprawdź logi PHP OVH, obsługę mail(), ustawienia poczty i dostęp do katalogu tymczasowego. Nie ustawiaj uprawnień 777. Zwrócony JSON nie powinien zawierać szczegółowych błędów PHP ani ścieżek serwera.
- **200, ale brak wiadomości**: sprawdź spam, limity wychodzącej poczty oraz konfigurację nadawcy/SPF/DKIM z operatorem poczty. Nie opisuj samego 200 jako potwierdzonego doręczenia.

Kopia `/test/` jest publicznie dostępna mimo noindex; dla prywatnych materiałów użyj ochrony katalogu na hostingu. Po testach usuń niepotrzebną kopię lub ogranicz do niej dostęp. Osobno pozostają zalecenia wcześniejszego audytu (globalny limit, prywatny katalog limitera i nagłówki ochronne); nie są objęte samą zmianą ścieżki instalacji.

## Wersja docelowa w głównym katalogu

Dla `/` wykonaj zwykłe `npm run build` i użyj zawartości `dist/`. Nie kopiuj wersji zbudowanej dla `/test/` do głównego katalogu, bo jej ścieżki będą wskazywać podkatalog.
