import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="text-3xl font-semibold text-brand-text">Page not found</h1>
      <p className="mt-2 text-sm text-brand-textSecondary">The page you requested could not be found.</p>
      <Link href="/" className="mt-4 inline-flex text-sm text-brand-primary">
        Back to home
      </Link>
    </div>
  );
}
