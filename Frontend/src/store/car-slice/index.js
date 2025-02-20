import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllCars, updateCar, deleteCar, getCarById } from "../../api/carApi";

// Fetch all cars
export const fetchCars = createAsyncThunk(
  "cars/fetchAll",
  async (_, thunkAPI) => {
    try {
      const response = await getAllCars();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Fetch car by ID
export const fetchCarById = createAsyncThunk(
  "cars/fetchById",
  async (carId, thunkAPI) => {
    try {
      const response = await getCarById(carId);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Update car
export const editCar = createAsyncThunk(
  "cars/update",
  async ({ carId, carData }, thunkAPI) => {
    try {
      const response = await updateCar(carId, carData);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Delete car
export const removeCar = createAsyncThunk(
  "cars/delete",
  async (carId, thunkAPI) => {
    try {
      await deleteCar(carId);
      return carId; // Return ID to remove from state
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const carSlice = createSlice({
  name: "cars",
  initialState: {
    cars: [],
    car: null,
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCars.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCars.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cars = action.payload;
      })
      .addCase(fetchCars.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchCarById.fulfilled, (state, action) => {
        state.car = action.payload;
      })
      .addCase(editCar.fulfilled, (state, action) => {
        const index = state.cars.findIndex(
          (car) => car._id === action.payload._id
        );
        if (index !== -1) {
          state.cars[index] = action.payload;
        }
      })
      .addCase(removeCar.fulfilled, (state, action) => {
        state.cars = state.cars.filter((car) => car._id !== action.payload);
      });
  },
});

export default carSlice.reducer;
