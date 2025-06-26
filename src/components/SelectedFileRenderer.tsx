import SelectedFile from "./ui/SelectedFile";

function SelectedFileRenderer({ input }: { input: string }) {
  const matches = Array.from(input.matchAll(/@([\w.-]+)/g));
  if (matches.length === 0) return null;

  return (
    <div className="max-w-auto flex flex-1 justify-start gap-2">
      {matches.map((match, idx) => (
        <SelectedFile key={idx} name={match[1]} />
      ))}
    </div>
  );
}

export default SelectedFileRenderer;
