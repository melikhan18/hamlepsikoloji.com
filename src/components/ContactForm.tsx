"use client";

import { useState } from "react";
import Link from "next/link";
import { services } from "@/data/services";
import { site } from "@/lib/site";

// Form, talebi CMS backend'ine (Spring Boot) kaydeder → panelde "Talepler" ekranında görünür.
const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8081";

export function ContactForm({ phoneDisplay = site.phoneDisplay }: { phoneDisplay?: string }) {
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  // `website` = honeypot (gerçek kullanıcı görmez; bot doldurursa sunucu yok sayar)
  const [form, setForm] = useState({ name: "", phone: "", service: "", message: "", kvkk: false, website: "" });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.kvkk) {
      setError("Devam etmek için KVKK aydınlatma metnini onaylamanız gerekir.");
      return;
    }
    setBusy(true);
    setError("");
    try {
      const res = await fetch(`${API}/api/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          service: form.service,
          message: form.message,
          kvkkConsent: form.kvkk,
          website: form.website,
        }),
      });
      if (!res.ok) throw new Error();
      setSent(true);
    } catch {
      setError("Talebiniz şu an gönderilemedi. Lütfen telefonla ulaşın veya birazdan tekrar deneyin.");
    } finally {
      setBusy(false);
    }
  };

  const field =
    "w-full rounded-2xl border border-line bg-cream/40 px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-teal focus:bg-white";

  if (sent) {
    return (
      <div className="rounded-2xl border border-teal/30 bg-teal-soft p-8 text-center">
        <p className="font-serif text-xl text-teal-dark">Talebiniz alındı 🌿</p>
        <p className="mt-2 text-sm text-muted">
          En kısa sürede size dönüş yapacağız. Acil durumlar için bizi telefonla da
          arayabilirsiniz: {phoneDisplay}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-ink">Ad Soyad</label>
          <input
            id="name" required value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className={field} placeholder="Adınız"
          />
        </div>
        <div>
          <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-ink">Telefon</label>
          <input
            id="phone" required type="tel" value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className={field} placeholder="05XX XXX XX XX"
          />
        </div>
      </div>
      <div>
        <label htmlFor="service" className="mb-1.5 block text-sm font-medium text-ink">İlgilendiğiniz hizmet</label>
        <select
          id="service" value={form.service}
          onChange={(e) => setForm({ ...form, service: e.target.value })}
          className={field}
        >
          <option value="">Seçiniz (opsiyonel)</option>
          {services.map((s) => (
            <option key={s.slug} value={s.title}>{s.title}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-ink">Mesajınız</label>
        <textarea
          id="message" rows={4} value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className={field} placeholder="Kısaca bahsetmek istediğiniz konu"
        />
      </div>

      {/* Honeypot — ekranda görünmez, yalnızca botlar doldurur */}
      <div aria-hidden="true" className="hidden">
        <label htmlFor="website">Web sitesi (boş bırakın)</label>
        <input
          id="website" tabIndex={-1} autoComplete="off" value={form.website}
          onChange={(e) => setForm({ ...form, website: e.target.value })}
        />
      </div>

      <label className="flex items-start gap-2.5 text-xs leading-relaxed text-muted">
        <input
          type="checkbox" checked={form.kvkk}
          onChange={(e) => setForm({ ...form, kvkk: e.target.checked })}
          className="mt-0.5 h-4 w-4 shrink-0 accent-teal"
        />
        <span>
          <Link href="/kvkk" className="text-teal underline underline-offset-2">KVKK Aydınlatma Metni</Link>
          &apos;ni okudum ve kişisel verilerimin işlenmesi hakkında bilgilendirildim.
        </span>
      </label>

      {error && <p className="text-sm font-medium text-terracotta-dark">{error}</p>}

      <div>
        <button
          type="submit" disabled={busy}
          className="rounded-pill bg-teal px-7 py-3.5 text-sm font-semibold text-cream shadow-sm transition-colors hover:bg-teal-dark disabled:opacity-60"
        >
          {busy ? "Gönderiliyor…" : "Randevu Talebi Gönder"}
        </button>
      </div>
    </form>
  );
}
