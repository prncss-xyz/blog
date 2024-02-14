import { useCallback, useMemo } from "react";
import { state, useMainStore } from "../components/mainStore";

const indexO = state.prop("slide");

export function useSetFocus() {
  const index = useMainStore.get(indexO);
  const refO = useMemo(
    () => state.prop("slides").at(index).prop("ref"),
    [index]
  );
  const ref = useMainStore.preview(refO);
  return useCallback(() => {
    if (!ref?.current) return;
    ref.current.scrollIntoView({ behavior: "smooth" });
  }, [ref]);
}
