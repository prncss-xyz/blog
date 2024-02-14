import { defineConfig } from "@pandacss/dev";

export default defineConfig({
  preflight: false,
  include: ["./src/**/*.{js,jsx,ts,tsx}"],
  exclude: [],
  outdir: "styled-system",
  jsxFramework: "react",
  globalCss: {},
  theme: {},
  conditions: {
    extend: {},
  },
});
