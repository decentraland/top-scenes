import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig, loadEnv } from "vite"

// https://vitejs.dev/config/
// eslint-disable-next-line import/no-default-export
export default defineConfig(({ command, mode }) => {
  const envVariables = loadEnv(mode, process.cwd())

  return {
    plugins: [react()],
    ...(command === "build" ? { base: envVariables.VITE_BASE_URL } : undefined),
    resolve: {
      alias: {
        events: "events",
        "ua-parser-js/helpers": path.resolve(
          __dirname,
          "src/stubs/ua-parser-helpers.js"
        ),
      },
    },
    optimizeDeps: {
      include: ["events"],
    },
  }
})
