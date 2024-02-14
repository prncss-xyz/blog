"use client"
import { useCallback, useState } from "react";
import { Sample } from "@/components/sample";

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
  const [state, setState] = useState(init);
  const clickHandler = useCallback(
    () => setState(lollyProp.set(target)),
    [target]
  );
  return (
    <>
      <div>{JSON.stringify(state)}</div>
      <button disabled={lollyProp.get(state) === target} onClick={clickHandler}>
        {target}
      </button>
    </>
  );
}

export function Sample03() {
  return (
    <Sample>
      <Component target={5} />
    </Sample>
  );
}
