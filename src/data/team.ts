export type Expert = {
  slug: string;
  name: string;
  title: string; // unvan
  credentials: string; // kısa nitelik satırı
  photo: string; // /public içindeki yol — şimdilik placeholder
  specialties: string[];
  methods: string[];
  serviceSlugs: string[]; // ilgili hizmetler
  education: string[];
  bio: string[]; // paragraflar
  approach: string; // kısa, kişisel yaklaşım cümlesi (kartta öne çıkar)
};

// [PLACEHOLDER] — Gerçek uzman bilgileri, fotoğraflar ve biyografilerle güncelleyin.
export const team: Expert[] = [
  {
    slug: "uzman-bir",
    name: "Uzman İsim 1",
    title: "Uzman Klinik Psikolog",
    credentials: "Klinik Psikolog · Yetişkin & Çift Terapisi",
    photo: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=600&h=700",
    specialties: [
      "Kaygı ve panik bozukluğu",
      "Depresyon ve duygudurum",
      "İlişki ve çift terapisi",
      "Travma ve EMDR",
    ],
    methods: ["Bilişsel Davranışçı Terapi (BDT)", "EMDR", "Şema Terapi"],
    serviceSlugs: ["bireysel-terapi", "cift-ve-aile-terapisi", "online-terapi"],
    approach:
      "Yargılamadan dinler, kişiye özel ve kanıta dayalı bir yol haritasıyla yanınızda yürürüm.",
    education: [
      "[PLACEHOLDER] Psikoloji Lisansı — Üniversite Adı",
      "[PLACEHOLDER] Klinik Psikoloji Yüksek Lisansı — Üniversite Adı",
      "[PLACEHOLDER] EMDR Terapi Eğitimi",
    ],
    bio: [
      "Bu bir örnek biyografi metnidir. Uzmanımızın eğitim geçmişi, çalışma alanları ve terapiye yaklaşımı bu bölümde yer alacaktır. İçeriği daha sonra gerçek bilgilerle güncelleyebilirsiniz.",
      "Terapiye yaklaşımı; danışanı yargılamadan dinlemek, güvenli bir alan oluşturmak ve kişiye özel, kanıta dayalı yöntemlerle çalışmak üzerine kuruludur. Yetişkin bireyler ve çiftlerle çalışmaktadır.",
    ],
  },
  {
    slug: "uzman-iki",
    name: "Uzman İsim 2",
    title: "Uzman Psikolog",
    credentials: "Psikolog · Çocuk, Ergen & Aile",
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=600&h=700",
    specialties: [
      "Çocuk ve ergen danışmanlığı",
      "Oyun terapisi",
      "Aile danışmanlığı",
      "Okul uyumu ve davranış sorunları",
    ],
    methods: ["Oyun Terapisi", "Aile Danışmanlığı", "Bilişsel Davranışçı Terapi (BDT)"],
    serviceSlugs: ["cocuk-ve-ergen-terapisi", "cift-ve-aile-terapisi", "online-terapi"],
    approach:
      "Çocuğun dilinden konuşur, aileyi iyileşmenin doğal bir parçası hâline getiririm.",
    education: [
      "[PLACEHOLDER] Psikoloji Lisansı — Üniversite Adı",
      "[PLACEHOLDER] Çocuk ve Ergen Psikolojisi Eğitimi",
      "[PLACEHOLDER] Oyun Terapisi Sertifikası",
    ],
    bio: [
      "Bu bir örnek biyografi metnidir. Uzmanımızın eğitim geçmişi, çalışma alanları ve çocuklarla/ailelerle çalışma yaklaşımı bu bölümde yer alacaktır. İçeriği daha sonra gerçek bilgilerle güncelleyebilirsiniz.",
      "Çocuk ve ergenlerle gelişim dönemine uygun yöntemlerle çalışır; aileyi sürecin doğal bir parçası olarak görür ve ebeveyn rehberliğine önem verir.",
    ],
  },
];

export const getExpert = (slug: string) => team.find((e) => e.slug === slug);
export const expertsForService = (serviceSlug: string) =>
  team.filter((e) => e.serviceSlugs.includes(serviceSlug));
