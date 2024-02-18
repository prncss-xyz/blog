import { css } from "@/../styled-system/css";
import { ComponentProps } from "react";

export const Button = (props: ComponentProps<"button">) => (
  <button
    className={css({
      borderStyle: "solid",
      borderColor: "black",
      borderWidth: 0.5,
      borderRadius: 3,
      backgroundColor: "lightgray",
    })}
    {...props}
  />
);
