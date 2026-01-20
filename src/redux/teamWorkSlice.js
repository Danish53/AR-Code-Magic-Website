// src/redux/teamSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const API_URL = import.meta.env.VITE_DOMAIN + "/api/v1/user"; // change this

// =================== ASYNC ACTIONS ===================

// Get all team members
export const fetchTeamMembers = createAsyncThunk(
    "team/fetchTeamMembers",
    async (_, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");
            const { data } = await axios.get(`${API_URL}/team-members`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch");
        }
    }
);

// Invite new member
export const inviteMember = createAsyncThunk(
    "team/inviteMember",
    async (member_email, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");
            const { data } = await axios.post(
                `${API_URL}/invite-team-member`,
                { member_email },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            toast.success("Member invited successfully");
            return data.teamMember;
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to invite");
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

// Update member permissions
export const updateMemberPermissions = createAsyncThunk(
    "team/updatePermissions",
    async ({ member_id, permissions }, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");
            const { data } = await axios.put(
                `${API_URL}/team-member/${member_id}/permissions`,
                { permissions },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            toast.success("Permissions updated Successfully!");
            return data.data;
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update permissions");
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

// Remove member
export const removeMember = createAsyncThunk(
    "team/removeMember",
    async (member_id, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");
            const { data } = await axios.delete(`${API_URL}/team-member/${member_id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            toast.success("Member removed Successfully!");
            return member_id;
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to remove");
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

// =================== SLICE ===================

const teamSlice = createSlice({
    name: "team",
    initialState: {
        members: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch members
            .addCase(fetchTeamMembers.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchTeamMembers.fulfilled, (state, action) => {
                state.loading = false;
                state.members = action.payload;
            })
            .addCase(fetchTeamMembers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Invite
            .addCase(inviteMember.fulfilled, (state, action) => {
                state.members.push(action.payload);
            })

            // Update permissions
            .addCase(updateMemberPermissions.fulfilled, (state, action) => {
                const index = state.members.findIndex(
                    (m) => m.member_id === action.payload.member_id
                );
                if (index !== -1) {
                    state.members[index] = action.payload;
                }
            })

            // Remove
            .addCase(removeMember.fulfilled, (state, action) => {
                state.members = state.members.filter(
                    (m) => m.member_id !== action.payload
                );
            });
    },
});

export default teamSlice.reducer;
