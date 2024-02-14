"use client"
import { useCallback, useState } from "react";
import { Sample } from "@/components/sample";

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
  const [state, setState] = useState(init);
  const [inputState, setInputState] = useState("");
  const changeHandler = useCallback((e) => {
    const value = e.target.value;
    setInputState(value);
    setState(strToNum.get(value));
  }, []);
  return (
    <>
      <div>{JSON.stringify(state) ?? "undefined"}</div>
      <input type="String" value={inputState} onChange={changeHandler} />
    </>
  );
}

export function Sample07() {
  return (
    <Sample>
      <Component />
    </Sample>
  );
}

// predicate
const isPositive = prism(
  (whole) => (whole >= 0 ? whole : undefined),
  (_whole, part) => part
);

// type guard
const isNumber = prism(
  (whole) => (typeof whole === "number" ? whole : undefined),
  (_whole, part) => part
);

