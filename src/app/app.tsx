import React from "react";

import Home from "./components/Home";
import { ThemedChakraProvider } from "./components/ThemedChakraProvider";

const App: React.FC = () => (
  <ThemedChakraProvider>
    <Home />
  </ThemedChakraProvider>
);

export default App;
