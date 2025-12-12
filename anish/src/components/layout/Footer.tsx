import { siteConfig } from "@/lib/site.config";

export function Footer() {
  return (
    <footer className="border-t border-[color:var(--border)]">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-10 text-sm text-[color:var(--text-2)] sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p>
          © {new Date().getFullYear()} {siteConfig.name}. v0
        </p>
        <div className="flex flex-wrap gap-x-4 gap-y-2">
          <a className="hover:text-[color:var(--text-0)]" href={siteConfig.sameAs.github}>
            GitHub
          </a>
          <a
            className="hover:text-[color:var(--text-0)]"
            href={siteConfig.sameAs.linkedIn}
          >
            LinkedIn
          </a>
          <a className="hover:text-[color:var(--text-0)]" href={siteConfig.sameAs.email}>
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
