import * as React from "react"
import { BrowserRouter } from "react-router-dom"
import * as ReactDOM from "react-dom/client"
import { DclThemeProvider, GlobalStyles, darkTheme } from "decentraland-ui2"
import { App } from "./App"
import { authConfig } from "./config/auth"
import { AuthProvider } from "./contexts/auth"

const globalStyles = {
  html: {
    scrollBehavior: "smooth",
  },
  "#leaderboard, #mobile-tabs": {
    scrollMarginTop: "64px",
  },
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <DclThemeProvider theme={darkTheme}>
      <GlobalStyles styles={globalStyles} />
      <BrowserRouter>
        <AuthProvider config={authConfig}>
          <App />
        </AuthProvider>
      </BrowserRouter>
    </DclThemeProvider>
  </React.StrictMode>
)
