// S.S.S. — kategorilere ayrılmış sorular (FAQPage schema için de kullanılır)
export type FaqGroup = { id: string; title: string; items: { q: string; a: string }[] };

export const faqGroups: FaqGroup[] = [
  {
    id: "terapi",
    title: "Terapi",
    items: [
      {
        q: "Terapiye nasıl başlarım?",
        a: "İletişim formunu doldurarak, telefonla veya WhatsApp üzerinden bize ulaşabilirsiniz. Kısa bir ön görüşmeyle ihtiyaçlarınızı dinler, size en uygun uzmanı ve randevu saatini birlikte belirleriz.",
      },
      {
        q: "İlk görüşmede ne oluyor?",
        a: "İlk görüşme bir tanışma ve değerlendirme seansıdır. Sizi neyin buraya getirdiğini konuşur, beklentilerinizi netleştirir ve terapinin nasıl ilerleyebileceğine dair bir çerçeve oluştururuz.",
      },
      {
        q: "Bir seans ne kadar sürüyor?",
        a: "Bireysel seanslar genellikle 45–50 dakika sürer. Çift ve aile seansları konuya göre daha uzun planlanabilir.",
      },
      {
        q: "Ne sıklıkta görüşmem gerekir?",
        a: "Genellikle haftada bir görüşme ile başlanır. Süreç ilerledikçe sıklık, ihtiyaçlarınıza göre uzmanınızla birlikte ayarlanır.",
      },
      {
        q: "Online terapi yüz yüze kadar etkili mi?",
        a: "Araştırmalar, pek çok alanda online terapinin yüz yüze terapiyle karşılaştırılabilir sonuçlar verdiğini göstermektedir. Size hangisinin daha uygun olduğuna birlikte karar verebiliriz.",
      },
    ],
  },
  {
    id: "ucret-odeme",
    title: "Ücret & Ödeme",
    items: [
      {
        q: "Seans ücreti ne kadar?",
        a: "Seans ücretleri, hizmet türüne ve uzmana göre değişir. Güncel ücret bilgisi için bizimle iletişime geçebilirsiniz; ön görüşmede sizi net biçimde bilgilendiririz.",
      },
      {
        q: "Ödeme nasıl yapılıyor?",
        a: "Yüz yüze görüşmelerde seans sonunda; online görüşmelerde ise randevu onayının ardından paylaşılan güvenli ödeme bağlantısıyla ödeme yapabilirsiniz.",
      },
    ],
  },
  {
    id: "uzmanlar",
    title: "Uzmanlar",
    items: [
      {
        q: "Bana uygun uzmanı nasıl belirliyorsunuz?",
        a: "Ön görüşmede ihtiyaçlarınızı, beklentilerinizi ve çalışmak istediğiniz konuları dinler; bunlara en uygun uzmanlık alanına ve yönteme sahip psikoloğumuzla sizi eşleştiririz.",
      },
      {
        q: "Hangi alanlarda destek veriyorsunuz?",
        a: "Bireysel terapi, çift & aile terapisi, çocuk & ergen danışmanlığı ve online terapi alanlarında; kaygı, depresyon, travma, ilişki sorunları ve daha pek çok konuda destek sunuyoruz.",
      },
    ],
  },
  {
    id: "randevu-gizlilik",
    title: "Randevu & Gizlilik",
    items: [
      {
        q: "Randevumu iptal edebilir veya erteleyebilir miyim?",
        a: "Evet. Randevunuzu belirlenen süre öncesinde haber vererek erteleyebilir veya iptal edebilirsiniz. Detaylar ilk görüşmede paylaşılır.",
      },
      {
        q: "Görüşmeler gizli mi?",
        a: "Evet. Tüm görüşmeler meslek etiği ve gizlilik ilkeleri çerçevesinde tamamen gizli yürütülür. Paylaştıklarınız üçüncü kişilerle paylaşılmaz.",
      },
    ],
  },
];

export const allFaqs = faqGroups.flatMap((g) => g.items);
