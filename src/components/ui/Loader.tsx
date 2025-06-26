import { useEffect, useRef, useState } from "react";

export default function Loader() {
  const [dots, setDots] = useState(0);
  const ref = useRef(0);

  useEffect(() => {
    ref.current = setInterval(() => {
      setDots((prev) => (prev + 1) % 5);
    }, 250);
    return () => {
      if (ref.current) clearInterval(ref.current);
    };
  }, []);

  return (
    <div className="text-text-muted flex size-10 items-center gap-0.5 text-sm">
      <span>Loading{".".repeat(dots)}</span>
    </div>
  );
}
