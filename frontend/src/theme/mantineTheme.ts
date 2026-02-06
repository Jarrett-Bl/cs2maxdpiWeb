import { createTheme } from "@mantine/core";


const zincPalette = [
  "#fafafa", // zinc-50  [0]
  "#f4f4f5", // zinc-100 [1]
  "#e4e4e7", // zinc-200 [2] – primary text in dark mode
  "#d4d4d8", // zinc-300 [3]
  "#a1a1aa", // zinc-400 [4]
  "#71717a", // zinc-500 [5]
  "#52525b", // zinc-600 [6]
  "#3f3f46", // zinc-700 [7]
  "#27272a", // zinc-800 [8]
  "#09090b", // zinc-950 [9] – page background
] as const;

export const mantineTheme = createTheme({
  primaryColor: "dark",
  colors: {
    dark: [...zincPalette],
    gray: [...zincPalette],
  },
  defaultRadius: "md",
});
