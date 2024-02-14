import { useCallback, useState } from "react";

const init = {
  nest: {
    lolly: 3,
  },
};

export function Component({ target }) {
  const [state, setState] = useState(init);
  const disabled = state.nest.lolly === 3;
  const clickHandler = useCallback(
    () => setState({ ...state, nest: { ...state.nest, value: target } }),
    [state, target]
  );
  return (
    <button disabled={disabled} onClick={clickHandler}>
      {target}
    </button>
  );
}
