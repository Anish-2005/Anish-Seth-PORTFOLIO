import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

/** Styled via the `.prose-x` rules in globals.css so notes match the design system. */
export function MarkdownRenderer({ content }: { content: string }) {
  return (
    <div className="prose-x">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  );
}
