import { useCallback, useEffect } from "react";

export function useDocumentHotkeys(handlers: { [key: string]: () => void }) {
  const handler = useCallback(
    ({ key }: KeyboardEvent) => handlers[key]?.(),
    [handlers]
  );
  useEffect(() => {
    document.addEventListener("keydown", handler);
    return () => {
      document.removeEventListener("keydown", handler);
    };
  }, [handler]);
}
