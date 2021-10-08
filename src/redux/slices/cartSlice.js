import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import fetchData from "../../utils/fetchData";
import { updateProduct } from "./proudctsSlice";

const initialState = {
  list: [],
  isLoading: false,
  error: null,
};

export const addToCart = createAsyncThunk(
  "cart/updateCart",
  async ({ item }, { rejectWithValue, dispatch }) => {
    try {
      await fetchData(`${process.env.REACT_APP_SERVER_URL}/cart`, "POST", item);

      const toUpdateProd = { ...item, inCart: true };
      delete toUpdateProd.quantity;
      dispatch(updateProduct({ id: item.id, dataToUpdate: toUpdateProd }));

      return item;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateCart = createAsyncThunk(
  "cart/updateCart",
  async ({ id, data }, { rejectWithValue }) => {}
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    getTotalSum(state) {},
  },
  extraReducers: {
    [addToCart.pending]: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    [addToCart.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [addToCart.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.list.push(action.payload);
    },
  },
});

export default cartSlice.reducer;
export const {} = cartSlice.actions;
