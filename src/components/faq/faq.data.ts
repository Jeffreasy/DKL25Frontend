interface FAQItem {
  question: string;
  answer: string;
  icon: string;
  action?: boolean;
  actionText?: string;
}

interface FAQCategory {
  title: string;
  icon: string;
  questions: FAQItem[];
}

export const faqData: FAQCategory[] = [
  {
    title: "Over het evenement",
    icon: "❗",
    questions: [
      {
        question: "Wat maakt De Koninklijke Loop zo bijzonder?",
        answer: "De Koninklijke Loop is een sponsorloop mede georganiseerd door mensen met een beperking voor mensen met een beperking. We lopen de route over de Koninklijke weg, een rolstoelvriendelijke wandelroute.",
        icon: "🏃"
      },
      {
        question: "Waar vindt de Koninklijke Loop plaats?",
        answer: "De Koninklijke Loop vindt plaats op de Koninklijke Weg, een rolstoelvriendelijke route. We lopen verschillende afstanden tussen Assel en Paleis het Loo, Apeldoorn. De deelnemers worden vanaf de Grote Kerk in Apeldoorn naar de startpunten van de verschillende afstanden gebracht. Vanuit hier wandelen de deelnemers naar de finish, de Grote Kerk, waar de feestelijke inhuldiging plaatsvindt.",
        icon: "📍"
      },
      {
        question: "Wanneer vindt de Koninklijke Loop 2025 plaats?",
        answer: "De Koninklijke Loop vindt op zaterdag 17 mei 2025 plaats.",
        icon: "📅"
      },
      {
        question: "Kun je winnen bij de Koninklijke Loop?",
        answer: "De Koninklijke Loop is geen wedstrijd. Wel krijgt iedereen die de finish haalt een mooie medaille. Dus ook al is het geen wedstrijd, bij de Koninklijke Loop is iedereen een winnaar.",
        icon: "🏆"
      }
    ]
  },
  {
    title: "Deelname",
    icon: "🏅",
    questions: [
      {
        question: "Hoe kan ik meedoen?",
        answer: "Super dat je mee wilt doen! Inschrijven kan via de inschrijvingspagina vanaf 15 januari 2025. Als je voor deze datum het formulier invult, krijg je tzt een seintje wanneer de inschrijving echt begint.",
        icon: "✍",
        action: true,
        actionText: "Schrijf je nu in"
      },
      {
        question: "Moet je betalen om mee te doen met DKL 25?",
        answer: "Deelname aan de loop is helemaal gratis. Wel moet je jezelf van tevoren opgeven.",
        icon: "💸"
      },
      {
        question: "Wat als je hulp of begeleiding nodig hebt tijdens de loop?",
        answer: "Een begeleider of iemand die je helpt, kan zich ook via het formulier opgeven. Heb je niemand die je kan begeleiden of helpen en heb je dit wel nodig, geef dit even aan bij de bijzonderheden, dan kijken we of we je vanuit de organisatie kunnen helpen.",
        icon: "🤖"
      },
      {
        question: "Hoeveel mensen kunnen er maximaal meelopen tijdens DKL 25?",
        answer: "Er kunnen maximaal 75 mensen meedoen met de Koninklijke Loop. Zorg dus dat je op tijd inschrijft!",
        icon: "💡"
      },
      {
        question: "Wanneer sluit de inschrijving?",
        answer: "Je kunt je inschrijven t/m 7 mei 2025. Let wel op: er kunnen maximaal 75 wandelaars deelnemen, mochten er eerder dan 7 mei 2025 al 75 deelnemers zijn, dan sluit de inschrijving eerder.",
        icon: "⚠"
      },
      {
        question: "Oeps, ik kan toch niet meedoen. Wat nu?",
        answer: "Wat vervelend, maar je kunt je altijd afmelden via de contactgegevens van de organisatie. Deze heb je gekregen bij je aanmelding. Of je kunt het contactformulier op deze site gebruiken. Voor de afmelding worden verder geen kosten in rekening gebracht.",
        icon: "😢"
      }
    ]
  },
  {
    title: "Looproutes",
    icon: "🗺",
    questions: [
      {
        question: "Welke afstanden kan ik kiezen?",
        answer: "Je kunt kiezen uit de 15, 10, 6 of 2,5 km.",
        icon: "🚩"
      },
      {
        question: "Is de 2,5 km iets voor mij?",
        answer: "Tijdens de 2,5 km afstand lopen we vanaf Berg en Bos in Apeldoorn door de groene buitenwijken rond Paleis het Loo naar de finish. Hier wandel je over vlak terrein en deze afstand is geschikt voor de onervaren wandelaar.",
        icon: "🌱"
      },
      {
        question: "Hoe pittig is de 6 km?",
        answer: "In Hoog Soeren start de loop van de 6 kilometer. Hier ga je over heuvelachtig landschap, deze afstand is geschikt voor de licht getrainde wandelaar.",
        icon: "⛰"
      },
      {
        question: "Ben ik klaar voor de 10 km?",
        answer: "Bij halte Assel is het beginpunt van de 10 kilometerloop. Over de prachtige Asselse hei lopen we dan verder naar Hoog Soeren en Apeldoorn. Voor de 10 km moet je een redelijk goed getrainde wandelaar zijn en ga je door heuvelachtig gebied.",
        icon: "🌄"
      },
      {
        question: "Wie durft de 15 km aan?",
        answer: "Bij het oude kerkje in het hartje Kootwijk start de 15 km van de Koninklijk Loop. De 15 km is geschikt voor getrainde lopers, want je gaat over heuvelachtig terrein lopen.",
        icon: "🏃🏻‍♂️"
      }
    ]
  },
  {
    title: "Ondersteuning",
    icon: "⚡",
    questions: [
      {
        question: "Zijn er plekken om even op adem te komen?",
        answer: "Er zijn diverse punten onderweg waar je even kunt zitten en uitrusten, hier wordt drinken uitgedeeld. Voordat je start, krijg je ook een pakketje met drinken en wat snacks mee. Dus als je moe bent, kun je ook tussen de rustpunten door even stoppen.",
        icon: "☕"
      },
      {
        question: "Is er hulp tijdens de loop?",
        answer: "Heb je een persoonlijke begeleider of hulp nodig, dan kan hij of zij zich ook inschrijven voor de loop. Tijdens de loop lopen er ook verschillende vrijwilligers mee om de loop in zijn geheel te begeleiden. Zij hebben bijvoorbeeld een EHBO-kit bij zich en kunnen medische hulp verlenen.",
        icon: "🪑"
      },
      {
        question: "Kan ik zelf vrijwilliger worden?",
        answer: "Alle hulp is welkom! Neem contact op via het contactformulier, we horen graag van je!",
        icon: "🦾"
      }
    ]
  },
  {
    title: "Goede doel & sponsoring",
    icon: "💰",
    questions: [
      {
        question: "Hoe kan ik doneren?",
        answer: "Doneren kan vanaf het moment dat de inschrijving geopend is. De inzameling verloopt via GoFundMe en alle giften komen, op de administratieve kosten van GoFundMe na, volledig ten goede van het goede doel.",
        icon: "💳"
      },
      {
        question: "Welk goed doel steunen we dit jaar?",
        answer: "Dit jaar is het goede doel wederom het Liliane Fonds. Het Liliane Fonds ondersteunt wereldwijd kinderen met een beperking en helpt hen door hun leefsituatie te verbeteren.",
        icon: "❤️"
      },
      {
        question: "Wil je ons als bedrijf of organisatie sponsoren?",
        answer: "Bedrijven of organisaties zijn natuurlijk van harte welkom om de Koninklijke Loop of het goede doel te sponsoren. We horen graag van je via ons contactformulier.",
        icon: "👨‍💼"
      }
    ]
  },
  {
    title: "Contact",
    icon: "📞",
    questions: [
      {
        question: "Hoe kan ik contact opnemen?",
        answer: "Je kunt direct contact met ons opnemen via het contactformulier. We reageren zo snel mogelijk op je bericht.",
        icon: "✉️",
        action: true,
        actionText: "Open contactformulier"
      }
    ]
  }
]; 