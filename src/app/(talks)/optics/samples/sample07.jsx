"use client";
import { useCallback, useState } from "react";
import { demo } from "@/components/demo";
const { Demo, useDemo } = demo();

function prism(get, set) {
  return {
    get,
    set,
    assoc: (f) => (whole) => {
      const r = get(whole);
      if (r === undefined) return whole;
      return set(whole, f(r));
    },
  };
}

const strToNum = prism(
  (str) => {
    const num = Number(str);
    if (isNaN(num)) return undefined;
    return num;
  },
  (_str, num) => String(num)
);

const init = 0;

function Component() {
  const [, setState] = useDemo();
  const [inputState, setInputState] = useState("");
  const changeHandler = useCallback((e) => {
    const value = e.target.value;
    setInputState(value);
    setState(strToNum.get(value));
  }, [setState]);
  return <input type="String" value={inputState} onChange={changeHandler} />;
}

export function Sample07() {
  return (
    <Demo init={init}>
      <Component />
    </Demo>
  );
}
