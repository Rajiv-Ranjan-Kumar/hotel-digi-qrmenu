import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";

import themeReducer from "./slice/themeSlice";
import userReducer from "./slice/userSlice";
import settingsReducer from "./slice/settingsSlice";
import branchReducer from "./slice/branchSlice";
import menuReducer from "./slice/menuSlice";
import roleSlice from "./slice/roleSlice";
import hotelReducer from "./slice/hotelSlice";



// Root persist config
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["hotels", "user", "settings", "theme", "branch", "menu", "roles"], 
  blacklist: [],
};



const rootReducer = {
  theme: themeReducer,
  roles: roleSlice,
  user: userReducer,
  settings: settingsReducer,
  hotels: hotelReducer,
  branch: branchReducer,
  menu: menuReducer,
};




const persistedReducer = persistReducer(persistConfig, combineReducers(rootReducer));




export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});


export const persistor = persistStore(store);


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
