"use client";

import { MDXProvider } from "@mdx-js/react";
import Image from "next/image";

import { Box } from "@/../styled-system/jsx";
import { useSetFocus } from "@/components/focus";

import { useKeyNav } from "@/components/keynav";
import { useEffect } from "react";

const MDXComponents = {
  img: Image as any,
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useKeyNav();
  const setFocus = useSetFocus();
  useEffect(setFocus, [setFocus]);
  return (
    <MDXProvider components={MDXComponents}>
      <Box m={10}>{children}</Box>
    </MDXProvider>
  );
}
