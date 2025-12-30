import react from "@vitejs/plugin-react"
import { defineConfig, loadEnv } from "vite"

// https://vitejs.dev/config/
// eslint-disable-next-line import/no-default-export
export default defineConfig(({ command, mode }) => {
  const envVariables = loadEnv(mode, process.cwd())

  return {
    plugins: [react()],
    define: {
      "process.env": {
        VITE_REACT_APP_DCL_DEFAULT_ENV:
          envVariables.VITE_REACT_APP_DCL_DEFAULT_ENV,
        VITE_SEGMENT_PROD_API_KEY: envVariables.VITE_SEGMENT_PROD_API_KEY,
      },
    },
    ...(command === "build" ? { base: envVariables.VITE_BASE_URL } : undefined),
  }
})
