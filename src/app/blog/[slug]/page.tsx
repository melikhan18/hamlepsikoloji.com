import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Container, Breadcrumbs, Button } from "@/components/ui";
import { PostCard } from "@/components/Cards";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { getPosts, getPost, getExpert } from "@/lib/cms";
import { mdToHtml, inlineMd } from "@/lib/md";
import { site } from "@/lib/site";
import { u } from "@/lib/images";

const dateFmt = new Intl.DateTimeFormat("tr-TR", { day: "numeric", month: "long", year: "numeric" });

function Starburst() {
  const rays = Array.from({ length: 16 }, (_, i) => {
    const a = (i / 16) * Math.PI * 2;
    return { x1: 20 + Math.cos(a) * 5, y1: 20 + Math.sin(a) * 5, x2: 20 + Math.cos(a) * 17, y2: 20 + Math.sin(a) * 17 };
  });
  return (
    <svg viewBox="0 0 40 40" className="h-10 w-10 text-teal" aria-hidden="true">
      {rays.map((r, i) => (
        <line key={i} x1={r.x1} y1={r.y1} x2={r.x2} y2={r.y2} stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      ))}
    </svg>
  );
}

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  const author = post.authorSlug ? await getExpert(post.authorSlug) : undefined;
  const cover = u(post.cover, 1200);
  const metaTitle = post.seoTitle || post.title;
  const metaDesc = post.seoDescription || post.excerpt;
  return {
    title: metaTitle,
    description: metaDesc,
    alternates: { canonical: `/blog/${post.slug}` },
    authors: author ? [{ name: author.name, url: `${site.url}/ekibimiz/${author.slug}` }] : undefined,
    openGraph: {
      type: "article",
      url: `/blog/${post.slug}`,
      title: metaTitle,
      description: metaDesc,
      publishedTime: post.date,
      modifiedTime: post.date,
      authors: author ? [author.name] : undefined,
      ...(cover ? { images: [{ url: cover, alt: post.title }] } : {}),
    },
  };
}

