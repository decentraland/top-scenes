import { configureStore } from "@reduxjs/toolkit"
import { placesClient } from "../features/places"
import { profilesClient } from "../features/profiles"
import { client } from "../services/client"

const store = configureStore({
  reducer: {
    [client.reducerPath]: client.reducer,
    [placesClient.reducerPath]: placesClient.reducer,
    [profilesClient.reducerPath]: profilesClient.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(client.middleware)
      .concat(placesClient.middleware)
      .concat(profilesClient.middleware),
})

type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch

export { store }
export type { AppDispatch, RootState }
