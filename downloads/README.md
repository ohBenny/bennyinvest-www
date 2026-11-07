# Paczka do testów OVH

`bennyinvest-test.zip` zawiera gotową wersję strony dla adresu `/test/`. Pobierz plik przez przycisk **Download raw file** w GitHubie i rozpakuj jego zawartość bezpośrednio do katalogu `test` pod katalogiem strony na hostingu.

Wymagane PHP 8.1+ i obsługa `mail()`. Archiwum nie zawiera kodu repozytorium, zależności ani danych testowych. Nie wymaga instalacji Node.js na OVH. Paczka zawiera aktualną kompilację `/test/`, w tym gotowy folder `zdjecia/`. Po zmianach w projekcie należy ją ponownie wygenerować.

Pełna instrukcja: [test na OVH](../docs/OVH-TEST.md).

Po jednorazowym wgraniu całej nowej paczki możesz podmieniać same pliki w `test/zdjecia/` pod istniejącymi nazwami. Instrukcja jest w `zdjecia/JAK-PODMIENIAC.txt`. Zdjęcia dopasują się do stałych ramek; logotypy nie są przycinane.


## Aktualizacja samych zmienionych plików

`bennyinvest-test-zmiany.zip` zawiera tylko pliki zmienione względem poprzedniej paczki z commita `b05d163`. Wypakuj jego zawartość do istniejącego katalogu `/test/`, zachowując strukturę folderów i nadpisując wskazane pliki. Dokładna lista: [PLIKI-DO-PODMIANY.txt](PLIKI-DO-PODMIANY.txt). Zdjęć i logotypów nie trzeba nadpisywać. Dla nowej instalacji użyj pełnego `bennyinvest-test.zip`.
