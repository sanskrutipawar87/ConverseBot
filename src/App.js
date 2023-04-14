import "./App.css";
import { Box, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import Navigation from "./Auth/Navigation";

const mdTheme = createTheme();

function App() {
  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Navigation/>
      </Box>
    </ThemeProvider>
  );
}

export default App;
