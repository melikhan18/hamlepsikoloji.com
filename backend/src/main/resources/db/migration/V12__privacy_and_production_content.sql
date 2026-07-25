-- Eski kurulumlarda kalan örnek iletişim bilgilerini yayından kaldır.
update site_settings
set
  phone_display = case when phone_display = '+90 (212) 000 00 00' then null else phone_display end,
  phone = case when phone = '+902120000000' then null else phone end,
  whatsapp = case when whatsapp = '905000000000' then null else whatsapp end,
  address_street = case when lower(address_street) like '%örnek cad%' then null else address_street end,
  maps_query = case when lower(maps_query) in ('hamle psikoloji kadıköy i̇stanbul', 'hamle psikoloji üsküdar i̇stanbul') then null else maps_query end,
  updated_at = now()
where id = 1;

-- Yalnızca önceki demo içeriğine ait olduğu kesin olan uzman kayıtlarını kaldır.
delete from experts
where lower(name) in ('uzman i̇sim 1', 'uzman i̇sim 2', 'uzman isim 1', 'uzman isim 2')
   or education::text ilike '%[PLACEHOLDER]%'
   or bio::text ilike '%örnek biyografi%';

update legal_docs
set
  intro = 'Bu metin, web sitesi ve iletişim kanalları üzerinden paylaşılan kişisel verilerin 6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında nasıl işlendiği hakkında bilgi verir.',
  sections = jsonb_build_array(
    jsonb_build_object('h', 'Veri sorumlusu', 'p', 'Kişisel verileriniz, Hamle Psikoloji Danışmanlık Merkezi tarafından veri sorumlusu sıfatıyla işlenir. Güncel iletişim bilgileri bu sayfanın sonunda yer alır.'),
    jsonb_build_object('h', 'İşlenen veri kategorileri', 'p', 'İletişim formu veya diğer iletişim kanalları kullanıldığında kimlik, iletişim, talep/randevu, işlem güvenliği bilgileri ve sizin ayrıca paylaşmayı seçtiğiniz mesaj içeriği işlenebilir. İletişim formuna sağlık geçmişi veya ayrıntılı özel nitelikli kişisel veri yazmamanızı öneririz.'),
    jsonb_build_object('h', 'İşleme amaçları', 'p', 'Veriler; talebinizi almak ve yanıtlamak, uygun iletişim ve randevu sürecini yürütmek, hizmet güvenliğini sağlamak, hukuki yükümlülükleri yerine getirmek ve olası uyuşmazlıklarda hakları korumak amaçlarıyla sınırlı olarak işlenir.'),
    jsonb_build_object('h', 'Toplama yöntemi ve hukuki sebepler', 'p', 'Veriler web formu, telefon, e-posta veya WhatsApp üzerinden elektronik olarak toplanır. İşleme faaliyeti, KVKK madde 5/2 kapsamındaki sözleşmenin kurulması veya ifasıyla doğrudan ilgili olma, veri sorumlusunun hukuki yükümlülüğü ve temel haklarınıza zarar vermemek kaydıyla meşru menfaat sebeplerine dayanabilir. Açık rıza gereken ayrı bir faaliyet varsa rızanız ayrıca istenir.'),
    jsonb_build_object('h', 'Aktarım', 'p', 'Veriler; barındırma, iletişim, güvenlik ve teknik destek hizmeti sağlayan tedarikçilere yalnızca hizmetin gerektirdiği ölçüde, yetkili kamu kurumlarına ise hukuki zorunluluk bulunması hâlinde aktarılabilir. WhatsApp veya Google hizmetlerini tercih etmeniz, ilgili sağlayıcının kendi koşulları kapsamında yurt dışında veri işlemesine yol açabilir.'),
    jsonb_build_object('h', 'Saklama ve güvenlik', 'p', 'Veriler yalnızca işleme amacı ve ilgili mevzuatın gerektirdiği süre boyunca saklanır; süre sonunda silinir, yok edilir veya anonim hâle getirilir. Yetkisiz erişim, kayıp ve kötüye kullanıma karşı uygun idari ve teknik tedbirler uygulanır.'),
    jsonb_build_object('h', 'Haklarınız ve başvuru', 'p', 'KVKK madde 11 kapsamındaki haklarınıza ilişkin başvurunuzu, kimliğinizi doğrulamaya yarayan bilgiler ve talebinizle birlikte sayfanın sonunda yer alan iletişim kanallarından iletebilirsiniz.')
  ),
  updated_at = now()
where slug = 'kvkk';

