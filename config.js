let iloscPytan = 6;
let przyciski = 4;
let ileMoznaUzycKolaUsunPoprawne = 3;
let wylosowaneLatwe;
let wylosowaneTrudne;
let wybraneLatwePytanie;
let zleOdpowiedzi;
let aktualnePytanie = 0;
let pytanie;
if (aktualnePytanie < wylosowaneLatwe.length) {
  pytanie = losoweLatwe[aktualnePytanie];
} else {
  let idx = aktualnePytanie - wylosowaneLatwe.length;
  pytanie = wylosowaneTrudne[idx];
}
let expert = 0;
let usun = 0;
