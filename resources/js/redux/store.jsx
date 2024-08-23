import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import credentialReducer from "./slices/credentialSlice";

const persistConfig = {
    key: "credential",
    storage,
};

const persistedCredentialReducer = persistReducer(
    persistConfig,
    credentialReducer
);

export const store = configureStore({
    reducer: {
        credential: persistedCredentialReducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // Configure ignored actions or paths if needed
                ignoredActions: ["yourActionWithNonSerializableData"],
                ignoredPaths: ["someNonSerializableStatePath"],
            },
        }),
});

export const persistor = persistStore(store);
