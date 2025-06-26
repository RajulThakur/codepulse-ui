import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import CodeFeatureBlock from "./CodeFeatureBlock";

function MarkdownRenderer({ message }: { message: string }) {
  return (
    <Markdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ ...props }) => (
          <h1 className="text-primary my-0.5 text-2xl font-bold" {...props} />
        ),
        ul: ({ ...props }) => <ul className="flex flex-col gap-1" {...props} />,
        ol: ({ ...props }) => <ol className="flex flex-col gap-1" {...props} />,
        hr: ({ ...props }) => <hr className="border-border" {...props} />,
        h2: ({ ...props }) => (
          <h2
            className="text-secondary my-0.5 text-xl font-semibold"
            {...props}
          />
        ),
        code: ({ className = "text-text-muted bg-bg", children, ...props }) => {
          const match = /language-(\w+)/.exec(className || "");
          const lang = match?.[1] || "text";

          return (
            <span className="border-border-muted bg-bg text-text-muted my-2 block overflow-hidden rounded-md border text-sm shadow-sm">
              <CodeFeatureBlock lang={lang} code={children} />
              <pre className="m-0 overflow-x-auto p-2 text-sm break-words whitespace-pre-wrap">
                <code className={className} {...props}>
                  {children}
                </code>
              </pre>
            </span>
          );
        },
        a: ({ ...props }) => (
          <a
            className="text-blue-500 underline"
            target="_blank"
            rel="noopener noreferrer"
            {...props}
          />
        ),
        li: ({ ...props }) => <li className="ml-4 list-disc" {...props} />,
        blockquote: ({ ...props }) => (
          <blockquote
            className="text-muted-foreground border-muted border-l-4 pl-2 italic"
            {...props}
          />
        ),
        table: ({ ...props }) => (
          <table
            className="border-border my-0.5 table-auto border-collapse border"
            {...props}
          />
        ),
        th: ({ ...props }) => (
          <th
            className="border-border bg-bg-light text-text border px-2 py-1"
            {...props}
          />
        ),
        td: ({ ...props }) => (
          <td className="border-border-muted border px-2 py-1" {...props} />
        ),
      }}
    >
      {message}
    </Markdown>
  );
}

export default MarkdownRenderer;
