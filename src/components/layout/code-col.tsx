import { css } from "@/../styled-system/css";
import { ComponentProps } from "react";

const styles = css({
  width: "66%",
  maxWidth: 750,
  maxHeight: "90vh",
  overflow: "scroll",
});

export const CodeCol = (props: ComponentProps<"div">) => (
  <div className={styles} {...props} />
);
