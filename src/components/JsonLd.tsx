type Props = {
  data: Record<string, unknown> | Record<string, unknown>[];
  id?: string;
};

export default function JsonLd({ data, id }: Props) {
  return (
    <script
      type="application/ld+json"
      id={id}
      // schema.org JSON-LD — escaping handled by JSON.stringify
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
