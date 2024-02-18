"use client";
import { useCallback, useState } from "react";
import { demo } from "@/components/demo";
const { Demo, useDemo } = demo();

const init = {
  temperature: 100,
};

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

function prop(key) {
  return lens(
    (whole) => whole[key],
    (part) => (whole) => ({ ...whole, [key]: part })
  );
}

function toFahrenheit() {
  return lens(
    (celsius) => (celsius * 9) / 5 + 32,
    (fahrenheit) => (_celcius) => ((fahrenheit - 32) * 5) / 9
  );
}

const fahrenheitProp = compose(prop("temperature"), toFahrenheit());
const inc = (x) => x + 10;
const dec = (x) => x - 10;

function Temperature() {
  const [state, setState] = useDemo();
  const incHandler = useCallback(
    () => setState(fahrenheitProp.assoc(inc)),
    [setState]
  );
  const decHandler = useCallback(
    () => setState(fahrenheitProp.assoc(dec)),
    [setState]
  );
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        gap: 5,
      }}
    >
      <button onClick={decHandler}>-</button>
      <div>{fahrenheitProp.get(state)}</div>
      <button onClick={incHandler}>+</button>
    </div>
  );
}

export function Sample06() {
  return (
    <Demo init={init}>
      <Temperature />
    </Demo>
  );
}
