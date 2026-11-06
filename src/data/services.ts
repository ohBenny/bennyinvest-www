const base = [
  { title: 'Kolportaż materiałów', category: 'DRUK / DYSTRYBUCJA', text: 'Ulotki, katalogi, materiały reklamowe. Pomagamy zaplanować dystrybucję tak, by komunikat trafił do odbiorców w wybranym obszarze.' },
  { title: 'Reklama w taxi', category: 'MIASTO / W RUCHU', text: 'Twoja marka w codziennym rytmie miasta. Dobieramy formę obecności reklamowej w taksówkach do potrzeb kampanii.' },
  { title: 'Kampanie Meta i Google Ads', category: 'DIGITAL / KAMPANIE', text: 'Reklama na Facebooku, Instagramie i w Google. Planowanie, uruchomienie i optymalizacja kampanii dopasowanych do Twojego celu i budżetu.' },
  { title: 'Strony WWW i obsługa', category: 'WWW / WSPARCIE', text: 'Tworzymy strony dopasowane do Twojej marki. Pomagamy w uruchomieniu, aktualizacji treści i bieżącej obsłudze, żeby strona nadążała za Twoją firmą.' },
  { title: 'Akcje promocyjne', category: 'MARKA / SPOTKANIE', text: 'Bezpośredni kontakt z odbiorcami. Organizujemy działania promocyjne, które pozwalają przedstawić markę, produkt lub ofertę w terenie.' }
];

const details = [
  { id: 'kolportaz', quoteServices: ['Kolportaż materiałów'], description: 'Dobieramy obszar i sposób dystrybucji do Twojej oferty. Zanim zaczniemy, ustalamy nakład, termin oraz grupę odbiorców.', scope: ['Dobór obszaru dystrybucji', 'Ustalenie nakładu i harmonogramu', 'Dystrybucja materiałów reklamowych'], captions: ['Materiały drukowane', 'Dystrybucja w terenie', 'Kampania lokalna'] },
  { id: 'taxi', quoteServices: ['Reklama w taxi'], description: 'Reklama obecna w codziennym ruchu miasta. Wspólnie ustalimy dostępne formaty, okres ekspozycji i zakres kampanii.', scope: ['Dobór formatu reklamy', 'Planowanie okresu ekspozycji', 'Koordynacja działań reklamowych'], captions: ['Format reklamy', 'Marka w ruchu', 'Ekspozycja w mieście'] },
  { id: 'digital', quoteServices: ['Meta Ads', 'Google Ads'], description: 'Zaczynamy od celu, odbiorców i budżetu. Na tej podstawie planujemy kampanię oraz dobieramy kanały i komunikaty.', scope: ['Plan kampanii i grup odbiorców', 'Uruchomienie reklam Meta i Google', 'Optymalizacja i omówienie wyników'], captions: ['Kreacja reklamowa', 'Komunikat kampanii', 'Podsumowanie działań'] },
  { id: 'www', quoteServices: ['Strony WWW i obsługa'], description: 'Strona, która jasno prezentuje Twoją ofertę. Pomagamy przejść od struktury i projektu do uruchomienia oraz późniejszych aktualizacji.', scope: ['Struktura i projekt strony', 'Wdrożenie i uruchomienie', 'Aktualizacje treści i bieżące wsparcie'], captions: ['Projekt strony', 'Widok mobilny', 'Detale i treści'] },
  { id: 'promocje', quoteServices: ['Akcje promocyjne'], description: 'Bezpośrednie spotkanie marki z odbiorcą. Dobieramy formę akcji do miejsca, produktu i grupy, do której chcesz dotrzeć.', scope: ['Pomysł i plan akcji', 'Organizacja działań w terenie', 'Koordynacja promocji marki'], captions: ['Przygotowania', 'Akcja w terenie', 'Kontakt z odbiorcami'] },
];
// Podmień pliki w public/zdjecia/uslugi/ bez edycji kodu.
const photoFiles: Record<string, string[]> = Object.fromEntries(
  details.map(service => [service.id, [1, 2, 3].map(number => `/zdjecia/uslugi/${service.id}-${number}.jpg`)])
);
export const services = base.map((service, index) => ({ ...service, ...details[index], photos: details[index].captions.map((caption, photoIndex) => ({ src: photoFiles[details[index].id]?.[photoIndex] ?? '', alt: caption, caption })) }));
