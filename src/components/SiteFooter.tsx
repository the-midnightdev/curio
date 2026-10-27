import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-ink/10">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-8 text-sm text-ink/60 md:flex-row md:items-center md:justify-between md:px-8">
        <p>Curio is a private space to learn something and explain it in your own words.</p>
        <p className="flex gap-4">
          <Link href="/library" className="hover:text-violet">
            Browse the library
          </Link>
          <Link href="/fields" className="hover:text-violet">
            All fields
          </Link>
        </p>
      </div>
    </footer>
  );
}
