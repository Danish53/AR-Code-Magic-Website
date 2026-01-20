import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ar text
export const generateArText = createAsyncThunk(
    "arText/generate",
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_DOMAIN}/api/v1/user/ar-text`,
                formData
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);
// ar photo
export const generateArPhoto = createAsyncThunk(
    "ar/generateArPhoto",
    async ({ formData }, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_DOMAIN}/api/v1/user/ar-photo`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);
// ar portal
export const generateArPortal = createAsyncThunk(
    "ar/generateArPortal",
    async ({ formData }, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_DOMAIN}/api/v1/user/ar-portal`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);
// ar Logo
export const generateArLogo = createAsyncThunk(
    "ar/generateArLogo",
    async ({ formData }, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_DOMAIN}/api/v1/user/ar-logo`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);
// ar 3d file
export const generateAr3dFile = createAsyncThunk(
    "ar/generateAredFile",
    async ({ formData }, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_DOMAIN}/api/v1/user/ar-3dFile`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);
// ar Video
export const generateArVideo = createAsyncThunk(
    "ar/generateArVideo",
    async ({ formData }, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_DOMAIN}/api/v1/user/ar-video`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);
// ar Face
export const generateArFace = createAsyncThunk(
    "ar/generateArFace",
    async ({ formData }, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_DOMAIN}/api/v1/user/ar-face`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

const arTextSlice = createSlice({
    name: "arText",
    initialState: {
        loading: false,
        arTextData: null,
        arPhotoData: null,
        arPortalData: null,
        arLogoData: null,
        ar3dFileData: null,
        arVideoData: null,
        arFaceData: null,
        faceImage: "",
        modelUrl: "",
        modelUsdz: "",
        qrCodeUrl: "",
        error: null,
    },
    reducers: {
        resetArState: (state) => {
            state.loading = false;
            state.error = null;
            state.qrCodeUrl = "";
            state.modelPath = "";
            state.modelUsdz = "";
            state.arPhotoData = null;
            state.arTextData = null;
            state.arPortalData = null;
            state.arLogoData = null;
            state.ar3dFileData = null;
            state.arVideoData = null;
            state.faceImage = "";
            state.arFaceData = null;

        },
    },
    extraReducers: (builder) => {
        /* AR Portal */
        builder
            .addCase(generateArPortal.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(generateArPortal.fulfilled, (state, action) => {
                state.loading = false;
                state.arPortalData = action.payload;
                state.qrCodeUrl = action.payload.qr_code_url;
                state.modelPath = action.payload.model_path;
                state.modelUsdz = action.payload.model_usdz;
            })
            .addCase(generateArPortal.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "AR Portal generation failed.";
            });

        /* AR Photo */
        builder
            .addCase(generateArPhoto.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(generateArPhoto.fulfilled, (state, action) => {
                state.loading = false;
                state.arPhotoData = action.payload;
                state.qrCodeUrl = action.payload.qr_code_url;
                state.modelPath = action.payload.model_path;
                state.modelUsdz = action.payload.model_usdz;
            })
            .addCase(generateArPhoto.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "AR Photo generation failed.";
            });

        /* AR Text */
        builder
            .addCase(generateArText.pending, (state) => {
                state.loading = true;
            })
            .addCase(generateArText.fulfilled, (state, action) => {
                state.loading = false;
                state.arTextData = action.payload;
                state.modelUrl = action.payload.model_path;
                state.modelUsdz = action.payload.model_usdz;
                state.qrCodeUrl = action.payload.qr_code_url;
            })
            .addCase(generateArText.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Something went wrong";
            });

        /* AR Logo */
        builder
            .addCase(generateArLogo.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(generateArLogo.fulfilled, (state, action) => {
                state.loading = false;
                state.arLogoData = action.payload;
                state.qrCodeUrl = action.payload.qr_code_url;
                state.modelPath = action.payload.model_path;
                state.modelUsdz = action.payload.model_usdz;
            })
            .addCase(generateArLogo.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "AR Logo generation failed.";
            });
        /* AR 3d file */
        builder
            .addCase(generateAr3dFile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(generateAr3dFile.fulfilled, (state, action) => {
                state.loading = false;
                state.ar3dFileData = action.payload;
                state.qrCodeUrl = action.payload.qr_code_url;
                state.modelPath = action.payload.model_path;
                state.modelUsdz = action.payload.model_usdz;
            })
            .addCase(generateAr3dFile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "AR Logo generation failed.";
            });
        /* AR video */
        builder
            .addCase(generateArVideo.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(generateArVideo.fulfilled, (state, action) => {
                state.loading = false;
                state.arVideoData = action.payload;
                state.qrCodeUrl = action.payload.qr_code_url;
                state.modelPath = action.payload.model_path;
                state.modelUsdz = action.payload.model_usdz;
            })
            .addCase(generateArVideo.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "AR Portal generation failed.";
            });
        /* AR face */
        builder
            .addCase(generateArFace.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(generateArFace.fulfilled, (state, action) => {
                state.loading = false;
                state.arFaceData = action.payload;
                state.qrCodeUrl = action.payload.qr_code_url;
                state.faceImage = action.payload.faceImage;
            })
            .addCase(generateArFace.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "AR face generation failed.";
            });
    },
});

export default arTextSlice.reducer;
