import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

// Base URL
const API_URL = `${import.meta.env.VITE_DOMAIN}/api/v1/user/tracking-pixels`;


export const fetchTrackingPixels = createAsyncThunk("tracking/fetchAll", async (_, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token");
    const { data } = await axios.get(API_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || "Failed to load tracking pixels");
  }
});

//  2. Create Pixel
export const createTrackingPixel = createAsyncThunk("tracking/create", async (payload, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token");
    const { data } = await axios.post(API_URL, payload, {
      headers: { Authorization: `Bearer ${token}` },
    });
    toast.success("Tracking pixel added successfully!");
    return data.data;
  } catch (err) {
    toast.error(err.response?.data?.message || "Failed to create pixel");
    return rejectWithValue(err.response?.data?.message);
  }
});

//  3. Delete Pixel
export const deleteTrackingPixel = createAsyncThunk("tracking/delete", async (pixel_id, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token");
    await axios.delete(`${API_URL}/${pixel_id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    toast.success("Pixel deleted successfully!");
    return pixel_id;
  } catch (err) {
    toast.error("Failed to delete pixel");
    return rejectWithValue(err.response?.data?.message);
  }
});

const trackingSlice = createSlice({
  name: "tracking",
  initialState: {
    pixels: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchTrackingPixels.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTrackingPixels.fulfilled, (state, action) => {
        state.loading = false;
        state.pixels = action.payload;
      })
      .addCase(fetchTrackingPixels.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create
      .addCase(createTrackingPixel.fulfilled, (state, action) => {
        state.pixels.push(action.payload);
      })

      // Delete
      .addCase(deleteTrackingPixel.fulfilled, (state, action) => {
        state.pixels = state.pixels.filter((pixel) => pixel.id !== action.payload);
      });
  },
});

export default trackingSlice.reducer;
