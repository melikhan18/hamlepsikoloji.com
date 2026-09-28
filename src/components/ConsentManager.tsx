"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const STORAGE_KEY = "hamle-cookie-consent-v1";
export const OPEN_COOKIE_SETTINGS_EVENT = "hamle:open-cookie-settings";

type Consent = {
  analytics: boolean;
  marketing: boolean;
};

type Props = {
  googleAdsId: string;
  ga4Id?: string;
  gtmId?: string;
};

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function readConsent(): Consent | null {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    if (!value) return null;
    const parsed = JSON.parse(value) as Partial<Consent>;
    if (typeof parsed.analytics !== "boolean" || typeof parsed.marketing !== "boolean") return null;
    return { analytics: parsed.analytics, marketing: parsed.marketing };
  } catch {
    return null;
  }
}

function loadScript(id: string, src: string) {
  if (document.getElementById(id)) return;
  const script = document.createElement("script");
  script.id = id;
  script.async = true;
  script.src = src;
  document.head.appendChild(script);
}

function ensureGtag() {
  window.dataLayer = window.dataLayer || [];
  if (!window.gtag) {
    // gtag.js, dataLayer'a dizi değil `arguments` nesnesi bekler — dizi push edilirse
    // komutlar sessizce yok sayılır.
    window.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer.push(arguments);
    } as (...args: unknown[]) => void;
  }
}

// Gelişmiş Consent Mode: etiketler her ziyaretçide sayfayla birlikte yüklenir,
// izin verilene dek "reddedildi" varsayılanıyla ÇEREZSİZ sinyal gönderir
// (Google bu sinyallerle dönüşüm modellemesi yapar). Çerez/kimlik kullanımı
// ancak ilgili kategoriye izin verilince başlar.
function initGoogleTags({ googleAdsId, ga4Id, gtmId }: Props) {
  ensureGtag();
  window.gtag!("consent", "default", {
    analytics_storage: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    // Kayıtlı izin varsa hemen ardından gelen "update"i beklemesi için kısa pencere
    wait_for_update: 500,
  });
  window.gtag!("js", new Date());
  const tagId = googleAdsId || ga4Id;
  if (tagId) loadScript("google-tag", `https://www.googletagmanager.com/gtag/js?id=${tagId}`);
  if (ga4Id) window.gtag!("config", ga4Id);
  window.gtag!("config", googleAdsId);
  if (gtmId && !document.getElementById("google-tag-manager")) {
    window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
    loadScript("google-tag-manager", `https://www.googletagmanager.com/gtm.js?id=${gtmId}`);
  }
}

function applyGoogleConsent(consent: Consent) {
  ensureGtag();
  window.gtag!("consent", "update", {
    analytics_storage: consent.analytics ? "granted" : "denied",
    ad_storage: consent.marketing ? "granted" : "denied",
    ad_user_data: consent.marketing ? "granted" : "denied",
    ad_personalization: consent.marketing ? "granted" : "denied",
  });
}

