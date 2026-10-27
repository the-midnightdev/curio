import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-24 text-center">
      <p className="text-[0.7rem] uppercase tracking-[0.28em] text-violet">
        Missing folio
      </p>
      <h1 className="mt-4 font-display text-5xl">This reading is not on the shelf.</h1>
      <p className="mt-4 text-ink/70">
        It may have been renamed, or it has not been written yet.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex rounded-full bg-violet px-5 py-2.5 text-sm text-white"
      >
        Return to Curio
      </Link>
    </div>
  );
}
