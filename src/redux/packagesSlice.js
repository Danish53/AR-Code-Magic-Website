import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ✅ Fetch Packages by Type
export const fetchPackagesByType = createAsyncThunk(
  "packages/fetchPackagesByType",
  async (type, { rejectWithValue }) => {
    try {
      const response = await axios.get(import.meta.env.VITE_DOMAIN + `/api/v1/user/packages/${type}`);
      return { type, data: response.data.packages };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch packages");
    }
  }
);

const packagesSlice = createSlice({
  name: "packages",
  initialState: {
    plans: { monthly: [], yearly: [] },
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPackagesByType.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPackagesByType.fulfilled, (state, action) => {
        state.loading = false;
        const { type, data } = action.payload;

        // ✅ API returns array of packages
        if (type === 1) {
          state.plans.monthly = data;
        } else if (type === 2) {
          state.plans.yearly = data;
        }
      })
      .addCase(fetchPackagesByType.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default packagesSlice.reducer;
