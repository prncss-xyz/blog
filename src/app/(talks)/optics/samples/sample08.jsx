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

const at = (index) =>
  optional(
    (whole) => whole.at(index),
    (whole, part) => {
      const x = [...whole];
      x[index] = part;
      return x;
    }
  );
