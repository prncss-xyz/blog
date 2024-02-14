import { state, useMainStore, IState } from "./mainStore";
import { set } from "optics-ts";
import { useDocumentHotkeys } from "./documentHotkeys";
import { useCallback } from "react";
import { useSetFocus } from "./focus";

export function useKeyNav() {
  const setFocus = useSetFocus();
  const toLast = useCallback((s: IState) => {
    const len = s.slides.length;
    const pre = Math.max(0, len - 1);
    return set(state.prop("slide"))(pre)(s);
  }, []);
  useDocumentHotkeys({
    f: setFocus,
    n: useMainStore.modify(state.prop("slide"), (x) => x + 1),
    p: useMainStore.modify(state.prop("slide"), (x) => x - 1),
    0: useMainStore.setValue(state.prop("slide"), 0),
    l: useMainStore.modify(state, toLast),
  });
}
