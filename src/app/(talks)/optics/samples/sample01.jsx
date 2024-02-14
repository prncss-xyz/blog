"use client"
import { useCallback, useState } from "react";
import { Sample } from "@/components/sample";

const init = {
  lolly: 3,
};

// abstracts the concern of updating part of the structure
function prop(key) {
  return {
    get: (whole) => whole[key],
    set: (part) => (whole) => ({ ...whole, [key]: part }),
  };
}

const lollyProp = prop("lolly");

export function Component({ target }) {
  const [state, setState] = useState(init);
  const disabled = lollyProp.get(state) === target;
  const clickHandler = useCallback(
    () => setState(lollyProp.set(target)),
    [target]
  );
  return (
    <>
      <div>{JSON.stringify(state)}</div>
      <button disabled={disabled} onClick={clickHandler}>
        {target}
      </button>
    </>
  );
}

export function Sample01() {
  return (
    <Sample>
      <Component target={5} />
    </Sample>
  );
}
