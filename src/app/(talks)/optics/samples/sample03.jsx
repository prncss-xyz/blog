"use client";
import { useCallback } from "react";
import { demo } from "@/components/demo";
const { Demo, useDemo } = demo();

function prop(key) {
  return {
    get: (whole) => whole[key],
    set: (part) => (whole) => ({ ...whole, [key]: part }),
  };
}

function compose(a, b) {
  return {
    get: (whole) => b.get(a.get(whole)),
    set: (part) => (whole) => a.set(b.set(part)(a.get(whole)))(whole),
  };
}

const lollyProp = compose(prop("nest"), prop("lolly"));

const init = {
  nest: {
    lolly: 3,
  },
};

function Component({ target }) {
  const [state, setState] = useDemo();
  const clickHandler = useCallback(
    () => setState(lollyProp.set(target)),
    [setState, target]
  );
  return (
    <button disabled={lollyProp.get(state) === target} onClick={clickHandler}>
      {target}
    </button>
  );
}

export function Sample03() {
  return (
    <Demo init={init}>
      <Component target={5} />
    </Demo>
  );
}
