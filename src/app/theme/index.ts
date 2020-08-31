import defaultTheme from "@chakra-ui/theme";

const config = {
  initialColorMode: "light" as const,
};

const theme = {
  ...defaultTheme,
  config,
};

export type Theme = typeof theme;

export default theme;
