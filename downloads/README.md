# Paczka do testów OVH

`bennyinvest-test.zip` zawiera gotową wersję strony dla adresu `/test/`. Pobierz plik przez przycisk **Download raw file** w GitHubie i rozpakuj jego zawartość bezpośrednio do katalogu `test` pod katalogiem strony na hostingu.

Wymagane PHP 8.1+ i obsługa `mail()`. Archiwum nie zawiera kodu repozytorium, zależności ani danych testowych. Nie wymaga instalacji Node.js na OVH. Paczka jest kopią kompilacji z commita `181d142`; po kolejnych zmianach trzeba ją ponownie zbudować, aby zawierała nowszą wersję.

Pełna instrukcja: [test na OVH](../docs/OVH-TEST.md).
