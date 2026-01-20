import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import packagesReducer from "./packagesSlice";
import customPagesReducer from "./customPagesSlice";
import trackingPixelsReducer from "./trackingSlice";
import teamWorkReducer from "./teamWorkSlice";
import arTextSlice from "./arTextSlice";
import arModelsQrReducer from "./arModelsQrSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    packages: packagesReducer,
    customPages: customPagesReducer,
    trackingPixels: trackingPixelsReducer,
    teamWork: teamWorkReducer,
    arModelsQr: arModelsQrReducer,
    arText: arTextSlice,
  },
});

export default store;
