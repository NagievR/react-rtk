import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import fetchData from "../../utils/fetchData";

const initialState = {
  mainList: [],
  list: [],
  paginatedList: [],
  isLoading: false,
  error: null,
  resultAfterAsync: null,
  pagination: {
    currentPage: 1,
    totalPages: 1,
    perPage: 10,
  },
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchData(
        `${process.env.REACT_APP_SERVER_URL}/products`
      );
      return data;
    } catch (error) {
      console.warn(error);
      return rejectWithValue(error.message);
    }
  }
);

export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (dataToSave, { rejectWithValue }) => {
    try {
      const data = await fetchData(
        `${process.env.REACT_APP_SERVER_URL}/products`,
        "POST",
        dataToSave
      );
      return data;
    } catch (error) {
      console.warn(error);
      return rejectWithValue(error.message);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id, { rejectWithValue }) => {
    try {
      await fetchData(
        `${process.env.REACT_APP_SERVER_URL}/products/${id}`,
        "DELETE"
      );
      return id;
    } catch (error) {
      console.warn(error);
      return rejectWithValue(error.message);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, dataToUpdate }, { rejectWithValue }) => {
    try {
      const data = await fetchData(
        `${process.env.REACT_APP_SERVER_URL}/products/${id}`,
        "PATCH",
        dataToUpdate
      );
      return data;
    } catch (error) {
      console.warn(error);
      return rejectWithValue(error.message);
    }
  }
);

// Move this to another file:
const createPagination = (state, isTempList = true, fromPage = 1) => {
  const pagin = state.pagination;
  const perPage = pagin.perPage;
  const pageNumber = fromPage ?? pagin.currentPage;

  const toPaginate = isTempList ? state.list : state.mainList;
  const from = perPage * (pageNumber - 1);
  const to = perPage * pageNumber;

  pagin.totalPages = Math.ceil(toPaginate.length / perPage);
  pagin.currentPage = fromPage;
  state.paginatedList = toPaginate.slice(from, to);
};
// =====================

const productsSlice = createSlice({
  name: "products",
  initialState,

  reducers: {
    changePage(state, action) {
      createPagination(state, state.list.length, action.payload);
    },

    filterByTitle(state, action) {
      state.list = state.mainList.filter((product) => {
        const productTitle = product.title.toLowerCase();
        const searchFor = action.payload.toLowerCase();
        return productTitle.startsWith(searchFor);
      });
      createPagination(state, true);
    },

    clearResultAfterAsync(state) {
      state.resultAfterAsync = null;
    },
  },

  extraReducers: {
    // fetchProducts
    [fetchProducts.pending]: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    [fetchProducts.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [fetchProducts.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.mainList = action.payload;
      createPagination(state, false);
    },

    // createProduct
    [createProduct.pending]: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    [createProduct.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [createProduct.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.resultAfterAsync = action.payload;
    },

    // deleteProduct
    [deleteProduct.pending]: (state) => {
      state.error = null;
    },
    [deleteProduct.rejected]: (state, action) => {
      state.error = action.payload;
    },
    [deleteProduct.fulfilled]: (state, action) => {
      state.mainList = state.mainList.filter(
        (prod) => prod.id !== action.payload
      );
      createPagination(state, false, state.pagination.currentPage);
    },

    // updateProduct
    [updateProduct.pending]: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    [updateProduct.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [updateProduct.fulfilled]: (state) => {
      state.isLoading = false;
    },
  },
});

export default productsSlice.reducer;
export const { changePage, filterByTitle, clearResultAfterAsync } =
  productsSlice.actions;
