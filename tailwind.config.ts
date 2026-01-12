import type { Config } from "tailwindcss";

const config: Config = {
  // We leave content empty because Tailwind v4 finds files automatically,
  // but the config file is needed just to load the plugin.
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {},
  },
  plugins: [
    require("tailwindcss-animate"),
    // If you want typography here too, you can add: require("@tailwindcss/typography"),
  ],
};
export default config;
