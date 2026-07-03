export type Service = {
  slug: string;
  title: string;
  shortTitle: string;
  tagline: string;
  summary: string;
  forWho: string[];
  process: { title: string; desc: string }[];
  faqs: { q: string; a: string }[];
  // basit bir çizgi-ikon anahtarı (Icon bileşeninde eşlenir)
  icon: "person" | "heart" | "child" | "screen";
  // hizmet kartı için illüstrasyon anahtarı (Illustrations bileşeni)
  illo: "individual" | "couples" | "child" | "online";
  // hizmet kartında gösterilen kısa tanıtım
  pitch: string;
  seoTitle?: string;
  seoDescription?: string;
};

export const services: Service[] = [
  {
    slug: "bireysel-terapi",
    title: "Bireysel Terapi",
    shortTitle: "Bireysel Terapi",
    tagline: "Kendinizle daha sağlıklı bir ilişki kurmak için",
    icon: "person",
    illo: "individual",
    pitch:
      "Kaygı, depresyon, travma ve kişisel gelişim için birebir destek. Sizi ekibimizden en uygun uzmanla eşleştirir, kendi hızınızda ilerlersiniz.",
    summary:
      "Bireysel terapi; kaygı, depresyon, stres, özgüven, travma ve yaşam geçişleri gibi konularda, alanında uzman psikologlarla birebir yürütülen gizli bir süreçtir. Amaç, zorlandığınız alanları anlamak ve kalıcı, sağlıklı baş etme becerileri geliştirmektir.",
    forWho: [
      "Yoğun kaygı, panik veya sürekli endişe yaşayanlar",
      "Mutsuzluk, motivasyon kaybı veya depresif duygudurum",
      "Stres, tükenmişlik ve iş–yaşam dengesi sorunları",
      "Özgüven, öz değer ve kendini ifade etme güçlükleri",
      "Kayıp, yas ve zorlu yaşam geçişleri",
      "Geçmiş travmatik deneyimlerin etkisiyle baş etme",
    ],
    process: [
      { title: "Ön görüşme", desc: "İhtiyaçlarınızı dinler, size en uygun uzmanı ve yöntemi belirleriz." },
      { title: "Değerlendirme", desc: "İlk birkaç seansta mevcut durumu birlikte anlar, hedefleri netleştiririz." },
      { title: "Terapi süreci", desc: "Düzenli seanslarla, kanıta dayalı yöntemlerle çalışırız." },
      { title: "Sonlandırma", desc: "Kazanımları pekiştirir, süreci birlikte sonlandırırız." },
    ],
    faqs: [
      { q: "Bireysel terapi ne kadar sürer?", a: "Süre kişiye ve hedeflere göre değişir. Bazı konular birkaç seansta ilerlerken, derin çalışmalar daha uzun sürebilir. İlk değerlendirmeden sonra size öngörülen bir çerçeve sunarız." },
      { q: "Seanslar ne sıklıkta yapılır?", a: "Genellikle haftada bir, 45–50 dakikalık seanslar şeklinde planlanır. İhtiyaca göre sıklık birlikte ayarlanır." },
      { q: "Görüşmelerim gizli mi?", a: "Evet. Tüm görüşmeler meslek etiği ve gizlilik ilkeleri çerçevesinde, tamamen gizli yürütülür." },
    ],
  },
  {
    slug: "cift-ve-aile-terapisi",
    title: "Çift & Aile Terapisi",
    shortTitle: "Çift & Aile",
    tagline: "İlişkinizde anlaşılmak ve yeniden bağ kurmak için",
    icon: "heart",
    illo: "couples",
    pitch:
      "İletişim koptuğunda yeniden bağ kurmak mümkün. Çiftlerin ve ailelerin güveni onarmasına ve sağlıklı, güvenli bir ilişki geliştirmesine destek oluruz.",
    summary:
      "Çift ve aile terapisi; iletişim sorunları, çatışmalar, güven kaybı, ebeveynlik ve aile içi roller gibi konularda çiftlerin ve ailelerin birlikte çalıştığı bir süreçtir. Hedef, sağlıklı iletişim kurmayı öğrenmek ve ilişkiyi güçlendirmektir.",
    forWho: [
      "Sık tekrarlayan tartışmalar ve iletişim kopuklukları",
      "Güven kaybı, kıskançlık ve aldatma sonrası onarım",
      "Evlilik kararı, nişanlılık ve evliliğe hazırlık",
      "Ebeveynlik konusunda görüş ayrılıkları",
      "Aile içi rol ve sınır sorunları",
      "Ayrılık/boşanma sürecini sağlıklı yönetme",
    ],
    process: [
      { title: "Ortak ön görüşme", desc: "İlişkideki temel ihtiyaç ve beklentileri birlikte dinleriz." },
      { title: "Değerlendirme", desc: "İlişki dinamiklerini ve tekrarlayan örüntüleri haritalarız." },
      { title: "Çalışma süreci", desc: "İletişim, çatışma çözümü ve bağ kurma üzerine seanslar yürütürüz." },
      { title: "Pekiştirme", desc: "Kazanılan becerileri günlük yaşama taşır, süreci tamamlarız." },
    ],
    faqs: [
      { q: "Eşim/partnerim gelmek istemiyor, yine de gelebilir miyim?", a: "Evet. İlişki konuları bireysel seanslarda da çalışılabilir; ilerleyen aşamada ortak seanslara geçiş değerlendirilebilir." },
      { q: "Terapist taraf tutar mı?", a: "Hayır. Terapist tarafsızdır; amacı kimsenin haklı/haksız olduğunu belirlemek değil, ilişkinin sağlıklı işlemesine destek olmaktır." },
      { q: "Seanslara çocuğumuzu da getirmeli miyiz?", a: "Bu, çalışılan konuya göre değişir. Aile terapisinde gerektiğinde çocukların katılımı planlanabilir." },
    ],
  },
  {
    slug: "cocuk-ve-ergen-terapisi",
    title: "Çocuk & Ergen Terapisi",
    shortTitle: "Çocuk & Ergen",
    tagline: "Çocuğunuzun duygusal gelişimine güvenli bir alan",
    icon: "child",
    illo: "child",
    pitch:
      "Çocuk ve ergenlere gelişim dönemine uygun yöntemlerle yaklaşır; aileyi de sürecin parçası yapıp ebeveyn rehberliğiyle destekleriz.",
    summary:
      "Çocuk ve ergen terapisi; gelişim dönemine uygun yöntemlerle (oyun terapisi, sanat temelli çalışmalar ve ergenler için bireysel görüşmeler) yürütülür. Davranış sorunları, kaygı, okul uyumu ve ergenlik dönemi zorluklarında çocuğa ve aileye birlikte destek olunur.",
    forWho: [
      "Kaygı, korku, içe kapanıklık veya öfke kontrolü güçlükleri",
      "Okul uyumu, akademik motivasyon ve dikkat sorunları",
      "Akran ilişkileri ve sosyal beceri zorlukları",
      "Boşanma, kayıp veya kardeş kıskançlığı gibi geçişler",
      "Ergenlikte kimlik, özgüven ve duygu düzenleme",
      "Uyku, tuvalet veya yeme ile ilgili davranışsal sorunlar",
    ],
    process: [
      { title: "Aile görüşmesi", desc: "Süreci ebeveynle başlatır, çocuğun ihtiyaçlarını dinleriz." },
      { title: "Tanışma & değerlendirme", desc: "Çocukla güvenli bir ilişki kurar, gelişimsel değerlendirme yaparız." },
      { title: "Terapi süreci", desc: "Yaşa uygun yöntemlerle çalışır, aileyi düzenli bilgilendiririz." },
      { title: "Aile rehberliği", desc: "Evde uygulanabilecek yaklaşımlarla aileyi destekleriz." },
    ],
    faqs: [
      { q: "Çocuğum terapiye gitmek istemediğini söylüyor, ne yapmalıyım?", a: "Bu çok yaygındır. İlk seanslar tanışma ve güven kurmaya ayrılır; çocuğun süreci zorlamadan benimsemesi hedeflenir." },
      { q: "Seansların içeriğini bana anlatıyor musunuz?", a: "Çocuğun güven duygusunu korumak adına ayrıntılar paylaşılmaz; ancak süreç, gelişim ve evde yapılabilecekler düzenli olarak aileyle değerlendirilir." },
      { q: "Oyun terapisi nedir?", a: "Oyun, çocuğun doğal ifade dilidir. Oyun terapisi, çocuğun duygularını oyun yoluyla güvenle ifade etmesini ve düzenlemesini sağlayan kanıta dayalı bir yöntemdir." },
    ],
  },
  {
    slug: "online-terapi",
    title: "Online Terapi",
    shortTitle: "Online Terapi",
    tagline: "Neredeyseniz orada, güvenli ve esnek destek",
    icon: "screen",
    illo: "online",
    pitch:
      "Neredeyseniz orada. Görüntülü, güvenli ve esnek görüşmelerle, evinizin konforunda uzman desteğine kolayca ulaşırsınız.",
    summary:
      "Online terapi; yüz yüze terapiyle aynı etkinlikte, görüntülü görüşme üzerinden yürütülen güvenli bir danışmanlık biçimidir. Türkiye'nin ve dünyanın her yerinden, evinizin konforunda uzman psikologlarla görüşebilirsiniz.",
    forWho: [
      "Yoğun çalışma temposu nedeniyle zaman bulmakta zorlananlar",
      "Şehir dışında veya yurt dışında yaşayanlar",
      "Ulaşım, sağlık veya hareket kısıtı olanlar",
      "Görüşmelerini kendi güvenli alanında yapmayı tercih edenler",
      "Yüz yüze başlamadan önce online denemek isteyenler",
    ],
    process: [
      { title: "Randevu", desc: "Size uygun gün ve saati birlikte belirleriz." },
      { title: "Bağlantı", desc: "Görüşme öncesi güvenli görüşme bağlantısını iletiriz." },
      { title: "Görüşme", desc: "Sessiz bir ortamdan, görüntülü olarak seansınızı gerçekleştirirsiniz." },
      { title: "Devam", desc: "Süreci planlar, sonraki seansları birlikte ayarlarız." },
    ],
    faqs: [
      { q: "Online terapi yüz yüze kadar etkili mi?", a: "Araştırmalar, kaygı, depresyon ve ilişki sorunları gibi pek çok alanda online terapinin yüz yüze terapiyle karşılaştırılabilir sonuçlar verdiğini göstermektedir." },
      { q: "Hangi uygulamayı kullanıyorsunuz?", a: "Görüşmeler güvenli, uçtan uca şifreli görüntülü görüşme araçlarıyla yapılır. Ayrı bir uygulama indirmeniz çoğu zaman gerekmez." },
      { q: "Ödeme nasıl yapılıyor?", a: "Randevu onayının ardından güvenli ödeme bağlantısı paylaşılır. Detaylar için iletişime geçebilirsiniz." },
    ],
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
