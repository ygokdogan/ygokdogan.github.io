const PROFILE = {
  name: "Yusuf Emir Gökdoğan",
  githubUser: "ygokdogan",
  itchUser: "ygokdogan",
  email: "yusufemirgokdogan@gmail.com",
  linkedin: "https://www.linkedin.com/in/ygokdogan/",

  role: {
    tr: "Software & Game Engineer · YTÜ Bilgisayar Mühendisliği",
    en: "Software & Game Engineer · YTU Computer Engineering",
  },
  // Girişte unvanın altındaki tek cümlelik tanım
  tagline: {
    tr: "Unity için modular, developer-friendly tools ve systems geliştiriyorum; arada oyunlar da yapıyorum.",
    en: "I build modular, developer-friendly tools and systems for Unity, and make games along the way.",
  },
  about: {
    tr: [
      "Merhaba, ben Yusuf. Yıldız Teknik Üniversitesi Bilgisayar Mühendisliği öğrencisiyim. Bir şeyler geliştirmekten ve onları çalıştıran mekanizmaları anlamaktan keyif alıyorum.",
      "İlgi alanım ağırlıklı olarak game development üzerine. Özellikle development süreçlerini iyileştiren, tekrar kullanılabilir sistemler ve araçlar tasarlamakla ilgileniyorum. Yalnızca oyun geliştirmeye odaklanmak yerine, arka plandaki problemleri çözmekten, esnek architecture yapıları oluşturmaktan ve diğer developer'ların da faydalanabileceği araçlar geliştirmekten keyif alıyorum.",
      "Unity game jam projelerinde çalıştım, C ile low-level programming üzerine deneyim kazandım ve raylib kullanarak C++ simulations geliştirdim. Her proje bana software design, problem-solving ve sıfırdan bir şeyler inşa etme konusunda farklı bir bakış açısı kazandırdı.",
      "Şu anda odağım, Unity için modular ve developer-friendly tools ve systems geliştirmek. Uzun vadeli hedefim ise bu araçları Unity Asset Store üzerinden yayınlamak.",
    ],
    en: [
      "Hey, I'm Yusuf, a Computer Engineering student at Yıldız Technical University who enjoys building things and understanding what makes them work.",
      "My main interest lies in game development, particularly designing reusable systems and tools that make development workflows better. Rather than focusing solely on making games, I enjoy solving the underlying problems, building flexible architectures, and creating tools that other developers can benefit from.",
      "I've worked on Unity game jam projects, explored low-level programming with C, and experimented with C++ simulations using raylib. Each project has given me a different perspective on software design, problem-solving, and building things from the ground up.",
      "Currently, I'm focused on developing modular, developer-friendly Unity tools and systems, with the goal of publishing them on the Unity Asset Store.",
    ],
  },
  skills: ["C", "C++", "C#", "Unity", "raylib", ".NET Core", "Git"],
  // Tech Arsenal'de gösterilmeyecekler (projelerde kullanılsa da)
  arsenalHide: ["ShaderLab", "Node.js", "Prisma", "Cloudflare R2", "Angular", "Dart"],
};

