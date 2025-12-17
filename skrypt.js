document.getElementById("btnPodpowiedz").style.display = "none";
document.getElementById("btnUsunZla").style.display = "none";

// Klasa Pytanie – przechowuje treść pytania, odpowiedzi i informację o poprawnej odpowiedzi
class Pytanie {
  constructor(tresc, odpowiedzi, poprawna) {
    this._tresc = tresc;
    this._odpowiedzi = odpowiedzi; // tablica odpowiedzi
    this._poprawna = poprawna; // indeks poprawnej odpowiedzi
    this._czyUdzielonoPoprawna = false;
  }

  get tresc() {
    return this._tresc;
  }
  get odpowiedzi() {
    return this._odpowiedzi;
  }
  get poprawna() {
    return this._poprawna;
  }
  get czyUdzielonoPoprawna() {
    return this._czyUdzielonoPoprawna;
  }

  set tresc(v) {
    this._tresc = v;
  }
  set odpowiedzi(v) {
    this._odpowiedzi = v;
  }
  set poprawna(v) {
    this._poprawna = v;
  }
  set czyUdzielonoPoprawna(v) {
    this._czyUdzielonoPoprawna = v;
  }
}

//funckja losująca pytania
function LosujPytanie() {
  wylosowaneLatwe = [];
  wylosowaneTrudne = [];
  wszystkiePytania = [];

  let kopiaLatwe = [...latwePytania]; //kopia tablic z pytaniami
  let kopiaTrudne = [...trudnePytania];

  // Losowanie 6 pytań z każdej kategorii
  for (let i = 0; i < iloscPytan; i++) {
    let indeksLatwe = Math.floor(Math.random() * kopiaLatwe.length); // wybieramy losowy indeks z kopii łatwych pytań
    let losoweLatwe = kopiaLatwe[indeksLatwe];
    wylosowaneLatwe.push(losoweLatwe);
    wszystkiePytania.push(losoweLatwe);
    kopiaLatwe.splice(indeksLatwe, 1);
    // wybieramy losowy indeks z kopii łatwych pytań

    let indeksTrudne = Math.floor(Math.random() * kopiaTrudne.length);
    let losoweTrudne = kopiaTrudne[indeksTrudne];
    wylosowaneTrudne.push(losoweTrudne);
    wszystkiePytania.push(losoweTrudne);
    kopiaTrudne.splice(indeksTrudne, 1);
  }
}

// Funkcja przechodząca do następnego pytania
function WyswietlLatwePytania(i) {
  wybraneLatwePytanie = wylosowaneLatwe[i]; // pobieramy pytanie
  document.getElementById("test").textContent = wybraneLatwePytanie.tresc;
  pytanie = wybraneLatwePytanie;
  // Aktualizacja przycisków
  wybraneLatwePytanie.odpowiedzi.forEach((odp, idx) => {
    document.getElementById("btn" + (idx + 1)).textContent = odp;
  });
}
function WyswietlCiezkiePytania(i) {
  wybraneCiezkiePytanie = wylosowaneTrudne[i]; // pobieramy pytanie
  document.getElementById("test").textContent = wybraneCiezkiePytanie.tresc;
  pytanie = wybraneCiezkiePytanie;
  // Aktualizacja przycisków
  wybraneCiezkiePytanie.odpowiedzi.forEach((odp, idx) => {
    document.getElementById("btn" + (idx + 1)).textContent = odp;
  });
}

function NastepnePytanie() {
  aktualnePytanie++;
  PrzywrocPrzyciski();

  //Wciąż jesteśmy w pytaniach łatwych
  if (aktualnePytanie < wylosowaneLatwe.length) {
    WyswietlLatwePytania(aktualnePytanie);
    return;
  }
  //Przechodzimy do trudnych
  let indeksCiezkie = aktualnePytanie - wylosowaneLatwe.length;

  if (indeksCiezkie < wylosowaneTrudne.length) {
    WyswietlCiezkiePytania(indeksCiezkie);
  } else {
    //Koniec gry
    LiczPkt();
  }
}

//funkcja generujaca przyciski
function GenerujPrzyciskiOdp() {
  const kontener = document.getElementById("kontener");
  kontener.innerHTML = "";

  //generujemy tyle przyciskow ile chcemy podajac odpowiednia wartosc w zmienna przyciski
  for (let i = 1; i < przyciski + 1; i++) {
    const btn = document.createElement("button");

    btn.id = "btn" + i;
    btn.onclick = () => {
      const poprawna = SprawdzOdp(btn.textContent);
      if (poprawna) {
        NastepnePytanie(); //jesli odpowiedz jest poprawna wywolujemy funkcje nastepne pytanie
        PodsiwetlAktualnePytanie(aktualnePytanie);
        btn.style.background =
          "linear-gradient(180deg, var(--blue), var(--blue2))"; //jesli uzyto podpowiedxzi experta nastepny przycisk wraca do podstawowego wygladu
        btn.style.color = "white";
        btn.style.fontWeight = "700";
        btn.style.border = " 3px solid var(--gold2)";
        btn.style.boxShadow = "0 0 10px rgba(255, 207, 51, 0.3)";
      }
    };
    kontener.appendChild(btn); //dodajemy przyciski na strone
  }
}

