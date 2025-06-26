import { SendHorizonal } from "lucide-react";
import { ChangeEvent, KeyboardEvent, useRef, useState } from "react";
import SelectedFileRenderer from "./SelectedFileRenderer";
import SelectedLLM from "./ui/SelectedLLM";

export default function Input({ onSend }: { onSend: (msg: string) => void }) {
  const [input, setInput] = useState("");
  const [isActive, setIsActive] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    if (input.trim()) {
      onSend(input);
      setInput("");
      if (textareaRef.current) {
        textareaRef.current.style.height = "40px";
      }
    }
    setIsActive(false);
  };

  function handleChange(e: ChangeEvent<HTMLTextAreaElement>) {
    setInput(e.target.value);

    // Auto-resize logic: expand to 2 lines, then scroll
    const textarea = e.target;
    textarea.style.height = "40px"; // reset
    const scrollHeight = textarea.scrollHeight;
    const maxHeight = 80; // ~2 lines (40px per line)
    if (scrollHeight > maxHeight) {
      textarea.style.height = maxHeight + "px";
      textarea.style.overflowY = "auto";
    } else {
      textarea.style.height = scrollHeight + "px";
      textarea.style.overflowY = "hidden";
    }

    if (e.target.value === "" || e.target.value === " ") {
      setIsActive(false);
      // Reset textarea height if input is empty
      textarea.style.height = "40px";
      textarea.style.overflowY = "hidden";
    }
  }

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
    if (e.key === "@") setIsActive(true);
  }

  return (
    <div className="dark:text-text text-bg-dark flex flex-col gap-2 rounded-xl py-2 text-sm">
      <div className="border-border-muted bg-bg-light flex items-center justify-center gap-2 rounded-xl border px-2">
        <textarea                 
          ref={textareaRef}
          value={input}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          className="max-h-20 min-h-[40px] flex-1 resize-none overflow-y-auto rounded-lg py-2 transition-all !outline-none !focus:outline-none"
          rows={1}
          style={{
            height: "40px",
            overflowY: "auto",
            whiteSpace: "pre-wrap",
          }}
        />
        <button
          onClick={handleSend}
          title="Send"
          className="flex cursor-pointer items-center justify-center rounded-lg transition-colors duration-200"
        >
          <SendHorizonal size={16} />
        </button>
      </div>
      <div className="mb-1 flex items-center justify-between gap-2">
        <SelectedLLM />
        {isActive && <SelectedFileRenderer input={input} />}
      </div>
    </div>
  );
}
