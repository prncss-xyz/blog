function optional(get, set) {
  return {
    get,
    set,
    assoc: (f) => (whole) => {
      const r = get(whole);
      if (r === undefined) return whole;
      return set(whole)(f(r));
    },
  };
}

function compose(a, b) {
  return optional(
    (whole) => {
      const r = a.get(whole);
      if (r === undefined) return undefined;
      return b.get(r);
    },
    (part) => (whole) => {
      const r = a.get(whole);
      if (r === undefined) return undefined;
      return a.set(b.set(part)(r))(whole);
    }
  );
}

// index
const at = (n) =>
  optional(
    (whole) => whole.at(n),
    (whole, part) => {
      const x = [...whole];
      x[n] = part;
      return x;
    }
  );
