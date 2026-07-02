import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = site.name;

export default function Og() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #352a44 0%, #271d33 100%)",
          color: "#faf2ea",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 999,
              background: "#ffbc7d",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#352a44",
              fontSize: 34,
              fontWeight: 700,
            }}
          >
            H
          </div>
          <div style={{ fontSize: 30, letterSpacing: 4, opacity: 0.85 }}>HAMLE PSİKOLOJİ</div>
        </div>
        <div style={{ fontSize: 64, fontWeight: 700, marginTop: 40, lineHeight: 1.1 }}>
          İyi oluşa doğru ilk hamle
        </div>
        <div style={{ fontSize: 30, marginTop: 24, color: "#e9fff4", maxWidth: 900 }}>
          İstanbul · Bireysel, Çift &amp; Aile, Çocuk &amp; Ergen ve Online Terapi
        </div>
      </div>
    ),
    { ...size }
  );
}
