import type { Config } from "tailwindcss";
import ctp from "@catppuccin/tailwindcss";

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,css,md,mdx,html,json,scss}",
  ],
  darkMode: "class",
  theme: {
    extend: {},
  },
  plugins: [
    ctp({
      defaultFlavour: "mocha",
    }),
  ],
};

export default config;
