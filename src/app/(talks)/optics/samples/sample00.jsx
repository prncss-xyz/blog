import { useCallback, useState } from "react";
import { Button } from "@/components/layout/button";

const init = {
  lolly: 3,
};

export function Component({ target }) {
  const [state, setState] = useState(init);
  const disabled = state.lolly === 3;
  const clickHandler = useCallback(
    () => setState({ ...state, value: target }),
    [state, target]
  );
  return (
    <Button disabled={disabled} onClick={clickHandler}>
      {target}
    </Button>
  );
}
