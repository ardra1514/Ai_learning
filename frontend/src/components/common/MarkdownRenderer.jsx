import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const MarkdownRenderer = ({ content }) => {
  return (
    <div className="prose prose-slate max-w-none text-slate-700 leading-8">

      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ node, ...props }) => (
            <h1
              className="text-3xl font-bold text-[var(--secondary-dark)] mb-6"
              {...props}
            />
          ),

          h2: ({ node, ...props }) => (
            <h2
              className="text-2xl font-semibold text-[var(--teal-dark)] mt-8 mb-4"
              {...props}
            />
          ),

          h3: ({ node, ...props }) => (
            <h3
              className="text-xl font-semibold text-[var(--slate-blue)] mt-6 mb-3"
              {...props}
            />
          ),

          h4: ({ node, ...props }) => (
            <h4
              className="text-lg font-semibold text-slate-800 mt-5 mb-2"
              {...props}
            />
          ),

          p: ({ node, ...props }) => (
            <p
              className="text-slate-600 leading-8 mb-5"
              {...props}
            />
          ),

          a: ({ node, ...props }) => (
            <a
              className="text-[var(--teal)] font-medium hover:underline"
              target="_blank"
              rel="noreferrer"
              {...props}
            />
          ),

          ul: ({ node, ...props }) => (
            <ul
              className="list-disc ml-6 space-y-2 mb-5"
              {...props}
            />
          ),

          ol: ({ node, ...props }) => (
            <ol
              className="list-decimal ml-6 space-y-2 mb-5"
              {...props}
            />
          ),

          li: ({ node, ...props }) => (
            <li
              className="text-slate-600"
              {...props}
            />
          ),

          strong: ({ node, ...props }) => (
            <strong
              className="font-bold text-[var(--secondary-dark)]"
              {...props}
            />
          ),

          em: ({ node, ...props }) => (
            <em
              className="italic text-[var(--teal-dark)]"
              {...props}
            />
          ),

          blockquote: ({ node, ...props }) => (
            <blockquote
              className="border-l-4 border-[var(--teal)] bg-[var(--light-blue)]/10 rounded-r-xl px-5 py-3 italic text-slate-700 my-6"
              {...props}
            />
          ),

          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");

            return !inline && match ? (
              <SyntaxHighlighter
                style={oneDark}
                language={match[1]}
                PreTag="div"
                customStyle={{
                  borderRadius: "16px",
                  padding: "20px",
                  fontSize: "14px",
                  marginTop: "16px",
                  marginBottom: "16px",
                }}
                {...props}
              >
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            ) : (
              <code
                className="bg-slate-100 text-[var(--teal-dark)] px-1.5 py-1 rounded font-mono text-sm"
                {...props}
              >
                {children}
              </code>
            );
          },

          pre: ({ node, ...props }) => (
            <pre
              className="overflow-x-auto rounded-2xl my-6"
              {...props}
            />
          ),
        }}
      >
        {content}
      </ReactMarkdown>

    </div>
  );
};

export default MarkdownRenderer;