"use client";
import { useCallback } from "react";
import { demo } from "@/components/demo";
const { Demo, useDemo } = demo();
import { Button } from "@/components/layout/button";

const init = {
  lolly: 3,
};

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
    <Button disabled={disabled} onClick={clickHandler}>
      {target}
    </Button>
  );
}

export function Sample01() {
  return (
    <Demo init={init}>
      <Component target={5} />
    </Demo>
  );
}
