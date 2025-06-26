import { File } from "lucide-react";

function SelectedFile({ name }: { name: string }) {
  return (
    <div className="border-border-muted flex text-xs items-center gap-1 ">
      <File size={12} className="stroke-bg-dark dark:stroke-primary" />
      {name}
    </div>
  );
}

export default SelectedFile;
