import { Trash } from "lucide-react";
import { useState } from "react";
import PostVsCode from "../../utility/vscode/PostVsCode";

const LLM_OPTIONS = [
  { label: "Gemini", value: "Gemini" },
  { label: "GPT-4", value: "GPT-4" },
  { label: "Claude 3", value: "Claude-3" },
  { label: "Llama 3", value: "Llama-3" },
];

function SelectedLLM() {
  const [selectedModel, setSelectedModel] = useState(LLM_OPTIONS[0].value);
  function handleClear(){
    PostVsCode({type:"clear-chats",data:{}})
  }
  return (
    <div className="flex gap-1">
      <select
        value={selectedModel}
        onChange={(e) => setSelectedModel(e.target.value)}
        className="bg-bg-light text-text rounded-lg py-1 text-xs shadow focus:outline-none"
      >
        {LLM_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <div className="flex items-center gap-0.5 text-sm cursor-pointer" onClick={handleClear}><Trash size={14}/> Clear</div>
    </div>
  );
}

export default SelectedLLM;
