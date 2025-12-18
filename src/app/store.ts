import { configureStore } from "@reduxjs/toolkit"
import { profilesClient } from "../features/profiles"
import { client } from "../services/client"

const store = configureStore({
  reducer: {
    [client.reducerPath]: client.reducer,
    [profilesClient.reducerPath]: profilesClient.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(client.middleware)
      .concat(profilesClient.middleware),
})

type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch

export { store }
export type { AppDispatch, RootState }
