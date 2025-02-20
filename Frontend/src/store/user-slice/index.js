import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAllUsers, deleteUser } from "../../api/authApi";

// Fetch All Users Thunk
export const fetchUsersThunk = createAsyncThunk(
  "users/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const users = await fetchAllUsers();
      return users;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Delete User Thunk
export const deleteUserThunk = createAsyncThunk(
  "users/delete",
  async (userId, { rejectWithValue }) => {
    try {
      await deleteUser(userId);
      return userId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    totalUsers: 0,
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Users
      .addCase(fetchUsersThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUsersThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
        state.totalUsers = action.payload.length; // Total users count update
      })
      .addCase(fetchUsersThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Delete User
      .addCase(deleteUserThunk.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user._id !== action.payload);
        state.totalUsers -= 1; // Total users count decrease
      });
  },
});

export default usersSlice.reducer;
