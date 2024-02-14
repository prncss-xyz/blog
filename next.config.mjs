/** @type {import('next').NextConfig} */
import { remarkCodeHike } from "@code-hike/mdx";
import remarkMdxImages from "remark-mdx-images";
import createMDX from "@next/mdx";

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkMdxImages, [remarkCodeHike, {}]],
  },
});

export default withMDX({
  output: 'export',
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
});
