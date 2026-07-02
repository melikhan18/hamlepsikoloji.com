// Ana sayfa bölümleri için içerik. [PLACEHOLDER] metinleri düzenleyebilirsiniz.

export const benefits = [
  { pre: "Yükten", em: "kurtul", desc: "Olumsuz örüntülerden sıyrılın, yönünüzde netlik bulun.", illo: "unstuck" },
  { pre: "Derinden", em: "bağ kur", desc: "İlişkilerinizi derinleştirin, çatışmayı şefkatle yönetin.", illo: "connect" },
  { pre: "Özgüven", em: "kazan", desc: "Kendinize duyduğunuz güveni ve öz değerinizi güçlendirin.", illo: "confidence" },
  { pre: "Huzuru", em: "bul", desc: "Yaşamın getirdikleri karşısında iç dinginlik geliştirin.", illo: "peace" },
] as const;

// Çalıştığımız alanlar (areas of focus) — temalı gruplar
export const focusGroups = [
  {
    title: "Duygudurum & kaygı",
    icon: "sun",
    items: ["Kaygı & panik bozukluğu", "Depresyon", "Stres & tükenmişlik", "Uyku sorunları"],
  },
  {
    title: "Travma & geçmiş",
    icon: "spark",
    items: ["Travma & EMDR", "Yas & kayıp", "Öfke kontrolü"],
  },
  {
    title: "İlişkiler & aile",
    icon: "heart",
    items: ["İlişki sorunları", "Ebeveynlik", "Boşanma süreci"],
  },
  {
    title: "Kişisel gelişim",
    icon: "person",
    items: ["Özgüven & öz değer", "Sınav & performans kaygısı"],
  },
] as const;

// "Biz kimiz?" bölümü içeriği
export const founderQuote =
  "Amacımız sizi sürekli terapide tutmak değil; kendi ayaklarınızın üzerinde durup yola devam edebilmeniz için yanınızda olmak.";

export const aboutIntro = [
  "Uzmanlarımız, tıpkı sizin gibi yükü uzun süre tek başına taşımaktan yorulmuş insanlara yıllardır destek oluyor. Herkese uyan tek bir yöntem yerine, gerçekten ihtiyaç duyduğunuza göre uyarlanmış, kanıta dayalı yaklaşımlar kullanıyoruz.",
  "İster yüz yüze ister evinizin konforundan, ister bireysel ister çift terapisi olsun; size en uygun olduğunuz noktada buluşmak için buradayız.",
];

export const aboutAccordion = [
  {
    q: "Biz kimiz?",
    a: "Hamle Psikoloji; İstanbul merkezli, alanında deneyimli ve lisanslı psikologlardan oluşan bir psikoloji merkezidir. İsmimizdeki “hamle”, kişinin kendi iyiliği için attığı o ilk, cesur adımı temsil eder.",
  },
  {
    q: "Yargısız bir alan",
    a: "Burada hikâyeniz yargılanmadan, gizlilik içinde dinlenir. Kendinizi güvende hissedeceğiniz, olduğunuz gibi kabul edileceğiniz bir alan oluşturmayı önemsiyoruz.",
  },
  {
    q: "Terapiye yaklaşımımız",
    a: "BDT, EMDR, şema ve oyun terapisi gibi etkinliği kanıtlanmış yöntemleri, kişiye özel bir planla birlikte kullanırız. Hedef, geçici rahatlama değil; kalıcı ve sağlıklı baş etme becerileridir.",
  },
];

export const expectations = [
  { n: "01", pre: "İlk", em: "temas", illo: "reach", desc: "Form, telefon veya WhatsApp ile ulaşın; sizi dinleyelim." },
  { n: "02", pre: "Doğru", em: "eşleştirme", illo: "match", desc: "İhtiyaçlarınıza en uygun uzmanı birlikte belirleyelim." },
  { n: "03", pre: "İlk", em: "seans", illo: "session", desc: "Tanışma ve değerlendirmeyle güvenli bir başlangıç yapın." },
  { n: "04", pre: "Birlikte", em: "yol almak", illo: "journey", desc: "Kanıta dayalı yöntemlerle, kendi hızınızda ilerleyin." },
] as const;

// [PLACEHOLDER] Anonimleştirilmiş danışan görüşleri
export const testimonials = [
  {
    quote:
      "İlk adımı atmak en zoruydu. Burada yargılanmadan dinlendiğimi hissettim ve hayatımda gerçek bir değişim oldu.",
    name: "D.K.",
    role: "Bireysel terapi",
  },
  {
    quote:
      "Eşimle yıllardır konuşamadığımız konuları nihayet sağlıklı bir şekilde konuşabilir hâle geldik. Bağımız güçlendi.",
    name: "S. & M.",
    role: "Çift terapisi",
  },
  {
    quote:
      "Çocuğumun okula uyum sürecinde aldığımız destek çok değerliydi. Hem ona hem bize rehberlik edildi.",
    name: "E.A.",
    role: "Çocuk & ergen",
  },
  {
    quote:
      "Yoğun tempomda yüz yüze gelmek zordu; online görüşmeler hayatımı kolaylaştırdı, üstelik aynı derecede etkiliydi.",
    name: "B.Y.",
    role: "Online terapi",
  },
  {
    quote:
      "Panik ataklarımla baş etmeyi öğrendim. Artık nöbet geldiğinde ne yapacağımı biliyorum ve çok daha güçlüyüm.",
    name: "C.T.",
    role: "Kaygı",
  },
  {
    quote:
      "Kaybımın yasını tutmama yardımcı oldular. İlk kez duygularımı bastırmadan, güvenle ifade edebildim.",
    name: "N.Ö.",
    role: "Yas & kayıp",
  },
];