// itch.io'nun herkese açık bir API'si olmadığı için oyunlar burada listelenir.
// Yeni oyun eklediğinde buraya bir satır ekle.
const ITCH_GAMES = [
  {
    title: "Ben Green & 960 Dwarves",
    url: "https://ygokdogan.itch.io/benjamin-green-and-960-dwarves",
    cover: "https://img.itch.zone/aW1nLzI5NjM4Mzg0LnBuZw==/315x250%23c/Grwa%2FV.png",
    genre: { tr: "Strategy · Survival", en: "Strategy · Survival" },
    desc: {
      tr: "Tatil haftan bir kuşatmaya dönüştü: mahalleni 960 tuhaf cüce bastı. Savaşmaya değil, kapını çalıp şüpheli teklifler satmaya geldiler. Yedi gün boyunca dört temel stat'ını dengede tutmaya çalış.",
      en: "Your week off has turned into a siege: 960 bizarre dwarves have invaded your neighborhood. They're not here to fight but to ring your doorbell with suspicious deals. Keep your four core stats in balance for seven days.",
    },
    features: {
      tr: ["Her saat random bir merchant ve absürt bir teklif: kabul et ya da reddet", "Bazı cüceler dürüst, bazıları sakalının arkasından yalan söylüyor", "Sonuçlar bazen hemen, bazen en olmadık anda geliyor"],
      en: ["Every hour brings a random merchant and an absurd offer: accept or decline", "Some dwarves are honest, others lie through their beards", "Consequences hit right away, or later when it's least convenient"],
    },
    jam: "Brackeys Game Jam 2026.2",
    team: ["ygokdogan", "zyciesama", "CoSix"],
    platforms: ["HTML5", "macOS"],
    engine: "Unity",
    browser: true,
    tags: ["Pixel Art", "Comedy", "Management"],
    repo: "BenGreenAndDwarves",
    shots: ["assets/games/dwarves/1.jpg", "assets/games/dwarves/2.jpg", "assets/games/dwarves/3.jpg"],
  },
  {
    title: "Gunstable",
    url: "https://ygokdogan.itch.io/gunstable",
    cover: "https://img.itch.zone/aW1nLzIzNjgyMDA0LnBuZw==/315x250%23c/53yhP1.png",
    genre: { tr: "Action · Platformer · Shooter", en: "Action · Platformer · Shooter" },
    desc: {
      tr: "Dengenin sadece bir illüzyon olduğu kaotik bir side-scroller platformer. Silahın dört dengesiz fire mode arasında random geçiş yapıyor; beş handcrafted level'da ilerledikçe açılan jetpack de aynı derecede güvenilmez.",
      en: "A chaotic side-scrolling platformer where stability is just an illusion. Your gun randomly switches between four unstable firing modes, and the jetpack you unlock across five handcrafted levels is just as unreliable.",
    },
    features: {
      tr: ["Normal shot, heavy recoil, spread shot ve jam: silah ne yapacağına kendi karar veriyor", "Jetpack her saniye zar atıyor; 1 gelirse havada kapanıyor", "5 handcrafted level"],
      en: ["Normal shot, heavy recoil, spread and jam: the gun decides for itself", "The jetpack rolls a die every second; roll a 1 and it shuts down mid-air", "5 handcrafted levels"],
    },
    jam: "Jamination 8",
    year: 2025,
    team: ["ygokdogan", "zyciesama"],
    platforms: ["Windows", "macOS"],
    engine: "Unity",
    tags: ["Pixel Art", "Side Scroller"],
    repo: "Gunstable",
    shots: ["assets/games/gunstable/1.jpg", "assets/games/gunstable/2.jpg", "assets/games/gunstable/3.jpg"],
  },
  {
    title: "Overdrive",
    url: "https://ygokdogan.itch.io/overdrive",
    cover: "https://img.itch.zone/aW1nLzIyMjQ1NjA4LnBuZw==/315x250%23c/LZYgLU.png",
    genre: { tr: "Action · Platformer", en: "Action · Platformer" },
    desc: {
      tr: "Celeste'in platforming mekaniklerinden ilham alan, hızlı tempolu bir 2D action-platformer. Her odayı enemy'lerden temizle; overdrive bar'ın biterse bütün level baştan başlar.",
      en: "A fast-paced 2D action-platformer inspired by Celeste's platforming. Clear every room of enemies; if your overdrive meter runs out, the whole level resets.",
    },
    features: {
      tr: ["Dash, pogo ve slash kombinasyonları", "Enemy'ye vurmak overdrive bar'ını %15, öldürmek tamamen dolduruyor", "Minimalist silhouette pixel art ve glitch'li UI"],
      en: ["Dash, pogo and slash your way through", "Hitting an enemy refills overdrive by 15%, a kill refills it completely", "Minimalist silhouette pixel art with a glitchy UI"],
    },
    jam: "Shovel Jam 2025",
    team: ["ygokdogan", "CoSix", "arduhzonyo"],
    platforms: ["Windows"],
    engine: "Unity",
    tags: ["Pixel Art", "Arcade", "Minimalist"],
    shots: ["assets/games/overdrive/1.jpg", "assets/games/overdrive/2.jpg", "assets/games/overdrive/3.jpg"],
  },
  {
    title: "Duelborn",
    url: "https://ygokdogan.itch.io/duelborn",
    cover: "https://img.itch.zone/aW1nLzIxMTQ4MDA3LnBuZw==/315x250%23c/1PmH1F.png",
    genre: { tr: "Action · Shooter · 2-player", en: "Action · Shooter · 2 players" },
    desc: {
      tr: "Co-op'un bir yalan olduğu, top-down pixel art bir survival brawler. İki oyuncu enemy wave'lerine karşı birlikte başlar, ama sadece biri hayatta kalabilir.",
      en: "A top-down pixel art survival brawler where cooperation is a lie. Two players face waves of enemies together, but only one can survive.",
    },
    features: {
      tr: ["Aynı bilgisayarda hızlı tempolu local 2-player kaos", "Wave survival ve PvP sabotaj bir arada", "Trap, knockback ve friendly fire ile rakibini ele"],
      en: ["Fast-paced local 2-player mayhem", "Enemy wave survival meets PvP sabotage", "Use traps, knockback and friendly fire to eliminate your rival"],
    },
    team: ["ygokdogan"],
    platforms: ["Windows"],
    engine: "Unity",
    tags: ["Pixel Art", "Top-Down", "Two Player"],
    shots: ["assets/games/duelborn/1.jpg", "assets/games/duelborn/2.jpg", "assets/games/duelborn/3.jpg"],
  },
];

