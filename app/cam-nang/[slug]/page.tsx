import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { checklists, getSituation } from "@/lib/checklists";
import ChecklistInteractive from "@/components/ChecklistInteractive";
import SiteFooter from "@/components/SiteFooter";
import AuthNav from "@/components/AuthNav";

export function generateStaticParams() {
  return checklists.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const situation = getSituation(slug);
  if (!situation) return { title: "Không tìm thấy — Cẩm Nang Hàn" };
  return {
    title: `${situation.title} — Cẩm Nang Hàn`,
    description: situation.short,
  };
}

export default async function ChecklistDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const situation = getSituation(slug);
  if (!situation) notFound();

  return (
    <main>
      <div className="mx-auto max-w-2xl px-5">
        <header className="pt-10 pb-4 flex items-center justify-between gap-3">
          <Link
            href="/cam-nang"
            className="text-sm font-medium text-navy underline underline-offset-2"
          >
            ← Tất cả tình huống
          </Link>
          <AuthNav />
        </header>

        <section className="py-6">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-4xl" aria-hidden>
              {situation.emoji}
            </span>
            <h1 className="text-2xl font-extrabold text-ink">
              {situation.title}
            </h1>
          </div>
          <p className="text-sm text-ink/70 leading-relaxed">
            {situation.short}
          </p>
        </section>

        <section className="pb-10">
          <ChecklistInteractive situation={situation} />
        </section>
      </div>
      <SiteFooter />
    </main>
  );
}