update legal_docs
set
  intro = 'Bu politika, Hamle Psikoloji web sitesini ve iletişim kanallarını kullandığınızda gizliliğinizi nasıl koruduğumuzu açıklar.',
  sections = jsonb_build_array(
    jsonb_build_object('h', 'Toplanan bilgiler', 'p', 'Doğrudan paylaştığınız iletişim ve talep bilgileri ile güvenlik kayıtları işlenebilir. İsteğe bağlı analitik ve reklam teknolojileri, yalnızca çerez tercih merkezinde izin vermeniz hâlinde etkinleştirilir.'),
    jsonb_build_object('h', 'Kullanım amaçları', 'p', 'Bilgiler talepleri yanıtlamak, randevu iletişimini yürütmek, site güvenliğini sağlamak, kullanıcı deneyimini geliştirmek ve izin verilmişse reklam performansını ölçmek için kullanılır.'),
    jsonb_build_object('h', 'Üçüncü taraf hizmetleri', 'p', 'Site altyapısı, e-posta, WhatsApp ve izin vermeniz hâlinde Google Analytics, Google Ads veya Google Tag Manager gibi hizmetlerden yararlanılabilir. Bu sağlayıcıların işlediği veriler kendi gizlilik koşullarına da tabidir.'),
    jsonb_build_object('h', 'Görüşme gizliliği', 'p', 'Psikolojik danışmanlık görüşmelerinin içeriği mesleki etik, gizlilik yükümlülükleri ve uygulanabilir mevzuat çerçevesinde korunur. Kanuni bildirim yükümlülükleri ve ciddi güvenlik riskleri gibi hukuken zorunlu istisnalar saklıdır.'),
    jsonb_build_object('h', 'Tercihleriniz', 'p', 'İsteğe bağlı çerezleri kabul etmek zorunda değilsiniz. Sayfanın altındaki “Çerez Tercihleri” bağlantısıyla seçiminizi dilediğiniz zaman değiştirebilirsiniz.')
  ),
  updated_at = now()
where slug = 'gizlilik';

update legal_docs
set
  intro = 'Bu politika, sitede kullanılan zorunlu teknolojiler ile izninize bağlı analitik ve reklam teknolojilerini açıklar.',
  sections = jsonb_build_array(
    jsonb_build_object('h', 'Çerez nedir?', 'p', 'Çerezler, ziyaret ettiğiniz sitelerin cihazınıza kaydettiği küçük metin dosyalarıdır.'),
    jsonb_build_object('h', 'Zorunlu teknolojiler', 'p', 'Sitenin güvenli ve düzgün çalışması ile çerez seçiminizin cihazınızda saklanması için gereklidir. Çerez tercihi tarayıcınızın yerel depolama alanında “hamle-cookie-consent-v1” anahtarıyla saklanır ve üçüncü taraflara gönderilmez.'),
    jsonb_build_object('h', 'Analitik', 'p', 'CMS ayarlarında etkinleştirilmişse Google Analytics, yalnızca analitik izni verdiğinizde site kullanımını ölçmek amacıyla yüklenir. Google tarafından oluşturulabilecek tanımlayıcıların adı ve süresi Google yapılandırmasına göre değişebilir.'),
    jsonb_build_object('h', 'Reklam ve ölçüm', 'p', 'Google Ads etiketi (AW-11280098753), yalnızca reklam ve ölçüm izni verdiğinizde dönüşüm ve reklam performansı ölçümü amacıyla yüklenir. Bu kullanım Google tarafından tanımlayıcıların oluşturulmasına ve verilerin yurt dışında işlenmesine yol açabilir.'),
    jsonb_build_object('h', 'Google Tag Manager', 'p', 'CMS üzerinden bir Google Tag Manager kapsayıcısı tanımlanmışsa, kapsayıcı yalnızca analitik ile reklam kategorilerinin ikisine de izin verdiğinizde yüklenir. Kapsayıcı kendi başına çerez değildir; yüklediği etiketler çerez kullanabilir.'),
    jsonb_build_object('h', 'Tercih ve rızanın geri alınması', 'p', 'İsteğe bağlı kategoriler varsayılan olarak kapalıdır. İlk ziyaretinizde tümünü kabul edebilir, reddedebilir veya ayrı ayrı seçebilirsiniz. Seçiminizi sayfanın altındaki “Çerez Tercihleri” bağlantısından dilediğiniz zaman değiştirebilirsiniz.')
  ),
  updated_at = now()
where slug = 'cerez-politikasi';
