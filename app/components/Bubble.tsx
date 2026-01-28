import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

type Message = {
  id: string;
  content: string;
  role: "user" | "assistant";
};

interface BubbleProps {
  message: Message;
}

const Bubble = ({ message }: BubbleProps) => {
  const { content, role } = message;
  
  return (
    <div className={`${role}-bubble`}>
      {role === 'assistant' ? (
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            // Style code blocks
            code: ({ children, className }) => (
              <code className={`markdown-code ${className || ''}`}>
                {children}
              </code>
            ),
            // Style pre blocks
            pre: ({ children }) => (
              <pre className="markdown-pre">
                {children}
              </pre>
            ),
            // Style lists
            ul: ({ children }) => (
              <ul className="markdown-list">
                {children}
              </ul>
            ),
            ol: ({ children }) => (
              <ol className="markdown-list">
                {children}
              </ol>
            ),
            // Style paragraphs
            p: ({ children }) => (
              <p className="markdown-paragraph">
                {children}
              </p>
            ),
            // Style headers
            h1: ({ children }) => <h1 className="markdown-h1">{children}</h1>,
            h2: ({ children }) => <h2 className="markdown-h2">{children}</h2>,
            h3: ({ children }) => <h3 className="markdown-h3">{children}</h3>,
            // Style strong/bold text
            strong: ({ children }) => (
              <strong className="markdown-strong">{children}</strong>
            ),
            // Style emphasis/italic text
            em: ({ children }) => (
              <em className="markdown-em">{children}</em>
            ),
          }}
        >
          {content}
        </ReactMarkdown>
      ) : (
        content
      )}
    </div>
  );
};

export default Bubble;