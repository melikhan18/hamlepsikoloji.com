// Hukuki metinler — CMS API kapalıysa fallback. Admin panelden düzenlenir.
export type LegalDoc = {
  slug: string;
  title: string;
  intro: string;
  sections: { h: string; p: string }[];
};

export const legalDocs: LegalDoc[] = [
  {
    slug: "kvkk",
    title: "KVKK Aydınlatma Metni",
    intro:
      "Bu metin, web sitesi ve iletişim kanalları üzerinden paylaşılan kişisel verilerin 6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında nasıl işlendiği hakkında bilgi verir.",
    sections: [
      { h: "Veri sorumlusu", p: "Kişisel verileriniz, Hamle Psikoloji Danışmanlık Merkezi tarafından veri sorumlusu sıfatıyla işlenir. Güncel iletişim bilgileri bu sayfanın sonunda yer alır." },
      { h: "İşlenen veri kategorileri", p: "İletişim formu veya diğer iletişim kanalları kullanıldığında kimlik bilgisi (ad ve soyad), iletişim bilgisi (telefon ve e-posta), talep/randevu bilgisi, işlem güvenliği kayıtları ve sizin ayrıca paylaşmayı seçtiğiniz mesaj içeriği işlenebilir. İletişim formuna sağlık geçmişi veya ayrıntılı özel nitelikli kişisel veri yazmamanızı öneririz." },
      { h: "İşleme amaçları", p: "Veriler; talebinizi almak ve yanıtlamak, uygun iletişim ve randevu sürecini yürütmek, hizmet güvenliğini sağlamak, hukuki yükümlülükleri yerine getirmek ve olası uyuşmazlıklarda hakları korumak amaçlarıyla sınırlı olarak işlenir." },
      { h: "Toplama yöntemi ve hukuki sebepler", p: "Veriler web formu, telefon, e-posta veya WhatsApp üzerinden elektronik olarak toplanır. İşleme faaliyeti, KVKK madde 5/2 kapsamındaki sözleşmenin kurulması veya ifasıyla doğrudan ilgili olma, veri sorumlusunun hukuki yükümlülüğü ve temel haklarınıza zarar vermemek kaydıyla meşru menfaat sebeplerine dayanabilir. Açık rıza gereken ayrı bir faaliyet varsa rızanız ayrıca istenir." },
      { h: "Aktarım", p: "Veriler; barındırma, iletişim, güvenlik ve teknik destek hizmeti sağlayan tedarikçilere yalnızca hizmetin gerektirdiği ölçüde, yetkili kamu kurumlarına ise hukuki zorunluluk bulunması hâlinde aktarılabilir. WhatsApp veya Google hizmetlerini tercih etmeniz, ilgili sağlayıcının kendi koşulları kapsamında yurt dışında veri işlemesine yol açabilir." },
      { h: "Saklama ve güvenlik", p: "Veriler yalnızca işleme amacı ve ilgili mevzuatın gerektirdiği süre boyunca saklanır; süre sonunda silinir, yok edilir veya anonim hâle getirilir. Yetkisiz erişim, kayıp ve kötüye kullanıma karşı uygun idari ve teknik tedbirler uygulanır." },
      { h: "Haklarınız ve başvuru", p: "KVKK madde 11 kapsamında verilerinizin işlenip işlenmediğini öğrenme, bilgi isteme, amacına uygun kullanılıp kullanılmadığını öğrenme, aktarılan kişileri bilme, düzeltme, silme veya yok etme isteme, otomatik analiz sonucuna itiraz etme ve zararın giderilmesini talep etme haklarına sahipsiniz. Kimliğinizi doğrulamaya yarayan bilgiler ve talebinizle birlikte aşağıdaki iletişim kanallarından başvurabilirsiniz." },
    ],
  },
  {
    slug: "gizlilik",
    title: "Gizlilik Politikası",
    intro:
      "Bu politika, Hamle Psikoloji web sitesini ve iletişim kanallarını kullandığınızda gizliliğinizi nasıl koruduğumuzu açıklar.",
    sections: [
      { h: "Toplanan bilgiler", p: "Doğrudan paylaştığınız iletişim ve talep bilgileri ile güvenlik kayıtları işlenebilir. Analitik ve reklam amaçlı çerezler, yalnızca çerez tercih merkezinde ilgili kategoriye izin vermeniz hâlinde kullanılır; izin verilmeden önce Google etiketleri kimliksiz, toplu sinyallerle sınırlı çalışır." },
      { h: "Kullanım amaçları", p: "Bilgiler talepleri yanıtlamak, randevu iletişimini yürütmek, site güvenliğini sağlamak, kullanıcı deneyimini geliştirmek ve izin verilmişse reklam performansını ölçmek için kullanılır." },
      { h: "Üçüncü taraf hizmetleri", p: "Site altyapısı, e-posta, WhatsApp ve izin vermeniz hâlinde Google Analytics, Google Ads veya Google Tag Manager gibi hizmetlerden yararlanılabilir. Bu sağlayıcıların işlediği veriler kendi gizlilik koşullarına da tabidir." },
      { h: "Görüşme gizliliği", p: "Psikolojik danışmanlık görüşmelerinin içeriği mesleki etik, gizlilik yükümlülükleri ve uygulanabilir mevzuat çerçevesinde korunur. Kanuni bildirim yükümlülükleri ve ciddi güvenlik riskleri gibi hukuken zorunlu istisnalar saklıdır." },
      { h: "Tercihleriniz", p: "İsteğe bağlı çerezleri kabul etmek zorunda değilsiniz. Sayfanın altındaki “Çerez Tercihleri” bağlantısıyla seçiminizi dilediğiniz zaman değiştirebilirsiniz." },
    ],
  },
  {
    slug: "cerez-politikasi",
    title: "Çerez Politikası",
    intro:
      "Bu politika, sitede kullanılan zorunlu teknolojiler ile izninize bağlı analitik ve reklam teknolojilerini açıklar.",
    sections: [
      { h: "Çerez nedir?", p: "Çerezler, ziyaret ettiğiniz sitelerin cihazınıza kaydettiği küçük metin dosyalarıdır." },
      { h: "Zorunlu teknolojiler", p: "Sitenin güvenli ve düzgün çalışması ile çerez seçiminizin cihazınızda saklanması için gereklidir. Çerez tercihi tarayıcınızın yerel depolama alanında “hamle-cookie-consent-v1” anahtarıyla saklanır ve üçüncü taraflara gönderilmez." },
      { h: "Analitik", p: "CMS ayarlarında etkinleştirilmişse Google Analytics etiketi sayfayla birlikte yüklenir; ancak Google İzin Modu (Consent Mode) üzerinden izin durumunuz etikete iletilir. Analitik izni vermediğiniz sürece çerez veya benzeri tanımlayıcı kullanılmaz; yalnızca kimliksiz, toplu istatistik sinyalleri iletilebilir. İzin verdiğinizde site kullanımı çerezlerle ölçülür; oluşturulan tanımlayıcıların adı ve süresi Google yapılandırmasına göre değişebilir." },
      { h: "Reklam ve ölçüm", p: "Google Ads etiketi (AW-11280098753) sayfayla birlikte yüklenir; ancak reklam ve ölçüm izni vermediğiniz sürece çerez veya benzeri tanımlayıcı kullanılmaz, yalnızca kimliksiz dönüşüm sinyalleri iletilebilir. İzin verdiğinizde dönüşüm ve reklam performansı ölçümü çerezlerle yapılır. Bu kullanım Google tarafından birinci veya üçüncü taraf tanımlayıcıların oluşturulmasına ve verilerin yurt dışında işlenmesine yol açabilir." },
      { h: "Google Tag Manager", p: "CMS üzerinden bir Google Tag Manager kapsayıcısı tanımlanmışsa, kapsayıcı sayfayla birlikte yüklenir ve Google İzin Modu üzerinden izin durumunuz kapsayıcıya iletilir. Kapsayıcı kendi başına çerez değildir; yüklediği etiketler, ilgili kategoriye (analitik veya reklam) izin vermeniz hâlinde çerez kullanabilir." },
      { h: "Tercih ve rızanın geri alınması", p: "İsteğe bağlı kategoriler varsayılan olarak kapalıdır. İlk ziyaretinizde tümünü kabul edebilir, reddedebilir veya ayrı ayrı seçebilirsiniz. Seçiminizi sayfanın altındaki “Çerez Tercihleri” bağlantısından dilediğiniz zaman değiştirebilirsiniz. Tarayıcı ayarlarınızdan mevcut çerezleri ayrıca silebilirsiniz." },
    ],
  },
];
