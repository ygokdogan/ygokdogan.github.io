const STRINGS = {
  tr: {
    title: "Portfolyo",
    navAbout: "Hakkımda",
    navGames: "Oyunlar",
    navCode: "Projeler",
    navContact: "İletişim",

    seeGames: "Oyunlarımı oyna",
    hint: "fareyi gezdir, kum dök",
    hintTouch: "ekrana dokun, kum dök",
    clear: "kumu temizle",

    secProfile: "CHARACTER PROFILE",
    secStats: "STATS",
    secArsenal: "TECH ARSENAL",
    secQuests: "CURRENT QUESTS",
    secAch: "ACHIEVEMENTS",
    since: "GitHub'da {y}'ten beri",
    stGames: "oyun",
    stJams: "jam",
    stRepos: "repo",
    stLangs: "dil",
    stStars: "star",
    stFollowers: "follower",
    arsenalHint: "projeleri gör",
    usedIn: "{n} projede kullanıldı",
    allRepos: "tüm repolarda",
    noUse: "Henüz yayında bir projede yok.",
    tGame: "oyun",
    tRepo: "repo",
    tApp: "app",
    close: "Kapat",
    joinedWith: "{g} ile katıldı",

    gamesTitle: "itch.io'daki oyunlarım",
    details: "detay",
    moreGames: "Tüm oyunları detaylı gör",
    lessGames: "Detayları gizle",
    play: "Oyna",
    playBrowser: "Browser'da oyna",
    source: "Source code",
    mJam: "Jam",
    mTeam: "Team",
    mPlat: "Platform",
    mEngine: "Engine",

    codeTitle: "GitHub projelerim",
    featured: "FEATURED PROJECT",
    openSite: "Siteyi aç",
    closed: "closed source",
    all: "Tümü",
    loading: "Yükleniyor…",
    noDesc: "Açıklama yok.",
    repoError: "Projeler şu an yüklenemedi. Hepsi GitHub'da:",

    contactText: "Bir proje, jam takımı ya da sadece merhaba demek için bana ulaşabilirsin.",
    copy: "Adresi kopyala",
    copied: "Kopyalandı",

    unlocked: "ACHIEVEMENT UNLOCKED",
    achSand: ["Kum Sanatçısı", "İlk kum yığınını döktün."],
    achLang: ["Poliglot", "Dili değiştirdin."],
    achClean: ["Temizlikçi", "Bütün emeğini sildin."],
  },

  en: {
    title: "Portfolio",
    navAbout: "About",
    navGames: "Games",
    navCode: "Projects",
    navContact: "Contact",

    seeGames: "Play my games",
    hint: "move your mouse to pour sand",
    hintTouch: "tap the screen to pour sand",
    clear: "clear sand",

    secProfile: "CHARACTER PROFILE",
    secStats: "STATS",
    secArsenal: "TECH ARSENAL",
    secQuests: "CURRENT QUESTS",
    secAch: "ACHIEVEMENTS",
    since: "on GitHub since {y}",
    stGames: "games",
    stJams: "jams",
    stRepos: "repos",
    stLangs: "languages",
    stStars: "stars",
    stFollowers: "followers",
    arsenalHint: "see projects",
    usedIn: "used in {n} projects",
    allRepos: "in every repo",
    noUse: "Not in a published project yet.",
    tGame: "game",
    tRepo: "repo",
    tApp: "app",
    close: "Close",
    joinedWith: "entered with {g}",

    gamesTitle: "Games on itch.io",
    details: "details",
    moreGames: "See all games in detail",
    lessGames: "Hide details",
    play: "Play",
    playBrowser: "Play in browser",
    source: "Source",
    mJam: "Jam",
    mTeam: "Team",
    mPlat: "Platforms",
    mEngine: "Engine",

    codeTitle: "GitHub projects",
    featured: "FEATURED PROJECT",
    openSite: "Open the site",
    closed: "closed source",
    all: "All",
    loading: "Loading…",
    noDesc: "No description.",
    repoError: "Couldn't load projects right now. They're all on GitHub:",

    contactText: "Reach out for a project, a jam team, or just to say hi.",
    copy: "Copy address",
    copied: "Copied",

    unlocked: "ACHIEVEMENT UNLOCKED",
    achSand: ["Sand Artist", "You poured your first sand pile."],
    achLang: ["Polyglot", "You switched the language."],
    achClean: ["Janitor", "You wiped away all your hard work."],
  },
};

let lang = localStorage.getItem("lang") || (navigator.language.startsWith("tr") ? "tr" : "en");

// t("usedIn", { n: 3 }) -> "3 projede kullanıldı"
function t(key, vars = {}) {
  let text = STRINGS[lang][key];
  for (const [name, value] of Object.entries(vars)) text = text.replace(`{${name}}`, value);
  return text;
}

// data.js'te çevrilen alanlar { tr, en } şeklinde, diğerleri düz değer
function loc(value) {
  if (value && typeof value === "object" && !Array.isArray(value)) return value[lang];
  return value;
}
