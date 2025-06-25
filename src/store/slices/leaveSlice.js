import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

// Get token
const token = localStorage.getItem("token");

// Base API
// const BASE_URL = "https://rwt-emp-backend.onrender.com/admin";
const BASE_URL = "http://localhost:8000/admin";


// Thunks
export const fetchLeaves = createAsyncThunk("leaves/fetchAll", async (_, { rejectWithValue }) => {
  try {
    const res = await axios.get(`${BASE_URL}/leaves`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(res.data);
    
    return res.data.data;
  } catch (err) {
    toast.error("Failed to fetch leaves");
    console.log(err);
    
    return rejectWithValue(err.response?.data || "Fetch failed");
  }
});

export const addLeave = createAsyncThunk("leaves/add", async (leaveData, { rejectWithValue }) => {
  try {
    const res = await axios.post(`${BASE_URL}/leave`, leaveData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    toast.success("Leave added successfully");
    return res.data.data;
  } catch (err) {
    toast.error("Failed to add leave");
    return rejectWithValue(err.response?.data || "Add failed");
  }
});

export const updateLeave = createAsyncThunk(
  "leaves/update",
  async ({ id, ...leaveData }, { rejectWithValue }) => {
    try {
      const res = await axios.put(`${BASE_URL}/leave/${id}`, leaveData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Leave updated successfully");
      return res.data.data;
    } catch (err) {
      toast.error("Failed to update leave");
      return rejectWithValue(err.response?.data || "Update failed");
    }
  }
);

export const deleteLeave = createAsyncThunk("leaves/delete", async (id, { rejectWithValue }) => {
  try {
    await axios.delete(`${BASE_URL}/leave/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    toast.success("Leave deleted successfully");
    return id;
  } catch (err) {
    toast.error("Failed to delete leave");
    return rejectWithValue(err.response?.data || "Delete failed");
  }
});

// Slice
const leaveSlice = createSlice({
  name: "leaves",
  initialState: {
    leaves: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeaves.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLeaves.fulfilled, (state, action) => {
        state.loading = false;
        state.leaves = action.payload;
      })
      .addCase(addLeave.fulfilled, (state, action) => {
        state.leaves.push(action.payload);
      })
      .addCase(updateLeave.fulfilled, (state, action) => {
        const index = state.leaves.findIndex((l) => l._id === action.payload._id);
        if (index !== -1) state.leaves[index] = action.payload;
      })
      .addCase(deleteLeave.fulfilled, (state, action) => {
        state.leaves = state.leaves.filter((l) => l._id !== action.payload);
      });
  },
});

export default leaveSlice.reducer;
