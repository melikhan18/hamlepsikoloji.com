export type Block = { h2?: string; p?: string; ul?: string[]; image?: string };
export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // ISO
  authorSlug: string;
  category: string;
  cover: string; // Unsplash foto id'si (u() ile boyutlandırılır)
  icon: "leaf" | "screen" | "heart" | "child" | "person" | "spark" | "sun"; // hover ikonu
  content: Block[];
  seoTitle?: string; // opsiyonel SEO başlığı (boşsa title kullanılır)
  seoDescription?: string; // opsiyonel meta açıklaması (boşsa excerpt kullanılır)
};

// [PLACEHOLDER] taslak yazılar — SEO için başlangıç içerikleri. Düzenleyip çoğaltabilirsiniz.
export const posts: Post[] = [
  {
    slug: "kaygiyla-bas-etmenin-yollari",
    title: "Kaygıyla Baş Etmenin 7 Etkili Yolu",
    excerpt:
      "Kaygı hepimizin zaman zaman yaşadığı doğal bir duygudur. Günlük yaşamı zorlaştırmaya başladığında ise baş etmek mümkün. İşte kanıta dayalı 7 yöntem.",
    date: "2026-06-01",
    authorSlug: "uzman-bir",
    category: "Kaygı",
    cover: "photo-1506126613408-eca07ce68773",
    icon: "leaf",
    content: [
      { p: "Kaygı, tehdit algıladığımızda bedenimizin verdiği doğal bir tepkidir. Ancak süreklileştiğinde ve günlük yaşamı etkilemeye başladığında, üzerinde çalışmak gerekir. Aşağıdaki yöntemler, kaygıyla baş etmede sıkça önerilen, kanıta dayalı yaklaşımlardır." },
      { h2: "1. Nefesinizi yavaşlatın", p: "Yavaş ve derin nefes almak, bedenin alarm tepkisini sakinleştirir. Dört saniye nefes alıp altı saniyede vermeyi deneyin." },
      { h2: "2. Düşüncelerinizi fark edin", p: "Kaygı çoğu zaman 'en kötü senaryo' düşünceleriyle beslenir. Bu düşünceleri fark etmek ve gerçekçi olup olmadıklarını sorgulamak, bilişsel davranışçı terapinin temel adımlarından biridir." },
      { h2: "3. Bedeninizi hareket ettirin", p: "Düzenli fiziksel aktivite, kaygı düzeyini düşürdüğü gösterilen en etkili yöntemlerden biridir." },
      { h2: "Ne zaman destek almalı?", p: "Kaygınız haftalarca sürüyor, uykunuzu, ilişkilerinizi veya işinizi etkiliyorsa bir uzmandan destek almak güçlü bir adımdır. Bireysel terapi, kaygının kökenini anlamanıza ve kalıcı baş etme becerileri geliştirmenize yardımcı olur." },
    ],
  },
  {
    slug: "online-terapi-rehberi",
    title: "Online Terapi Nedir? Bilmeniz Gereken Her Şey",
    excerpt:
      "Online terapi, yüz yüze terapiyle aynı etkinlikte güvenli bir destek biçimi. Nasıl işlediğini, kimler için uygun olduğunu ve nelere dikkat edilmesi gerektiğini açıklıyoruz.",
    date: "2026-05-15",
    authorSlug: "uzman-iki",
    category: "Online Terapi",
    cover: "photo-1488521787991-ed7bbaae773c",
    icon: "screen",
    content: [
      { p: "Online terapi, görüntülü görüşme yoluyla bir uzman psikologdan destek almanızı sağlayan bir danışmanlık biçimidir. Son yıllarda hem erişilebilirliği hem de etkinliği nedeniyle giderek yaygınlaşmıştır." },
      { h2: "Online terapi kimler için uygun?", ul: [
        "Yoğun çalışma temposu olanlar",
        "Şehir dışında veya yurt dışında yaşayanlar",
        "Ulaşım veya sağlık nedeniyle yüz yüze gelmesi zor olanlar",
        "Görüşmelerini kendi güvenli alanında yapmayı tercih edenler",
      ] },
      { h2: "Etkili mi?", p: "Araştırmalar; kaygı, depresyon ve ilişki sorunları başta olmak üzere pek çok alanda online terapinin yüz yüze terapiyle karşılaştırılabilir sonuçlar verdiğini göstermektedir." },
      { h2: "Nelere dikkat etmeli?", p: "Görüşme için sessiz ve özel bir ortam, dengeli bir internet bağlantısı ve güvenli bir görüşme platformu önemlidir. Süreci en verimli kılmak için seansa hazırlıklı katılmak faydalıdır." },
    ],
  },
  {
    slug: "panik-atakla-bas-etme",
    title: "Panik Atakla Baş Etme Rehberi",
    excerpt:
      "Panik atak korkutucu olabilir ama kontrol edilebilir. Nöbet anında uygulayabileceğiniz kanıta dayalı teknikleri derledik.",
    date: "2026-05-28",
    authorSlug: "uzman-bir",
    category: "Kaygı",
    cover: "photo-1518495973542-4542c06a5843",
    icon: "leaf",
    content: [
      { p: "Panik atak; yoğun korku, çarpıntı ve nefes darlığıyla aniden ortaya çıkan bir tepkidir. Tehlikeli olmasa da çok rahatsız edicidir. İyi haber: baş etme becerileri öğrenilebilir." },
      { h2: "Nöbet anında ne yapmalı?", p: "Nefesinizi yavaşlatın, ayaklarınızı yere basın ve çevrenizdeki beş şeyi adlandırarak ana dönün. Bu, bedenin alarm tepkisini sakinleştirir." },
    ],
  },
  {
    slug: "guvenli-baglanma",
    title: "Sağlıklı İlişkilerde Güvenli Bağlanma",
    excerpt:
      "Bağlanma biçimimiz ilişkilerimizi derinden etkiler. Güvenli bağ kurmanın yollarını ve neden önemli olduğunu konuşuyoruz.",
    date: "2026-05-12",
    authorSlug: "uzman-iki",
    category: "İlişkiler",
    cover: "photo-1516589178581-6cd7833ae3b2",
    icon: "heart",
    content: [
      { p: "Güvenli bağlanma; partnerimize güvenebildiğimiz, ihtiyaçlarımızı ifade edebildiğimiz ve reddedilme korkusu olmadan yakınlaşabildiğimiz bir ilişki biçimidir." },
      { h2: "Güvenli bağ nasıl güçlenir?", p: "Açık iletişim, tutarlılık ve karşılıklı duygusal erişilebilirlik güvenli bağın temelidir. Terapi, eski örüntüleri fark edip dönüştürmeye yardımcı olur." },
    ],
  },
  {
    slug: "cift-iletisimi",
    title: "Çift İletişiminde 5 Altın Kural",
    excerpt:
      "Çoğu ilişki sorunu, anlaşmazlıktan çok iletişim biçiminden kaynaklanır. İşte bağı güçlendiren 5 temel iletişim kuralı.",
    date: "2026-04-30",
    authorSlug: "uzman-bir",
    category: "İlişkiler",
    cover: "photo-1542596768-5d1d21f1cf98",
    icon: "heart",
    content: [
      { p: "Sağlıklı iletişim; güven, duygusal yakınlık ve uzun vadeli ilişki doyumunun temelidir. İletişimi geliştirmek çatışmadan kaçınmak değil; konuşmaları özen, saygı ve anlayışla yönetmeyi öğrenmektir." },
      { h2: "Aktif dinleyin", p: "Aktif dinleme, partneriniz konuşurken tamamen orada olmaktır. Dikkat dağıtıcıları bir kenara bırakın, sözünü kesmeyin ve yanıt planlamak yerine mesajını gerçekten anlamaya odaklanın. Duyduğunuzu yansıtmak ve duygularını onaylamak, anlaşılmadığınızı düşünseniz bile güven yaratır ve bağı güçlendirir." },
      { h2: "Açık ve dürüst konuşun", p: "Düşünce ve duygularınızı suçlamak yerine 'ben' diliyle ifade edin. İhtiyaçlarınız konusunda net olmak yanlış anlaşılmaları ve kırgınlıkları önler; partnerinizin aklınızı okumasını beklemek yerine ihtiyacınızı açıkça söyleyin." },
      { ul: [
        "Suçlamadan duygunuzu paylaşın (örn. '… olduğunda bunalıyorum').",
        "Ne yaşadığınız ve neye ihtiyaç duyduğunuz konusunda net olun.",
        "Önce duyguları paylaşın, suçlamaları değil.",
        "Partnerinizin aklınızı okumasını beklemeyin; yüksek sesle söyleyin.",
        "Geçmiş çatışmaları açmak yerine şu anki konuya odaklanın.",
      ] },
      { image: "photo-1573496359142-b8d87734a5a2" },
      { h2: "Doğru zamanı seçin", p: "Zamanlama önemlidir. Önemli konuşmalar, iki taraf da sakin ve duygusal olarak hazır olduğunda en verimlidir. Stres ya da yorgunluk anlarında hassas konuları açmaktan kaçının; konuşmaya bilinçli bir alan açmak her iki tarafın da özenle ve saygıyla katılmasını sağlar." },
      { h2: "Çatışmayı yapıcı yönetin", p: "Anlaşmazlıklar her ilişkide normaldir. Partnerinizi eleştirmek yerine soruna odaklanın; onun bakış açısına merak duyun, kendi payınızı üstlenin ve 'her zaman', 'asla' gibi kesin ifadelerden kaçının. Çözüm için bir takım gibi çalışmak dayanıklılığı ve karşılıklı saygıyı güçlendirir." },
      { h2: "Takdiri ve sevgiyi gösterin", p: "Olumlu iletişim yalnızca sorun çözmek değil, bağı beslemektir. Düzenli olarak minnet, sevgi ve takdir ifade etmek partnerinizin değerli hissetmesini sağlar; küçük takdir jestleri zor konuşmaları yumuşatır." },
      { h2: "Hepsini bir araya getirmek", p: "İletişimi geliştirmek zaman, sabır ve her iki taraftan da pratik ister. Niyetle dinlemek, dürüst konuşmak, doğru anı seçmek, çatışmayı düşünceyle yönetmek ve takdiri göstermek; daha derin bir anlayış, daha güçlü bir duygusal güven ve daha tatmin edici bir ilişki yaratır." },
    ],
  },
  {
    slug: "terapiye-ilk-kez-baslarken",
    title: "Terapiye İlk Kez Başlarken",
    excerpt:
      "İlk seans nasıl geçer, neler konuşulur, gizlilik nasıl korunur? Terapiye başlamadan önce merak edilenleri yanıtladık.",
    date: "2026-04-18",
    authorSlug: "uzman-iki",
    category: "Online Terapi",
    cover: "photo-1573496359142-b8d87734a5a2",
    icon: "screen",
    content: [
      { p: "Terapiye ilk adımı atmak cesaret ister. İlk görüşme, sizi neyin buraya getirdiğini paylaştığınız bir tanışma ve değerlendirme seansıdır." },
      { h2: "Gizlilik", p: "Paylaştığınız her şey meslek etiği ve gizlilik ilkeleriyle korunur. Güvenli bir alan, terapinin temel taşıdır." },
    ],
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);
