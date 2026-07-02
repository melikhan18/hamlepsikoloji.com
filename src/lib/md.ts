// Basit, güvenli markdown (CMS içeriği için): **kalın**, *italik*, [bağlantı](url).
// Önce HTML kaçışlanır, sonra biçimlendirme uygulanır.
function esc(s: string): string {
  return (s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export function inlineMd(s: string): string {
  let t = esc(s);
  t = t.replace(/\*\*([^*]+?)\*\*/g, "<strong>$1</strong>");
  t = t.replace(/\*([^*]+?)\*/g, "<em>$1</em>");
  t = t.replace(
    /\[([^\]]+)\]\(([^)\s]+)\)/g,
    '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
  );
  return t;
}

/** Paragraf: satır sonları <br/> olur. */
export function mdToHtml(s: string): string {
  return inlineMd(s).replace(/\n/g, "<br/>");
}
