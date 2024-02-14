"use client"
import { useCallback, useMemo, useState } from "react";
import { Sample } from "@/components/sample";

function lens(get, set) {
  return {
    get,
    set,
    assoc: (f) => (whole) => set(f(get(whole)))(whole),
  };
}

function compose(a, b) {
  return lens(
    (whole) => b.get(a.get(whole)),
    (part) => (whole) => a.set(b.set(part)(a.get(whole)))(whole)
  );
}

function element(key) {
  return lens(
    (whole) => whole.includes(key),
    (part) => (whole) => part ? [...whole, key] : whole.filter((x) => x !== key)
  );
}

function prop(key) {
  return lens(
    (whole) => whole[key],
    (part) => (s) => ({ ...s, [key]: part })
  );
}

const tagsProp = prop("tags");
const negate = (x) => !x;

const init = { tags: ["emerald", "flaming", "spring"] };

function TagToggler({ tag }) {
  const tagLens = useMemo(() => compose(tagsProp, element(tag)), [tag]);
  const [state, setState] = useState(init);
  const clickHandler = useCallback(() => {
    return setState(tagLens.assoc(negate));
  }, [tagLens]);
  return (
    <>
      <div>{JSON.stringify(state)}</div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 5,
        }}
      >
        <input
          type="checkbox"
          checked={tagLens.get(state)}
          onChange={clickHandler}
        />
        <div>{tag}</div>
      </div>
    </>
  );
}

export function Sample05() {
  return (
    <Sample>
      <TagToggler tag="flaming" />
    </Sample>
  );
}
