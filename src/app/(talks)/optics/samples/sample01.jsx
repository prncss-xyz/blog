"use client";
import { useCallback } from "react";
import { demo } from "@/components/demo";
const { Demo, useDemo } = demo();

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
  const [state, setState] = useDemo();
  const disabled = lollyProp.get(state) === target;
  const clickHandler = useCallback(
    () => setState(lollyProp.set(target)),
    [setState, target]
  );
  return (
    <button disabled={disabled} onClick={clickHandler}>
      {target}
    </button>
  );
}

export function Sample01() {
  return (
    <Demo init={init}>
      <Component target={5} />
    </Demo>
  );
}
