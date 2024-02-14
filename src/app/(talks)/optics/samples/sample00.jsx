import { useCallback, useState } from "react";

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
    <button disabled={disabled} onClick={clickHandler}>
      {target}
    </button>
  );
}
