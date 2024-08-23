import { createSlice } from "@reduxjs/toolkit";

const credentialSlice = createSlice({
    name: "credential",

    initialState: {
        credentialData: null,
        permissionData: null,
    },

    reducers: {
        addCredentials: (state, action) => {
            state.credentialData = action.payload;
        },

        clearCredentials: (state) => {
            state.credentialData = null;
        },

        addPermissions: (state, action) => {
            state.permissionData = action.payload;
        },

        clearPermissions: (state) => {
            state.permissionData = null;
        },
    },
});

export const {
    addCredentials,
    clearCredentials,
    addPermissions,
    clearPermissions,
} = credentialSlice.actions;
export default credentialSlice.reducer;