export function ConsentManager(props: Props) {
  const { googleAdsId, ga4Id, gtmId } = props;
  const [saved, setSaved] = useState<Consent | null>(null);
  const [ready, setReady] = useState(false);
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  const [draft, setDraft] = useState<Consent>({ analytics: false, marketing: false });

  useEffect(() => {
    initGoogleTags({ googleAdsId, ga4Id, gtmId });
    const initial = readConsent();
    if (initial) {
      applyGoogleConsent(initial);
    }
    queueMicrotask(() => {
      setSaved(initial);
      if (initial) setDraft(initial);
      setReady(true);
    });

    const open = () => {
      const current = readConsent() ?? { analytics: false, marketing: false };
      setDraft(current);
      setPreferencesOpen(true);
    };
    window.addEventListener(OPEN_COOKIE_SETTINGS_EVENT, open);
    return () => window.removeEventListener(OPEN_COOKIE_SETTINGS_EVENT, open);
  }, [ga4Id, googleAdsId, gtmId]);

  const save = (consent: Consent) => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
    setSaved(consent);
    setDraft(consent);
    setPreferencesOpen(false);
    applyGoogleConsent(consent);
  };

  if (!ready) return null;

  return (
    <>
      {!saved && !preferencesOpen && (
        <section
          role="dialog"
          aria-label="Çerez tercihleri"
          aria-live="polite"
          className="fixed inset-x-3 bottom-3 z-[100] mx-auto max-w-4xl rounded-3xl border border-line bg-white p-5 shadow-2xl sm:bottom-5 sm:p-6"
        >
          <h2 className="text-xl text-ink">Gizlilik tercihleriniz</h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted">
            Siteyi çalıştırmak için zorunlu teknolojileri kullanıyoruz. Analitik ve reklam
            çerezleri yalnızca izin verirseniz kullanılır. Ayrıntılar için{" "}
            <Link href="/cerez-politikasi" className="font-semibold text-teal underline">
              Çerez Politikası
            </Link>
            ’nı inceleyebilirsiniz.
          </p>
          <div className="mt-5 grid gap-2 sm:grid-cols-3">
            <button type="button" onClick={() => save({ analytics: true, marketing: true })} className="rounded-full bg-teal px-5 py-3 text-sm font-semibold text-white hover:bg-teal-dark">
              Tümünü kabul et
            </button>
            <button type="button" onClick={() => save({ analytics: false, marketing: false })} className="rounded-full border border-teal px-5 py-3 text-sm font-semibold text-teal hover:bg-teal-soft">
              Tümünü reddet
            </button>
            <button type="button" onClick={() => setPreferencesOpen(true)} className="rounded-full border border-line px-5 py-3 text-sm font-semibold text-ink hover:bg-cream">
              Tercihleri yönet
            </button>
          </div>
        </section>
      )}

      {preferencesOpen && (
        <div className="fixed inset-0 z-[110] flex items-end justify-center bg-ink/55 p-3 sm:items-center" role="presentation">
          <section role="dialog" aria-modal="true" aria-labelledby="cookie-settings-title" className="w-full max-w-xl rounded-3xl bg-white p-6 shadow-2xl sm:p-8">
            <h2 id="cookie-settings-title" className="text-2xl text-ink">Çerez tercihleri</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Seçiminizi istediğiniz zaman sayfanın altındaki “Çerez Tercihleri” bağlantısından değiştirebilirsiniz.
            </p>
            <div className="mt-6 space-y-3">
              <ConsentRow title="Zorunlu" description="Güvenlik, tercih kaydı ve sitenin temel çalışması için gereklidir." checked disabled onChange={() => undefined} />
              <ConsentRow title="Analitik" description="Site kullanımını ölçmemize ve deneyimi geliştirmemize yardımcı olur." checked={draft.analytics} onChange={(analytics) => setDraft((value) => ({ ...value, analytics }))} />
              <ConsentRow title="Reklam ve ölçüm" description="Google Ads dönüşüm ölçümü ve reklam performansı için kullanılır." checked={draft.marketing} onChange={(marketing) => setDraft((value) => ({ ...value, marketing }))} />
            </div>
            <div className="mt-7 grid gap-2 sm:grid-cols-2">
              <button type="button" onClick={() => save(draft)} className="rounded-full bg-teal px-5 py-3 text-sm font-semibold text-white hover:bg-teal-dark">
                Seçimlerimi kaydet
              </button>
              <button type="button" onClick={() => setPreferencesOpen(false)} className="rounded-full border border-line px-5 py-3 text-sm font-semibold text-ink hover:bg-cream">
                Vazgeç
              </button>
            </div>
          </section>
        </div>
      )}
    </>
  );
}

function ConsentRow({ title, description, checked, disabled = false, onChange }: {
  title: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-start justify-between gap-4 rounded-2xl border border-line p-4">
      <span>
        <span className="block text-sm font-semibold text-ink">{title}</span>
        <span className="mt-1 block text-xs leading-relaxed text-muted">{description}</span>
      </span>
      <input
        type="checkbox"
        className="mt-1 h-5 w-5 accent-teal"
        checked={checked}
        disabled={disabled}
        onChange={(event) => onChange(event.target.checked)}
      />
    </label>
  );
}

export function CookiePreferencesButton() {
  return (
    <button
      type="button"
      className="transition-colors hover:text-cream"
      onClick={() => window.dispatchEvent(new Event(OPEN_COOKIE_SETTINGS_EVENT))}
    >
      Çerez Tercihleri
    </button>
  );
}
