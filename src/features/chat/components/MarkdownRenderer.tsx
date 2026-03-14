import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { Components } from 'react-markdown';
import CodeBlock from './CodeBlock';

interface MarkdownRendererProps {
  content: string;
}

const components: Components = {
  h1: ({ children }) => (
    <h1 className="text-2xl font-semibold mt-6 mb-3 text-slate-900 dark:text-slate-100">{children}</h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-xl font-semibold mt-5 mb-2 text-slate-900 dark:text-slate-100">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-lg font-semibold mt-4 mb-2 text-slate-900 dark:text-slate-100">{children}</h3>
  ),
  p: ({ children }) => (
    <p className="text-[15px] leading-relaxed mb-3 text-slate-800 dark:text-slate-200">{children}</p>
  ),
  ul: ({ children }) => <ul className="list-disc pl-6 mb-3 space-y-1">{children}</ul>,
  ol: ({ children }) => <ol className="list-decimal pl-6 mb-3 space-y-1">{children}</ol>,
  li: ({ children }) => (
    <li className="text-[15px] leading-relaxed text-slate-800 dark:text-slate-200">{children}</li>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-slate-900 dark:text-slate-100">{children}</strong>
  ),
  em: ({ children }) => <em className="italic">{children}</em>,
  a: ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 underline underline-offset-2"
    >
      {children}
    </a>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-2 border-teal-300 dark:border-teal-600 pl-4 italic text-slate-600 dark:text-slate-400 my-3">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="border-t border-slate-200 dark:border-slate-700 my-6" />,
  code: ({ className, children, ...props }) => {
    const match = /language-(\w+)/.exec(className || '');
    const codeString = String(children).replace(/\n$/, '');

    if (match) {
      return <CodeBlock language={match[1]} code={codeString} />;
    }

    return (
      <code
        className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 px-1.5 py-0.5 rounded text-sm font-mono"
        {...props}
      >
        {children}
      </code>
    );
  },
  pre: ({ children }) => <>{children}</>,
  table: ({ children }) => (
    <div className="overflow-x-auto mb-4">
      <table className="w-full border-collapse">{children}</table>
    </div>
  ),
  th: ({ children }) => (
    <th className="text-left text-sm font-semibold text-slate-700 dark:text-slate-300 border-b border-slate-300 dark:border-slate-600 px-3 py-2">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="text-sm text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700 px-3 py-2">
      {children}
    </td>
  ),
};

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
      {content}
    </ReactMarkdown>
  );
}
