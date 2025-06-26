import { Copy, Terminal } from "lucide-react";
import PostVsCode from "../utility/vscode/PostVsCode";
import { ReactNode } from "react";
import { languageToExtension } from "../utility/helper/LanguageToExtension";

function CodeFeatureBlock({ lang, code }: { lang: string; code: ReactNode }) {
  function handleApply() {
    PostVsCode({
      type: "apply-code",
      data: {
        content: code,
        filename: "index",
        extension: `.${languageToExtension(lang)}`,
      },
    });
  }
  return (
    <span className="bg-bg-light border-border-muted text-muted flex items-center justify-between border-b px-3 py-1 font-mono text-xs uppercase">
      <span>{lang}</span>
      <span className="flex w-auto items-center gap-2">
        <button
          type="button"
          className="bg-muted hover:bg-muted-foreground flex cursor-copy items-center gap-0.5 rounded px-1 py-0.5 text-xs transition-colors"
        >
          <Copy size={12} /> Copy
        </button>
        <button
          type="button"
          onClick={handleApply}
          className="bg-muted hover:bg-muted-foreground cursor-pointer flex  items-center gap-0.5 rounded px-1 py-0.5 text-xs transition-colors"
        >
          <Terminal size={12} /> Apply
        </button>
      </span>
    </span>
  );
}

export default CodeFeatureBlock;
