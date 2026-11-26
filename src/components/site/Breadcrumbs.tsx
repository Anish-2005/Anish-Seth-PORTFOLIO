import Link from "next/link";

import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbs } from "@/lib/seo";

export type Crumb = { label: string; href?: string };

/** The trail from the home page, drawn and described to search engines. The last item is the current page. */
export function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  const trail: Crumb[] = [{ label: "Home", href: "/" }, ...crumbs];
  return (
    <>
      <JsonLd data={breadcrumbs(trail.map((c) => ({ name: c.label, path: c.href })))} />
      <nav aria-label="Breadcrumb" className="fade-in">
        <ol className="label flex flex-wrap items-center gap-x-2 gap-y-1">
          {trail.map((c, i) => (
            <li key={c.label} className="flex items-center gap-2">
              {i > 0 ? <span aria-hidden>/</span> : null}
              {c.href ? (
                <Link href={c.href} className="link-u hover:text-fg">
                  {c.label}
                </Link>
              ) : (
                <span aria-current="page" className="text-fg">
                  {c.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
