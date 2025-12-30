import { Env, createConfig } from "@dcl/ui-env"

export const config = createConfig(
  {
    [Env.PRODUCTION as string]: {
      ["SEGMENT_API_KEY"]: process.env.VITE_SEGMENT_PRD_API_KEY,
    },
  },
  {
    systemEnvVariables: {
      REACT_APP_DCL_DEFAULT_ENV:
        process.env.VITE_REACT_APP_DCL_DEFAULT_ENV ?? "dev",
    },
  }
)