function GenerujLicznikPytan() {
  const listaPytan = document.getElementById("licznikPytan");
  listaPytan.innerHTML = "";
  for (let i = 0; i < iloscPytan * 2; i++) {
    const lista = document.createElement("li");
    lista.textContent = "Pytanie";
    listaPytan.appendChild(lista);
  }
}
function PodsiwetlAktualnePytanie(numer) {
  const lista = document.querySelectorAll("#licznikPytan li");
  lista.forEach((li) => li.classList.remove("active"));

  if (lista[numer]) {
    lista[numer].classList.add("active");
  }
}
//funkcja sprawdzajaca odp uzytkownika
function SprawdzOdp(odpUzytkownika) {
  if (pytanie.poprawna.toLowerCase() == odpUzytkownika.toLowerCase()) {
    //jesli odpowiedz jest poprawna ustawiamy na true jesli nie na false
    pytanie.czyUdzielonoPoprawna = true;
  } else {
    pytanie.czyUdzielonoPoprawna = false;
    document.getElementById("test").textContent = "koniec gry!"; //jesli udzielono zlej odpowiedzi konczy gre i daje komunikat koniec gry

     // ---- UKRYWANIE WSZYSTKICH PRZYCISKÓW ODPOWIEDZI ----
    for (let i = 1; i <= przyciski; i++) {
      const btn = document.getElementById("btn" + i);
      if (btn) btn.style.display = "none";
    }

    // Opcjonalnie ukryj też koła ratunkowe:
    document.getElementById("btnPodpowiedz").style.display = "none";
    document.getElementById("btnUsunZla").style.display = "none";


    return false;
  }
  return true;
}
function PrzywrocPrzyciski() {
  for (let i = 1; i <= przyciski; i++) {
    const btn = document.getElementById("btn" + i);
    if (btn) {
      btn.style.display = "block";
    }
  }
}
//funkcja liczaca punkty
function LiczPkt() {
  let punkty = 0;

  for (let i = 0; i < wszystkiePytania.length; i++) {
    //przechodzimy po wszystkich pytaniach
    if (wszystkiePytania[i].czyUdzielonoPoprawna == true) {
      //jezeli jest dobra odpowidz dodajemy punkty
      punkty++;
    }

    document.getElementById("test").textContent = punkty; //wyswietlamy punkty na koniec gry
  }
}
function podpowiedzEksperta() {
  const poprawna = pytanie.poprawna.toLowerCase();

  for (let i = 1; i <= przyciski; i++) {
    //przechodzi sie po wszystkich przyciskach w petli
    const btn = document.getElementById("btn" + i);
    if (!btn) continue; //sprawdz czy przycisk istnieje

    if (btn.textContent.toLowerCase() === poprawna) {
      //jesli przycsik przechowywuje poprawna odpowiedz zmienia sie jego styl
      btn.style.background = "green";
      btn.style.color = "white";
      btn.style.fontWeight = "900";
      btn.style.border = "2px solid #fff";
      btn.style.boxShadow = "0 0 15px rgba(0,255,0,0.7)";
    }
  }
  const btnExpert = document.getElementById("btnPodpowiedz"); //wylacza sie przycisk kola ratunkowego
  btnExpert.style.background = "linear-gradient(180deg, #1c5275ff, #4d5f6b)";
  btnExpert.style.boxShadow = "none";
  btnExpert.style.color = "white";
  btnExpert.disabled = true;
  expert = 1;
}
function UsunZla() {
  ileMoznaUzycKolaUsunPoprawne--;
  const poprawna = pytanie.poprawna.toLowerCase();
  zleOdpowiedzi = [];

  for (let i = 1; i <= przyciski; i++) {
    const btn = document.getElementById("btn" + i);
    if (!btn) continue;

    // dodaj TYLKO widoczne złe odpowiedzi
    if (
      btn.textContent.toLowerCase() != poprawna &&
      btn.style.display !== "none"
    ) {
      zleOdpowiedzi.push(btn);
    }
  }

  // jeśli nie ma już czego usuwać – zakończ
  if (zleOdpowiedzi.length === 0) return;

  let losowa = Math.floor(Math.random() * zleOdpowiedzi.length);
  let doUsuniecia = zleOdpowiedzi[losowa];
  doUsuniecia.style.display = "none";

  if (ileMoznaUzycKolaUsunPoprawne == 0) {
    const btnUsunZle = document.getElementById("btnUsunZla");
    btnUsunZle.style.background = "linear-gradient(180deg, #1c5275ff, #4d5f6b)";
    btnUsunZle.style.boxShadow = "none";
    btnUsunZle.style.color = "white";
    btnUsunZle.disabled = true;
    usun = 1;
  }
}

function StartGry() {
  aktualnePytanie = 0;
  GenerujPrzyciskiOdp();
  GenerujLicznikPytan();
  LosujPytanie();
  PodsiwetlAktualnePytanie(0);
  WyswietlLatwePytania(0);
  btnStart = document.getElementById("btnStart");
  btnStart.style.display = "none";
  document.getElementById("btnPodpowiedz").style.display = "block";
  document.getElementById("test").style.display = "block";
  document.getElementById("btnUsunZla").style.display = "block";
}




//autor:Milosz Dawiec
