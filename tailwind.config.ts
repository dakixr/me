import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

type ThemeResolver = (path: string, defaultValue?: unknown) => string;

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        dark: {
          DEFAULT: "#121212",
          100: "#181818",
          200: "#202020",
          300: "#303030",
          400: "#404040",
          500: "#505050",
        },
        accent: {
          DEFAULT: "#0ea5e9",
          50: "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0ea5e9",
          600: "#0284c7",
          700: "#0369a1",
          800: "#075985",
          900: "#0c4a6e",
        },
        light: {
          DEFAULT: "#f8fafc",
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
        },
      },
      typography: ({ theme }: { theme: ThemeResolver }) => ({
        DEFAULT: {
          css: {
            maxWidth: "100%",
            color: theme("colors.gray.800"),
            h1: {
              color: theme("colors.gray.900"),
              fontWeight: "700",
            },
            h2: {
              color: theme("colors.gray.900"),
              fontWeight: "600",
            },
            h3: {
              color: theme("colors.gray.900"),
              fontWeight: "600",
            },
            h4: {
              color: theme("colors.gray.900"),
              fontWeight: "600",
            },
            a: {
              color: theme("colors.accent.DEFAULT"),
              textDecoration: "none",
              "&:hover": {
                textDecoration: "underline",
              },
            },
            code: {
              color: theme("colors.indigo.500"),
              backgroundColor: theme("colors.gray.100"),
              borderRadius: theme("borderRadius.md"),
              padding: theme("spacing.1"),
            },
          },
        },
        dark: {
          css: {
            color: theme("colors.gray.300"),
            h1: {
              color: theme("colors.gray.100"),
            },
            h2: {
              color: theme("colors.gray.100"),
            },
            h3: {
              color: theme("colors.gray.100"),
            },
            h4: {
              color: theme("colors.gray.100"),
            },
            a: {
              color: theme("colors.accent.DEFAULT"),
            },
            code: {
              color: theme("colors.indigo.400"),
              backgroundColor: theme("colors.dark.200"),
            },
            strong: {
              color: theme("colors.gray.100"),
            },
          },
        },
      }),
    },
  },
  plugins: [typography],
};

export default config;
