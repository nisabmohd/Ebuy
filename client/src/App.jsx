import Navbar from "./components/Navbar";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useState } from "react";
import { useThemeContext } from './contexts/Theme'
export default function App() {
  const { dark } = useThemeContext()
  const darkTheme = createTheme({
    palette: {
      mode: dark ? 'dark' : 'light',
    },
  });
  return (
    <ThemeProvider theme={darkTheme} >
      <CssBaseline />
      <div className="App">
        <Navbar />
      </div>
    </ThemeProvider>
  )
}
