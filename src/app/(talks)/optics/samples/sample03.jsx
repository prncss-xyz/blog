"use client";
import { useCallback } from "react";
import { demo } from "@/components/demo";
const { Demo, useDemo } = demo();
import { Button } from "@/components/layout/button";

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

function Component({ target }) {
  const [state, setState] = useDemo();
  const clickHandler = useCallback(
    () => setState(lollyProp.set(target)),
    [setState, target]
  );
  return (
    <Button disabled={lollyProp.get(state) === target} onClick={clickHandler}>
      {target}
    </Button>
  );
}

const init = {
  nest: {
    lolly: 3,
  },
};

export function Sample03() {
  return (
    <Demo init={init}>
      <Component target={5} />
    </Demo>
  );
}