export default async function PostDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();
  const author = await getExpert(post.authorSlug);

  const posts = await getPosts();
  const related = [
    ...posts.filter((p) => p.slug !== post.slug && p.category === post.category),
    ...posts.filter((p) => p.slug !== post.slug && p.category !== post.category),
  ].slice(0, 3);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${site.url}/blog/${post.slug}#article`,
    headline: post.title,
    description: post.excerpt,
    ...(u(post.cover, 1200) ? { image: [u(post.cover, 1200)] } : {}),
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: "tr-TR",
    author: author
      ? { "@type": "Person", name: author.name, url: `${site.url}/ekibimiz/${author.slug}` }
      : { "@type": "Organization", name: site.name },
    publisher: {
      "@type": "Organization",
      name: site.name,
      logo: { "@type": "ImageObject", url: `${site.url}/icon.svg` },
    },
    mainEntityOfPage: `${site.url}/blog/${post.slug}`,
  };

  const shareUrl = `${site.url}/blog/${post.slug}`;
  const eu = encodeURIComponent(shareUrl);
  const et = encodeURIComponent(post.title);
  const shares = [
    {
      label: "X",
      href: `https://twitter.com/intent/tweet?url=${eu}&text=${et}`,
      svg: (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
          <path d="M18.9 2H22l-7.6 8.7L23 22h-6.9l-5.4-7-6.2 7H1.4l8.1-9.3L1 2h7.1l4.9 6.5L18.9 2zm-1.2 18h1.9L7.4 4H5.4l12.3 16z" />
        </svg>
      ),
    },
    {
      label: "WhatsApp",
      href: `https://wa.me/?text=${et}%20${eu}`,
      svg: (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm5.52 11.94c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.51.11-.11.25-.29.37-.43.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.28z" />
        </svg>
      ),
    },
    {
      label: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${eu}`,
      svg: (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
          <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.15 8.44 9.94v-7.03H7.9v-2.9h2.54V9.85c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.44 2.9h-2.34V22c4.78-.79 8.44-4.94 8.44-9.94z" />
        </svg>
      ),
    },
    {
      label: "E-posta",
      href: `mailto:?subject=${et}&body=${eu}`,
      svg: (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="M3 7l9 6 9-6" />
        </svg>
      ),
    },
  ];

  return (
    <>
      <Container className="py-10">
        <Breadcrumbs
          items={[
            { name: "Ana Sayfa", url: "/" },
            { name: "Blog", url: "/blog" },
            { name: post.title, url: `/blog/${post.slug}` },
          ]}
        />
      </Container>

      <article>
        {/* Hero başlık */}
        <header className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <time dateTime={post.date} className="text-[11px] font-semibold uppercase tracking-[0.18em] text-terracotta-dark">
            {dateFmt.format(new Date(post.date)).toLocaleUpperCase("tr-TR")}
          </time>
          <h1 className="mx-auto mt-4 max-w-2xl font-serif text-3xl leading-tight text-ink sm:text-4xl lg:text-[2.7rem]">
            {post.title}
          </h1>
          <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-teal">{post.category}</p>

          {/* Paylaşım */}
          <div className="mt-7 inline-flex items-center gap-1 rounded-pill bg-white px-2 py-2 card-soft">
            {shares.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${s.label}'te paylaş`}
                className="flex h-9 w-9 items-center justify-center rounded-full text-ink transition-colors hover:bg-cream-dark hover:text-teal"
              >
                {s.svg}
              </a>
            ))}
          </div>
        </header>

        {/* Kapak görseli */}
        <div className="mx-auto mt-10 max-w-2xl px-4 sm:px-6">
          <div className="relative mx-auto aspect-[4/5] max-w-md overflow-hidden rounded-3xl [mask-image:linear-gradient(to_top,transparent_0%,#000_24%)] [-webkit-mask-image:linear-gradient(to_top,transparent_0%,#000_24%)]">
            <Image
              src={u(post.cover, 900)}
              alt={post.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 448px"
              className="object-cover"
            />
          </div>
        </div>

        {/* İçerik */}
        <div className="mx-auto max-w-2xl px-4 pb-12 pt-10 sm:px-6">
          <div className="prose-hamle">
            {/* Giriş paragrafı ortalı */}
            {post.content[0]?.p && (
              <p className="text-center" dangerouslySetInnerHTML={{ __html: mdToHtml(post.content[0].p) }} />
            )}
            <div className="my-10 text-center text-sm tracking-[0.6em] text-muted">* * *</div>

            {post.content.slice(1).map((block, i) => (
              <div key={i}>
                {block.h2 && <h2>{block.h2}</h2>}
                {block.p && <p dangerouslySetInnerHTML={{ __html: mdToHtml(block.p) }} />}
                {block.ul && (
                  <ul>
                    {block.ul.map((li) => (
                      <li key={li} dangerouslySetInnerHTML={{ __html: inlineMd(li) }} />
                    ))}
                  </ul>
                )}
                {block.image && (
                  <figure className="my-9">
                    <div className="relative mx-auto aspect-[16/11] w-full overflow-hidden rounded-3xl [mask-image:linear-gradient(to_top,transparent_0%,#000_22%)] [-webkit-mask-image:linear-gradient(to_top,transparent_0%,#000_22%)]">
                      <Image src={u(block.image, 800)} alt={`${post.title} — görsel`} fill sizes="(max-width: 768px) 100vw, 640px" className="object-cover" />
                    </div>
                  </figure>
                )}
              </div>
            ))}
          </div>

          {author && (
            <div className="mt-10 flex items-center gap-2 text-sm text-muted">
              <span>Yazar:</span>
              <Link href={`/ekibimiz/${author.slug}`} className="font-medium text-teal hover:underline">
                {author.name}
              </Link>
            </div>
          )}

          {/* Nane CTA kutusu */}
          <div className="mt-14 rounded-[2rem] bg-teal-soft px-6 py-12 text-center sm:py-14">
            <div className="flex justify-center">
              <Starburst />
            </div>
            <p className="mt-5 text-sm text-teal-dark">İyi hissetmek sandığınızdan daha yakın.</p>
            <h2 className="mx-auto mt-3 max-w-md font-serif text-2xl leading-snug text-ink sm:text-3xl">
              Bugün bizimle iletişime geçin, ön görüşmenizi planlayın.
            </h2>
            <div className="mt-7 flex justify-center">
              <Button href="/iletisim">Ön Görüşme Planla</Button>
            </div>
          </div>
        </div>
      </article>

      {/* İlgili yazılar */}
      {related.length > 0 && (
        <section className="bg-cream">
          <Container className="py-16 sm:py-20">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl text-ink sm:text-4xl">
                İlgili <em>yazılar</em>
              </h2>
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                Belirli zorluklar için özel destek.
              </p>
            </div>
            <div className="mt-14 flex flex-wrap justify-center gap-8">
              {related.map((p) => (
                <div key={p.slug} className="w-full max-w-sm">
                  <PostCard post={p} />
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Ana Sayfa", url: "/" },
            { name: "Blog", url: "/blog" },
            { name: post.title, url: `/blog/${post.slug}` },
          ]),
          articleSchema,
        ]}
      />
    </>
  );
}
