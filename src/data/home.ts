// Ana sayfa bölümleri için içerik.

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
  "Her insanın ihtiyacı ve yaşam deneyimi farklıdır. Bu nedenle süreç, ilk görüşmede değerlendirilen ihtiyaçlara ve birlikte belirlenen hedeflere göre kişiye özel olarak planlanır.",
  "İster yüz yüze ister evinizin konforundan, ister bireysel ister çift terapisi olsun; size en uygun olduğunuz noktada buluşmak için buradayız.",
];

export const aboutAccordion = [
  {
    q: "Biz kimiz?",
    a: "Hamle Psikoloji, İstanbul merkezli bir psikolojik danışmanlık merkezidir. İsmimizdeki “hamle”, kişinin kendi iyiliği için attığı o ilk, cesur adımı temsil eder.",
  },
  {
    q: "Yargısız bir alan",
    a: "Burada hikâyeniz yargılanmadan, gizlilik içinde dinlenir. Kendinizi güvende hissedeceğiniz, olduğunuz gibi kabul edileceğiniz bir alan oluşturmayı önemsiyoruz.",
  },
  {
    q: "Terapiye yaklaşımımız",
    a: "Uygulanacak yaklaşım; başvuru nedeni, ihtiyaçlar ve ilgili uzmanın eğitim ve yetkinlikleri doğrultusunda belirlenir. Sürecin hedefleri ilk görüşmelerde birlikte netleştirilir.",
  },
];

export const expectations = [
  { n: "01", pre: "İlk", em: "temas", illo: "reach", desc: "Form, telefon veya WhatsApp ile ulaşın; sizi dinleyelim." },
  { n: "02", pre: "Doğru", em: "eşleştirme", illo: "match", desc: "İhtiyaçlarınıza en uygun uzmanı birlikte belirleyelim." },
  { n: "03", pre: "İlk", em: "seans", illo: "session", desc: "Tanışma ve değerlendirmeyle güvenli bir başlangıç yapın." },
  { n: "04", pre: "Birlikte", em: "yol almak", illo: "journey", desc: "Kanıta dayalı yöntemlerle, kendi hızınızda ilerleyin." },
] as const;
