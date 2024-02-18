import type { MDXComponents } from "mdx/types";
import Image, { ImageProps } from "next/image";
import { css } from "@/../styled-system/css";
import { ComponentProps } from "react";

const h1 = (props: ComponentProps<"h1">) => (
  <h1
    className={css({
      fontSize: "2em",
      marginTop: "0.67em",
      marginBottom: "0,67em",
      fontWeight: "bold",
      width: "100%",
      textAlign: "center",
    })}
    {...props}
  />
);

const h2 = (props: ComponentProps<"h2">) => (
  <h2
    className={css({
      fontSize: "1.5em",
      marginTop: "0.83em",
      marginBottom: "0,83em",
      fontWeight: "bold",
      width: "100%",
      textAlign: "center",
    })}
    {...props}
  />
);

const h3 = (props: ComponentProps<"h3">) => (
  <h3
    className={css({
      fontSize: "1.17em",
      marginTop: "1em",
      marginBottom: "1em",
      fontWeight: "bold",
    })}
    {...props}
  />
);

const h4 = (props: ComponentProps<"h4">) => (
  <h4
    className={css({
      fontSize: "1.00em",
      marginTop: "1.33em",
      marginBottom: "1.33em",
      fontWeight: "bold",
    })}
    {...props}
  />
);

const h5 = (props: ComponentProps<"h5">) => (
  <h5
    className={css({
      fontSize: "0.83em",
      marginTop: "1.67em",
      marginBottom: "1,67em",
      fontWeight: "bold",
    })}
    {...props}
  />
);

const h6 = (props: ComponentProps<"h6">) => (
  <h6
    className={css({
      fontSize: "0.67em",
      marginTop: "0.5em",
      marginBottom: "0,5em",
      fontWeight: "bold",
    })}
    {...props}
  />
);

const p = (props: ComponentProps<"p">) => (
  <p
    className={css({
      marginTop: "1em",
      marginBottom: "1em",
    })}
    {...props}
  />
);

const ul = (props: ComponentProps<"ul">) => (
  <ul
    className={css({
      marginTop: "1em",
      marginBottom: "1em",
      listStyleType: "disc",
    })}
    {...props}
  />
);

const ol = (props: ComponentProps<"ol">) => (
  <ol
    className={css({
      marginTop: "1em",
      marginBottom: "1em",
      listStyleType: "decimal",
    })}
    {...props}
  />
);

const dl = (props: ComponentProps<"dl">) => (
  <dl
    className={css({
      marginTop: "1em",
      marginBottom: "1em",
    })}
    {...props}
  />
);
const small = (props: ComponentProps<"small">) => (
  <small
    className={css({
      fontSize: "80%",
    })}
    {...props}
  />
);
const sup = (props: ComponentProps<"sup">) => (
  <sup
    className={css({
      fontSize: "80%",
      top: "-0.5em",
    })}
    {...props}
  />
);
const sub = (props: ComponentProps<"sub">) => (
  <sub
    className={css({
      fontSize: "80%",
      top: "0.5em",
    })}
    {...props}
  />
);
const blockquote = (props: ComponentProps<"blockquote">) => (
  <blockquote
    className={css({
      marginLeft: 40,
      marginRight: 40,
      fontSize: "90%",
    })}
    {...props}
  />
);

const hr = (props: ComponentProps<"hr">) => (
  <hr
    className={css({
      marginTop: "0.5em",
      marginBottom: "0.5em",
      marginLeft: "auto",
      marginRight: "auto",
      borderStyle: "inset",
      borderWidth: "1px",
    })}
    {...props}
  />
);

// TODO: table

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    p,
    ul,
    ol,
    dl,
    small,
    sup,
    sub,
    blockquote,
    hr,
    img: (props) => (
      // eslint-disable-next-line jsx-a11y/alt-text
      <Image
        sizes="100vw"
        style={{ maxWidth: "100%", height: "auto" }}
        {...(props as ImageProps)}
      />
    ),
    ...components,
  };
}
