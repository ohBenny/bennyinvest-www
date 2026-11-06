const base = [
  { title: 'Kolportaż materiałów', headline: 'Twoja oferta bliżej klientów.', category: 'DRUK / DYSTRYBUCJA', text: 'Przedstaw ofertę mieszkańcom wybranego obszaru. Planujemy kolportaż ulotek, katalogów i materiałów reklamowych z uwzględnieniem lokalizacji oraz odbiorców.' },
  { title: 'Reklama w taxi', headline: 'Niech miasto zobaczy Twoją markę.', category: 'MIASTO / W RUCHU', text: 'Zadbaj o obecność marki w codziennym ruchu miasta. Reklama w taxi, ekrany i reklama na pojazdach — dostępność oraz format ustalamy indywidualnie.' },
  { title: 'Kampanie Meta i Google Ads', headline: 'Daj klientom powód, by wybrali Ciebie.', category: 'DIGITAL / KAMPANIE', text: 'Pokaż ofertę wybranym odbiorcom na Facebooku, Instagramie i w Google. Dobieramy komunikaty i kampanie do celu, lokalizacji oraz budżetu Twojej marki.' },
  { title: 'Strony WWW i obsługa', headline: 'Strona, która pracuje na Twoją markę.', category: 'WWW / WSPARCIE', text: 'Ułatw klientom poznanie oferty i kontakt z firmą. Projektujemy strony WWW, aktualizujemy treści i zapewniamy obsługę techniczną w uzgodnionym zakresie.' },
  { title: 'Akcje promocyjne', headline: 'Spotkaj swoich przyszłych klientów.', category: 'MARKA / SPOTKANIE', text: 'Przenieś komunikację marki do bezpośredniego kontaktu. Planujemy akcje promocyjne i kampanie terenowe dopasowane do miejsca, produktu i odbiorców.' }
];

const details = [
  { id: 'kolportaz', detailHeading: 'Oferta w rękach lokalnych odbiorców.', quoteServices: ['Kolportaż materiałów'], description: 'Dobieramy obszar i sposób dystrybucji do Twojej oferty. Zanim zaczniemy, ustalamy nakład, termin oraz grupę odbiorców.', scope: ['Dobór obszaru dystrybucji', 'Ustalenie nakładu i harmonogramu', 'Dystrybucja materiałów reklamowych'], captions: ['Materiały drukowane', 'Dystrybucja w terenie', 'Kampania lokalna'] },
  { id: 'taxi', detailHeading: 'Twoja marka w codziennym ruchu miasta.', quoteServices: ['Reklama w taxi'], description: 'Dobieramy możliwości reklamy mobilnej do Twojego celu. Reklama w taxi, ekrany oraz reklama na pojazdach wymagają indywidualnego potwierdzenia dostępności, lokalizacji i terminu.', scope: ['Dobór formatu reklamy', 'Planowanie okresu ekspozycji', 'Koordynacja działań reklamowych'], captions: ['Format reklamy', 'Marka w ruchu', 'Ekspozycja w mieście'] },
  { id: 'digital', detailHeading: 'Kampania dopasowana do celu i odbiorców.', quoteServices: ['Meta Ads', 'Google Ads'], description: 'Zaczynamy od celu, odbiorców i budżetu. Na tej podstawie planujemy kampanię oraz dobieramy kanały i komunikaty.', scope: ['Plan kampanii i grup odbiorców', 'Uruchomienie reklam Meta i Google', 'Optymalizacja i omówienie wyników'], captions: ['Kreacja reklamowa', 'Komunikat kampanii', 'Podsumowanie działań'] },
  { id: 'www', detailHeading: 'Od projektu strony po bieżące wsparcie.', quoteServices: ['Strony WWW i obsługa'], description: 'Strona, która jasno prezentuje Twoją ofertę. Pomagamy przejść od struktury i projektu do uruchomienia oraz późniejszych aktualizacji.', scope: ['Struktura i projekt strony', 'Wdrożenie i uruchomienie', 'Aktualizacje treści i bieżące wsparcie'], captions: ['Projekt strony', 'Widok mobilny', 'Detale i treści'] },
  { id: 'promocje', detailHeading: 'Bezpośredni kontakt, który przybliża markę.', quoteServices: ['Akcje promocyjne'], description: 'Bezpośrednie spotkanie marki z odbiorcą. Dobieramy formę akcji do miejsca, produktu i grupy, do której chcesz dotrzeć.', scope: ['Pomysł i plan akcji', 'Organizacja działań w terenie', 'Koordynacja promocji marki'], captions: ['Przygotowania', 'Akcja w terenie', 'Kontakt z odbiorcami'] },
];
// Podmień pliki w public/zdjecia/uslugi/ bez edycji kodu.
const photoFiles: Record<string, string[]> = Object.fromEntries(
  details.map(service => [service.id, [1, 2, 3].map(number => `/zdjecia/uslugi/${service.id}-${number}.jpg`)])
);
export const services = base.map((service, index) => ({ ...service, ...details[index], photos: details[index].captions.map((caption, photoIndex) => ({ src: photoFiles[details[index].id]?.[photoIndex] ?? '', alt: caption, caption })) }));


export const serviceCategories = [
  { id: 'bezposrednia', title: 'Reklama bezpośrednia', featured: true, intro: 'Łączymy kolportaż materiałów reklamowych z kampaniami terenowymi, by przybliżyć Twoją ofertę lokalnym odbiorcom.', serviceIds: ['kolportaz', 'promocje'] },
  { id: 'mobilna', title: 'Reklama mobilna', featured: false, intro: 'Reklama w taxi, ekrany i reklama na pojazdach. Dostępność formatów, miejsce i czas ekspozycji ustalamy indywidualnie.', serviceIds: ['taxi'] },
  { id: 'cyfrowa', title: 'Reklama cyfrowa', featured: false, intro: 'Meta Ads, Google Ads, projektowanie stron WWW i obsługa techniczna. Spójna obecność marki od pierwszej reklamy po kontakt na stronie.', serviceIds: ['digital', 'www'] },
];
