import { css } from "@/../styled-system/css";
import { ReactNode } from "react";

const stylesOuter = css({
  minWidth: 150,
  width: "33%",
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-end",
});

const stylesInner = css({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  maxHeight: "90vh",
  overflow: "scroll",
});

export function Aside({ children }: { children: ReactNode }) {
  return (
    <div className={stylesOuter}>
      <div className={stylesInner} >{children}</div>
    </div>
  );
}
