import * as React from "react"
import { BrowserRouter } from "react-router-dom"
import * as ReactDOM from "react-dom/client"
import { DclThemeProvider, darkTheme } from "decentraland-ui2"
import { App } from "./App"
import { authConfig } from "./config/auth"
import { AuthProvider } from "./contexts/auth"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <DclThemeProvider theme={darkTheme}>
      <BrowserRouter>
        <AuthProvider config={authConfig}>
          <App />
        </AuthProvider>
      </BrowserRouter>
    </DclThemeProvider>
  </React.StrictMode>
)
