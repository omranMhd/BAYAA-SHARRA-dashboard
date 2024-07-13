import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import { RouterProvider } from "react-router-dom";
import router from "./router/routes";
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import ThemeContext from "./Contexts/ThemeContext";
import lightObjectColors from "./Themes/light";
import darkObjectColors from "./Themes/dark";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import ShareAdvertisementsContext from "./Contexts/ShareAdvertisementsContext";

const queryClient = new QueryClient();

function App() {
  const [ads, setAds] = useState([]);
  const [mode, setMode] = useState(
    localStorage.getItem("themeMode") == null
      ? "light"
      : localStorage.getItem("themeMode")
  );

  const theme = createTheme({
    palette: {
      mode,
      ...(mode === "light" ? lightObjectColors : darkObjectColors),
    },
    typography: {
      fontFamily: ["Kanit", "Rubik"].join(","),
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: `
          /* Custom scrollbar styles */
          ::-webkit-scrollbar {
            width: 8px; /* Width of the scrollbar */
          }
  
          ::-webkit-scrollbar-track {
            background: #ffff; /* Color of the tracking area */
          }
  
          ::-webkit-scrollbar-thumb {
            background-color: #153258; /* Background color of the scroll thumb */
            border-radius: 20px; /* Roundness of the scroll thumb */
            // border: 3px solid #f1f1f1; /* Creates padding around scroll thumb */
          }
  
          ::-webkit-scrollbar-thumb:hover {
            background-color: #153258; /* Color of the scroll thumb on hover */
          }
        `,
      },
    },
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {/*this provider to send "setMode method to MainAppBar component to use it to change mode*/}
        <ThemeContext.Provider value={{ mode, setMode }}>
          <ShareAdvertisementsContext.Provider value={{ ads, setAds }}>
            <QueryClientProvider client={queryClient}>
              <RouterProvider router={router} />
              <ReactQueryDevtools />
            </QueryClientProvider>
          </ShareAdvertisementsContext.Provider>
        </ThemeContext.Provider>
      </ThemeProvider>
    </>
  );
}

export default App;
