import { configureStore } from "@reduxjs/toolkit"
import { placesClient } from "../features/places"
import { profilesClient } from "../features/profiles"
import { scenesClient } from "../services/client"

const store = configureStore({
  reducer: {
    [scenesClient.reducerPath]: scenesClient.reducer,
    [placesClient.reducerPath]: placesClient.reducer,
    [profilesClient.reducerPath]: profilesClient.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(scenesClient.middleware)
      .concat(placesClient.middleware)
      .concat(profilesClient.middleware),
})

type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch

export { store }
export type { AppDispatch, RootState }
