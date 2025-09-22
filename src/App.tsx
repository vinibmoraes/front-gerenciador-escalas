import React from "react";
import Navigation from "./navigation/navigation";
import { ThemeProvider } from "./contexts/ThemeContext";
import { CssBaseline } from "@mui/material";

function App() {
  return (
    <ThemeProvider>
      <CssBaseline />
      <Navigation />
    </ThemeProvider>
  );
}

export default App;
