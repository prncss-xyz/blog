import { css } from "@/../styled-system/css";
import { ComponentProps } from "react";

const styles = css({
  display: "flex",
  flexDirection: "row",
  gap: 20,
  width: "100%",
  justifyContent: "center",
});

export const TwoCols = (props: ComponentProps<"div">) => (
  <div className={styles} {...props} />
);
