type JsonLdProps = {
  data: Record<string, unknown>;
};

/** Escapes `<` so JSON-LD can never break out of its script tag. */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
