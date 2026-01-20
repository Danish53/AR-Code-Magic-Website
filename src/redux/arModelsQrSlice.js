// src/redux/arModelsQrSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchArModels = createAsyncThunk(
  "arModels/fetch",
  async (user_id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_DOMAIN}/api/v1/user/qrcode-models/${user_id}`
      );
      console.log(response.data.data, "data")
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteArModel = createAsyncThunk(
  "arModels/delete",
  async (modelId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_DOMAIN}/api/v1/user/delete-qr-scan-list/${modelId}`
      );
      return modelId;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const arModelsSlice = createSlice({
  name: "arModels",
  initialState: {
    loading: false,
    models: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetch
      .addCase(fetchArModels.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchArModels.fulfilled, (state, action) => {
        state.loading = false;
        state.models = action.payload;
      })
      .addCase(fetchArModels.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // delete
      .addCase(deleteArModel.fulfilled, (state, action) => {
        state.models = state.models.filter(
          (model) => model.id !== action.payload
        );
      });
  },
});

export default arModelsSlice.reducer;