const HIDDEN_REPOS = ["CarRentalProject"];
// Sıralama: önce bu listedekiler (bu sırayla), sonra diğerleri (en yeni üstte),
// en altta da LAST_LANGUAGES dilindeki projeler.
const REPO_ORDER = ["particle-lab", "Gunstable", "BenGreenAndDwarves"];
const LAST_LANGUAGES = ["C"];

// GitHub'da private olan ama göstermek istediğin projeler.
// Kodu açılmaz; sitede "kapalı kaynak" etiketiyle görünür.
// url: projenin canlı sitesi (boş bırakırsan link verilmez).
const PRIVATE_PROJECTS = [
  {
    name: "CaughtUp",
    url: "https://caughtup.ygokdogan.dev",
    language: "TypeScript",
    desc: {
      tr: "Dizileri tek başına ya da arkadaşlarınla birlikte takip et: episode bazlı, spoiler-free rating'ler ve yorumlar. React + TypeScript frontend, .NET API, PostgreSQL.",
      en: "Track shows solo or with friends: per-episode, spoiler-aware ratings and comments. React + TypeScript frontend, .NET API, PostgreSQL.",
    },
    pushed_at: "2026-11-24",
    // Aşağıdakiler varsa proje, Projeler bölümünün en üstünde vitrin olarak gösterilir.
    stack: ["React", "TypeScript", ".NET", "PostgreSQL", "Docker"],
    features: {
      tr: ["Arkadaş grubunla aynı diziyi takip et, kimin nerede kaldığını gör", "Episode'ları Trash'ten Peak'e kadar rate et", "İzlemediğin episode'un rating ve yorumları kilitli kalır, spoiler yemezsin"],
      en: ["Follow a show with your group and see where everyone is", "Rate episodes from Trash to Peak", "Ratings and comments stay locked until you've watched, so no spoilers"],
    },
    shots: [
      { src: "assets/caughtup/1-up-next.jpg", caption: { tr: "Up next", en: "Up next" } },
      { src: "assets/caughtup/2-show.jpg", caption: { tr: "Show page", en: "Show page" } },
      { src: "assets/caughtup/3-rating.jpg", caption: { tr: "Episode rating", en: "Episode ratings" } },
    ],
  },
  {
    name: "Ourline",
    url: "https://ourline.ygokdogan.dev",
    status: { tr: "iOS & Android · yakında", en: "iOS & Android · coming soon" },
    language: "Dart",
    desc: {
      tr: "Çiftler için private bir günlük: gün boyunca belirli time window'larda birer fotoğraf paylaşıp birlikte ortak bir timeline oluşturuyorsunuz. Flutter mobile app, Node.js + TypeScript API.",
      en: "A private journal for couples: share one photo in each time window of the day and build a shared timeline together. Flutter mobile app, Node.js + TypeScript API.",
    },
    pushed_at: "2026-11-24",
    stack: ["Flutter", "Dart", "Node.js", "TypeScript", "Prisma", "PostgreSQL", "Docker", "Cloudflare R2"],
    features: {
      tr: ["Gün, ayarlanabilir time window'lara bölünür; her window'da ikiniz de bir moment paylaşırsınız", "Invite code ile eşleşme, ortak cover fotoğrafı ve partnere özel nickname", "Fotoğraflar signed URL'lerle doğrudan cloud storage'a upload edilir"],
      en: ["The day is split into configurable windows; each of you shares one moment per window", "Pair with an invite code, set a shared cover and a private nickname for your partner", "Photos upload straight to cloud storage through signed URLs"],
    },
    shots: [
      { src: "assets/ourline/1-today.jpg", caption: { tr: "Today", en: "Today" } },
      { src: "assets/ourline/2-journey.jpg", caption: { tr: "Today's journey", en: "Today's journey" } },
      { src: "assets/ourline/3-us.jpg", caption: { tr: "Shared space", en: "Shared space" } },
    ],
  },
];

