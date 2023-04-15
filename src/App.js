import "./App.css";
import { Box, createTheme, CssBaseline, ThemeProvider } from "@mui/material";

import Auth from "./Auth/Auth";

const mdTheme = createTheme();

function App() {
  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Auth/>
      </Box>
    </ThemeProvider>
  );
}

export default App;
