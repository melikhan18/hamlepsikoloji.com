import type { Metadata } from "next";
import { Container, Button } from "@/components/ui";

export const metadata: Metadata = {
  title: "Sayfa bulunamadı",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <p className="font-serif text-6xl text-teal">404</p>
      <h1 className="mt-4 text-2xl font-semibold text-ink sm:text-3xl">Sayfa bulunamadı</h1>
      <p className="mt-3 max-w-md text-muted">
        Aradığınız sayfa taşınmış veya kaldırılmış olabilir. Ana sayfadan devam edebilirsiniz.
      </p>
      <div className="mt-8">
        <Button href="/">Ana sayfaya dön</Button>
      </div>
    </Container>
  );
}
