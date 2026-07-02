import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

// On-demand revalidation webhook'u.
// Backend (admin panel), bir yazı kaydedip/silince buraya POST atar; blog ile
// ilgili tüm sayfalar (ana sayfa, blog liste/detay, ilgili yazılar, sitemap)
// ANINDA tazelenir. Restart/rebuild gerekmez.
//
// Kullanım: POST /api/revalidate?secret=XXX
// veya header: x-revalidate-secret: XXX

export const dynamic = "force-dynamic";

function isAuthorized(req: NextRequest): boolean {
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret) return false; // secret tanımlı değilse güvenli tarafta kal
  const provided =
    req.nextUrl.searchParams.get("secret") ||
    req.headers.get("x-revalidate-secret");
  return provided === secret;
}

export async function POST(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ revalidated: false, message: "Yetkisiz" }, { status: 401 });
  }

  // Kök layout seviyesinde tazele → tüm sayfalar (içerik + Header/Footer/ayarlar).
  revalidatePath("/", "layout");
  revalidatePath("/sitemap.xml");

  return NextResponse.json({ revalidated: true, scope: "layout" });
}
