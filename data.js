// ============================================================
//  Portfolyonu buradan düzenle — Edit your portfolio here.
//  Sitenin geri kalanına dokunmana gerek yok.
// ============================================================

const PROFILE = {
  name: "Yusuf Emir Gökdoğan",
  githubUser: "ygokdogan",
  itchUser: "ygokdogan",
  email: "yusufemirgokdogan@gmail.com",
  linkedin: "https://www.linkedin.com/in/ygokdogan/",

  role: {
    tr: "Yazılım & Oyun Mühendisi · YTÜ Bilgisayar Mühendisliği",
    en: "Software & Game Engineer · YTU Computer Engineering",
  },
  // Girişte unvanın altındaki tek cümlelik tanım
  tagline: {
    tr: "Unity için modüler, geliştirici dostu araçlar ve sistemler geliştiriyorum; arada oyunlar da yapıyorum.",
    en: "I build modular, developer-friendly tools and systems for Unity, and make games along the way.",
  },
  about: {
    tr: [
      "Selam, ben Yusuf. Yıldız Teknik Üniversitesi Bilgisayar Mühendisliği öğrencisiyim. Bir şeyler üretmeyi ve nasıl çalıştıklarını keşfetmeyi seviyorum.",
      "En çok ilgilendiğim alan oyun geliştirme. Özellikle oyun geliştirme sürecini kolaylaştıran, tekrar kullanılabilir sistemler ve araçlar tasarlamaktan keyif alıyorum. Sadece oyun ortaya çıkarmakla değil, geliştirme sürecinin arkasındaki problemleri çözmek, esnek mimariler oluşturmak ve diğer geliştiricilerin de kullanabileceği araçlar üretmekle ilgileniyorum.",
      "Unity ile game jam projelerinde yer aldım, C ile düşük seviyeli programlamayı keşfettim ve C++ ile raylib kullanarak simülasyonlar geliştirdim. Her proje yazılım tasarımı, problem çözme ve sıfırdan bir şeyler inşa etme konusunda bana farklı deneyimler kazandırdı.",
      "Şu anda odağım, Unity için modüler ve geliştirici dostu araçlar ve sistemler geliştirmek. Uzun vadeli hedefim ise bunları Unity Asset Store üzerinden diğer geliştiricilerle buluşturmak.",
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
    genre: { tr: "Strateji · Hayatta kalma", en: "Strategy · Survival" },
    desc: {
      tr: "Tatil haftan bir kuşatmaya dönüştü: mahalleni 960 tuhaf cüce bastı. Savaşmaya değil, kapını çalıp şüpheli teklifler satmaya geldiler. Yedi gün boyunca dört temel istatistiğini dengede tutmaya çalış.",
      en: "Your week off has turned into a siege: 960 bizarre dwarves have invaded your neighborhood. They're not here to fight but to ring your doorbell with suspicious deals. Keep your four core stats in balance for seven days.",
    },
    features: {
      tr: ["Her saat rastgele bir tüccar ve absürt bir teklif: kabul et ya da reddet", "Bazı cüceler dürüst, bazıları sakalının arkasından yalan söylüyor", "Sonuçlar bazen hemen, bazen en olmadık anda geliyor"],
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
    genre: { tr: "Aksiyon · Platform · Nişancı", en: "Action · Platformer · Shooter" },
    desc: {
      tr: "Dengenin sadece bir yanılsama olduğu kaotik bir yandan kaydırmalı platform oyunu. Silahın dört dengesiz atış modu arasında rastgele geçiş yapıyor; beş el yapımı bölümde ilerledikçe açılan jetpack de aynı derecede güvenilmez.",
      en: "A chaotic side-scrolling platformer where stability is just an illusion. Your gun randomly switches between four unstable firing modes, and the jetpack you unlock across five handcrafted levels is just as unreliable.",
    },
    features: {
      tr: ["Normal atış, ağır geri tepme, saçma ve tutukluk: silah ne yapacağına kendi karar veriyor", "Jetpack her saniye zar atıyor; 1 gelirse havada kapanıyor", "5 el yapımı bölüm"],
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
    genre: { tr: "Aksiyon · Platform", en: "Action · Platformer" },
    desc: {
      tr: "Celeste'in platform mekaniklerinden ilham alan, hızlı tempolu bir 2D aksiyon-platform oyunu. Her odayı düşmanlardan temizle; overdrive barın biterse bütün bölüm baştan başlar.",
      en: "A fast-paced 2D action-platformer inspired by Celeste's platforming. Clear every room of enemies; if your overdrive meter runs out, the whole level resets.",
    },
    features: {
      tr: ["Atıl, sıçra ve kes: dash, pogo ve kılıç kombinasyonları", "Düşmana vurmak overdrive barını %15, öldürmek tamamen dolduruyor", "Minimalist siluet piksel sanatı ve glitch'li arayüz"],
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
    genre: { tr: "Aksiyon · Nişancı · 2 oyunculu", en: "Action · Shooter · 2 players" },
    desc: {
      tr: "İşbirliğinin bir yalan olduğu, yukarıdan bakışlı piksel art bir hayatta kalma dövüş oyunu. İki oyuncu düşman dalgalarına karşı birlikte başlar, ama sadece biri hayatta kalabilir.",
      en: "A top-down pixel art survival brawler where cooperation is a lie. Two players face waves of enemies together, but only one can survive.",
    },
    features: {
      tr: ["Aynı bilgisayarda hızlı tempolu 2 oyunculu kaos", "Düşman dalgaları ve oyuncuya karşı sabotaj bir arada", "Tuzak, geri itme ve dost ateşiyle rakibini ele"],
      en: ["Fast-paced local 2-player mayhem", "Enemy wave survival meets PvP sabotage", "Use traps, knockback and friendly fire to eliminate your rival"],
    },
    team: ["ygokdogan"],
    platforms: ["Windows"],
    engine: "Unity",
    tags: ["Pixel Art", "Top-Down", "Two Player"],
    shots: ["assets/games/duelborn/1.jpg", "assets/games/duelborn/2.jpg", "assets/games/duelborn/3.jpg"],
  },
];

// GitHub repoları sayfa açılırken otomatik çekilir.
// Gizlemek istediğin repoları buraya yaz:
const HIDDEN_REPOS = ["CarRentalProject"];
// Öne çıkarmak (en başta göstermek) istediklerin:
const PINNED_REPOS = ["particle-lab", "ProjectTDS", "panel-de-pon"];
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
      tr: "Dizileri tek başına ya da arkadaşlarınla birlikte takip et: bölüm bazlı, spoiler korumalı puanlar ve yorumlar. React + TypeScript arayüz, .NET API, PostgreSQL.",
      en: "Track shows solo or with friends: per-episode, spoiler-aware ratings and comments. React + TypeScript frontend, .NET API, PostgreSQL.",
    },
    pushed_at: "2026-11-24",
    // Aşağıdakiler varsa proje, Projeler bölümünün en üstünde vitrin olarak gösterilir.
    stack: ["React", "TypeScript", ".NET", "PostgreSQL", "Docker"],
    features: {
      tr: ["Arkadaş grubunla aynı diziyi takip et, kimin nerede kaldığını gör", "Bölümleri Trash'ten Peak'e puanla", "İzlemediğin bölümün puanları ve yorumları kilitli kalır, spoiler yemezsin"],
      en: ["Follow a show with your group and see where everyone is", "Rate episodes from Trash to Peak", "Ratings and comments stay locked until you've watched, so no spoilers"],
    },
    shots: [
      { src: "assets/caughtup/1-up-next.jpg", caption: { tr: "Sıradaki bölümler", en: "Up next" } },
      { src: "assets/caughtup/2-show.jpg", caption: { tr: "Dizi sayfası", en: "Show page" } },
      { src: "assets/caughtup/3-rating.jpg", caption: { tr: "Bölüm puanlama", en: "Episode ratings" } },
    ],
  },
  {
    name: "Ourline",
    url: "",
    status: { tr: "mobil uygulama · geliştiriliyor", en: "mobile app · in development" },
    language: "Dart",
    desc: {
      tr: "Çiftler için özel bir günlük: gün boyunca belirli zaman pencerelerinde birer fotoğraf paylaşıp birlikte ortak bir zaman çizelgesi oluşturuyorsunuz. Flutter mobil uygulama, Node.js + TypeScript API.",
      en: "A private journal for couples: share one photo in each time window of the day and build a shared timeline together. Flutter mobile app, Node.js + TypeScript API.",
    },
    pushed_at: "2026-11-24",
    stack: ["Flutter", "Dart", "Node.js", "TypeScript", "Prisma", "PostgreSQL", "Docker", "Cloudflare R2"],
    features: {
      tr: ["Gün, ayarlanabilir zaman pencerelerine bölünür; her pencerede ikiniz de bir an paylaşırsınız", "Davet koduyla eşleşme, ortak kapak fotoğrafı ve partnere özel takma ad", "Fotoğraflar imzalı adreslerle doğrudan bulut depolamaya yüklenir"],
      en: ["The day is split into configurable windows; each of you shares one moment per window", "Pair with an invite code, set a shared cover and a private nickname for your partner", "Photos upload straight to cloud storage through signed URLs"],
    },
    shots: [
      { src: "assets/ourline/1-today.jpg", caption: { tr: "Bugün", en: "Today" } },
      { src: "assets/ourline/2-journey.jpg", caption: { tr: "Günün yolculuğu", en: "Today's journey" } },
      { src: "assets/ourline/3-us.jpg", caption: { tr: "Ortak alan", en: "Shared space" } },
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
      tr: "Unity için modüler bir Goal-Oriented Action Planning (GOAP) sistemi: yapay zekâ ajanları, hedeflerine ulaşmak için hangi eylemleri hangi sırayla yapacaklarını kendileri planlar.",
      en: "A modular Goal-Oriented Action Planning (GOAP) system for Unity: AI agents plan for themselves which actions to take, and in what order, to reach their goals.",
    },
    status: { tr: "geliştiriliyor", en: "in development" },
    tags: ["Unity", "C#", "AI"],
  },
  {
    title: "GOAP Visualizer",
    desc: {
      tr: "GOAP ajanlarının hedeflerini, planlarını ve eylem zincirlerini Unity editöründe görselleştiren bir araç; bir ajanın neden o kararı verdiğini görmeyi kolaylaştırır.",
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
      tr: "SKY LAB'in 4.'sünü düzenlediği YILDIZ JAM'in koordinatörlüğünü yürüttüm: yaklaşık 4 ay süren hazırlıkla bir oyun sektörü zirvesi ve oyun geliştirme yarışması.",
      en: "Coordinated the 4th YILDIZ JAM by SKY LAB: about four months of preparation for a game industry summit and a game development competition.",
    },
    year: 2026,
    icon: "flag",
    url: "https://www.linkedin.com/in/ygokdogan/recent-activity/all/",
  },
];
