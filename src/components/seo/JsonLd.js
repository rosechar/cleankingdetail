/**
 * Renders a schema.org JSON-LD block. `<` is escaped so user- or CMS-supplied
 * strings can never terminate the <script> early.
 */
export default function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, '\\u003c'),
      }}
    />
  );
}
