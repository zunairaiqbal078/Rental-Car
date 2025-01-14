import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { jsonInstance } from "../../api/BaseUrl";
import { toast } from "react-toastify";

export const submitContactForm = createAsyncThunk(
  "/user/contact",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await jsonInstance.post("/user/contact", formData);
      toast.success("Message sent successfully!");
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || "Failed to send message";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

const initialState = {
  isLoading: false,
  successmessage: null,
  errorMessage: null,
};

const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    resetContactState: (state) => {
      state.isLoading = false;
      state.successMessage = null;
      state.errorMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitContactForm.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(submitContactForm.fulfilled, (state, action) => {
        state.isLoading = false;
        state.successMessage = action.payload.message;
      })
      .addCase(submitContactForm.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.payload;
      });
  },
});
export const { resetContactState } = contactSlice.actions;
export default contactSlice.reducer;
