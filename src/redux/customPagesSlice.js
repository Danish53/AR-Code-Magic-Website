import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Base API
const API_URL = import.meta.env.VITE_DOMAIN + "/api/v1/user/custom-pages";
const token = localStorage.getItem("token");

// ✅ Fetch all custom pages
export const fetchCustomPages = createAsyncThunk(
    "customPages/fetchAll",
    async (_, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");
            const { data } = await axios.get(API_URL, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return data.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || err.message);
        }
    }
);

// ✅ Create new custom page
export const createCustomPage = createAsyncThunk(
    "customPages/create",
    async (formData, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(API_URL, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                },
            });
            return data.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || err.message);
        }
    }
);

// ✅ Update custom page
export const updateCustomPage = createAsyncThunk(
    "customPages/update",
    async ({ id, formData }, { rejectWithValue }) => {
        try {
            const { data } = await axios.put(`${API_URL}/${id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                },
            });
            return data.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || err.message);
        }
    }
);

// ✅ Delete custom page
export const deleteCustomPage = createAsyncThunk(
    "customPages/delete",
    async (id, { rejectWithValue }) => {
        try {
            await axios.delete(`${API_URL}/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return id;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || err.message);
        }
    }
);

const customPagesSlice = createSlice({
    name: "customPages",
    initialState: {
        pages: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // fetch
            .addCase(fetchCustomPages.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCustomPages.fulfilled, (state, action) => {
                state.loading = false;
                state.pages = action.payload;
            })
            .addCase(fetchCustomPages.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // create
            .addCase(createCustomPage.pending, (state) => { state.loading = true; })
            .addCase(createCustomPage.fulfilled, (state, action) => {
                state.loading = false;
                state.pages.push(action.payload);
            })
            .addCase(createCustomPage.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // update
            .addCase(updateCustomPage.fulfilled, (state, action) => {
                const index = state.pages.findIndex(p => p.id === action.payload.id);
                if (index !== -1) state.pages[index] = action.payload;
            })

            // delete
            .addCase(deleteCustomPage.fulfilled, (state, action) => {
                state.pages = state.pages.filter(p => p.id !== action.payload);
            });
    },
});

export default customPagesSlice.reducer;