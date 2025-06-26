import MarkdownRenderer from "./MarkdownRenderer";
import SelectedFileRenderer from "./SelectedFileRenderer";
interface ChatBubbleProps {
  message: string;
  isUser?: boolean;
}

function ChatBubble({ message, isUser = false }: ChatBubbleProps) {
  return (
    <div
      className={`mb-1 flex max-w-dvw flex-col gap-2 rounded-md px-2 py-1 text-sm whitespace-pre-line shadow-sm dark:shadow-none ${
        isUser
          ? "bg-primary dark:bg-bg-light border-text-muted dark:border-border text-bg-light dark:text-text ml-auto max-w-[75%] rounded-br-md border"
          : "text-border dark:text-text-muted mr-auto rounded-bl-md"
      }`}
    >
      <MarkdownRenderer message={message} />
      {isUser && <SelectedFileRenderer input={message} />}
    </div>
  );
}

export default ChatBubble;