// ---------------------------------------------------------------
// AKTİF GÖREVLER: şu anda geliştirdiğin Unity sistemleri / araçları.
// Liste boşken bölüm sitede görünmez. Örnek:
// {
//   title: "Modüler Envanter Sistemi",
//   desc: { tr: "…", en: "…" },
//   status: { tr: "Asset Store için hazırlanıyor", en: "Preparing for the Asset Store" },
//   progress: 60,                 // 0–100
//   tags: ["Unity", "C#", "Editor Tools"],
//   url: "",                      // varsa repo / store linki
// },
const QUESTS = [
  {
    title: "GOAP System",
    desc: {
      tr: "Unity için modular bir Goal-Oriented Action Planning (GOAP) system: AI agent'lar, goal'lerine ulaşmak için hangi action'ları hangi sırayla yapacaklarını kendileri planlar.",
      en: "A modular Goal-Oriented Action Planning (GOAP) system for Unity: AI agents plan for themselves which actions to take, and in what order, to reach their goals.",
    },
    status: { tr: "geliştiriliyor", en: "in development" },
    tags: ["Unity", "C#", "AI"],
  },
  {
    title: "GOAP Visualizer",
    desc: {
      tr: "GOAP agent'larının goal, plan ve action chain'lerini Unity Editor'de görselleştiren bir tool; bir agent'ın neden o kararı verdiğini görmeyi kolaylaştırır.",
      en: "A Unity editor tool that visualizes GOAP agents' goals, plans and action chains, making it easy to see why an agent made a decision.",
    },
    status: { tr: "geliştiriliyor", en: "in development" },
    tags: ["Unity", "Editor Tools", "Debugging"],
  },
];

// BAŞARIMLAR: game jam'ler oyunlardan (ITCH_GAMES.jam) otomatik gelir.
// Etkinlik, ödül, staj gibi diğerlerini buraya ekle. Örnek:
// { title: { tr: "…", en: "…" }, desc: { tr: "…", en: "…" }, year: 2026, url: "" },
const ACHIEVEMENTS = [
  {
    title: { tr: "YILDIZ JAM 2026 · Koordinatör", en: "YILDIZ JAM 2026 · Coordinator" },
    desc: {
      tr: "SKY LAB'in 4.'sünü düzenlediği YILDIZ JAM'in koordinatörlüğünü yürüttüm: yaklaşık 4 ay süren hazırlıkla bir game industry zirvesi ve bir game jam.",
      en: "Coordinated the 4th YILDIZ JAM by SKY LAB: about four months of preparation for a game industry summit and a game development competition.",
    },
    year: 2026,
    icon: "flag",
    url: "https://www.linkedin.com/in/ygokdogan/recent-activity/all/",
  },
];
