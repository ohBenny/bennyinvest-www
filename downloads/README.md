# Paczka do testów OVH

`bennyinvest-test.zip` zawiera gotową wersję strony dla adresu `/test/`. Pobierz plik przez przycisk **Download raw file** w GitHubie i rozpakuj jego zawartość bezpośrednio do katalogu `test` pod katalogiem strony na hostingu.

Wymagane PHP 8.1+ i obsługa `mail()`. Archiwum nie zawiera kodu repozytorium, zależności ani danych testowych. Nie wymaga instalacji Node.js na OVH. Paczka zawiera aktualną kompilację `/test/`, w tym gotowy folder `zdjecia/`. Po zmianach w projekcie należy ją ponownie wygenerować.

Pełna instrukcja: [test na OVH](../docs/OVH-TEST.md).

Po jednorazowym wgraniu całej nowej paczki możesz podmieniać same pliki w `test/zdjecia/` pod istniejącymi nazwami. Instrukcja jest w `zdjecia/JAK-PODMIENIAC.txt`. Zdjęcia dopasują się do stałych ramek; logotypy nie są przycinane.
