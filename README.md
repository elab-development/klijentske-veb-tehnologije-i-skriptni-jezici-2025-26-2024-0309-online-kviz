# Quiz Master

<img src="./src/assets/logo.png" width="100px" height="100px" />

Online aplikacija gde korisnici mogu da pretražuju, odgovaraju i ocenjuju različite kvizove, i gde administratori mogu da kreiraju, menjaju i brišu sopstvene kvizove.

## Tehnologije

- React + TypeScript
- Vite
- React Router DOM
- CSS

## Funkcionalnosti

- **Pregled kvizova** — početna stranica sa preporučenim i istaknutim kvizovima, Browse stranica sa pretragom po naslovu/autoru i filterima po kategorijama
- **Dva tipa kviza** — Form kviz (pitanja sa tekstualnim unosom, radio dugmićima ili checkboxovima) i Flashcards kviz (kartice koje se okreću)
- **Tajmer** — opciono vremensko ograničenje prikazano u fiksnom položaju; kviz se automatski predaje kad istekne vreme
- **Rezultati** — prikaz proteklog i preostalog vremena, ocenjivanje kviza zvezdicama
- **Korisnički nalozi** — registracija, prijava, profil, promena lozinke
- **Admin panel** — kreiranje i uređivanje kvizova

## Pokretanje na lokalnoj mašini

### Preduslovi

- [Node.js](https://nodejs.org/) (v18 ili noviji)
- npm

### Koraci

```bash
# 1. Kloniranje repozitorijuma
git clone https://github.com/elab-development/klijentske-veb-tehnologije-i-skriptni-jezici-2025-26-2024-0309-online-kviz.git

# 2. Ulazak u direktorijum
cd quiz-master

# 3. Instalacija zavisnosti
npm install

# 4. Pokretanje razvojnog servera
npm run dev
```

Aplikacija će biti dostupna na `http://localhost:5173`.

## Struktura projekta

```
src/
├── assets/          # Slike i ostali statički resursi
├── components/      # Reusable komponente (Navbar, Footer, QuizCard...)
│   └── questions/   # Komponente za tipove pitanja
├── css/             # CSS fajlovi po stranicama
├── data/            # Placeholder podaci (kvizovi, pitanja)
├── models/          # TypeScript interfejsi (Quiz, Question, Flashcard)
├── pages/           # Stranice aplikacije
│   └── admin/       # Admin panel
└── utils/           # Pomoćne funkcije
```

## Autori

- Nikola Stefanović
- Luka Stefanović