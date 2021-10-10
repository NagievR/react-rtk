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
    lastPage: 1,
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
  async ({ dataToUpdate, id }, { rejectWithValue }) => {
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
const createPagination = (state, notMainList = true, fromPage = 1) => {
  const pagin = state.pagination;
  const perPage = pagin.perPage;
  const pageNumber = fromPage ?? pagin.currentPage;

  const toPaginate = notMainList ? state.list : state.mainList;
  const totalPages = Math.ceil(toPaginate.length / perPage);
  let from = perPage * (pageNumber - 1);
  let to = perPage * pageNumber;

  if (fromPage > totalPages) {
    from = perPage * (totalPages - 1);
    to = perPage * totalPages;
    fromPage = totalPages;
  }

  pagin.totalPages = totalPages;
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
        return productTitle.includes(searchFor);
      });
      createPagination(state, true);
    },

    updateProductList(state, action) {
      state.list = action.payload;
      state.mainList = action.payload;
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
      const newProduct = action.payload;
      state.resultAfterAsync = newProduct;
      state.mainList.push(newProduct);
      state.list.push(newProduct);
      createPagination(state, false, state.pagination.currentPage);
    },

    // deleteProduct
    [deleteProduct.pending]: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    [deleteProduct.rejected]: (state, action) => {
      state.isLoading = true;
      state.error = action.payload;
    },
    [deleteProduct.fulfilled]: (state, action) => {
      state.isLoading = false;
      const updatedList = state.mainList.filter(
        (prod) => prod.id !== action.payload
      );
      state.mainList = updatedList;
      state.list = updatedList;
      createPagination(state, true, state.pagination.currentPage);
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
    [updateProduct.fulfilled]: (state, action) => {
      state.isLoading = false;
      const updatedProduct = action.payload;
      state.resultAfterAsync = updatedProduct;
      const updatedList = state.mainList.map((prod) =>
        prod.id === updatedProduct.id ? updatedProduct : prod
      );
      state.mainList = updatedList;
      state.list = updatedList;
      createPagination(state, true, state.pagination.currentPage);
    },
  },
});

export default productsSlice.reducer;
export const {
  changePage,
  filterByTitle,
  clearResultAfterAsync,
  updateProductList,
} = productsSlice.actions;
