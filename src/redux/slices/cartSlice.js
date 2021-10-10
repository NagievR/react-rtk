import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import fetchData from "../../utils/fetchData";
import { updateProduct } from "./proudctsSlice";

const initialState = {
  list: [],
  sum: 0,
  isLoading: false,
  error: null,
};

export const getCart = createAsyncThunk(
  "cart/getCart",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const data = await fetchData(
        `${process.env.REACT_APP_SERVER_URL}/cart`,
        "GET"
      );

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (item, { rejectWithValue, dispatch }) => {
    try {
      const data = await fetchData(
        `${process.env.REACT_APP_SERVER_URL}/cart`,
        "POST",
        item
      );

      const toUpdateProd = { ...item, inCart: true };
      delete toUpdateProd.quantity;
      dispatch(updateProduct({ id: item.id, dataToUpdate: toUpdateProd }));

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateCart = createAsyncThunk(
  "cart/updateCart",
  async (toUpdate, { getState, dispatch }) => {
    const { id } = toUpdate;
    const updatedList = getState().cart.list.map((it) =>
      it.id === id ? toUpdate : it
    );
    dispatch(update(updatedList));
    dispatch(getTotalSum());

    fetchData(
      `${process.env.REACT_APP_SERVER_URL}/cart/${id}`,
      "PATCH",
      toUpdate
    );
  }
);

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (item, { rejectWithValue, dispatch }) => {
    try {
      await fetchData(
        `${process.env.REACT_APP_SERVER_URL}/cart/${item.id}`,
        "DELETE"
      );

      const toRemove = { ...item, inCart: false };
      delete toRemove.quantity;
      dispatch(updateProduct({ id: item.id, dataToUpdate: toRemove }));

      return item.id;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    getTotalSum(state) {
      state.sum = state.list.reduce(
        (sum, it) => (sum += it.price * it.quantity),
        0
      );
    },
    update(state, action) {
      state.list = action.payload;
    },
  },
  extraReducers: {
    // get cart
    [getCart.pending]: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    [getCart.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [getCart.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.list = action.payload;
    },

    // add to cart
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
      const addedItem = action.payload;
      state.list.push(addedItem);
    },

    //  remove from cart
    [removeFromCart.pending]: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    [removeFromCart.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [removeFromCart.fulfilled]: (state, action) => {
      state.isLoading = false;
      const removedId = action.payload;
      state.list = state.list.filter((prod) => prod.id !== removedId);
    },
  },
});

export default cartSlice.reducer;
export const { getTotalSum, update } = cartSlice.actions;
