import { ChakraProvider, useTheme as useThemeChakra } from "@chakra-ui/core";
import React from "react";

import theme, { Theme } from "../theme";

export const ThemedChakraProvider: React.FC = ({ children }) => (
  <ChakraProvider resetCSS theme={theme}>
    {children}
  </ChakraProvider>
);

export const useTheme = (): Theme => {
  return useThemeChakra<Theme>();
};
