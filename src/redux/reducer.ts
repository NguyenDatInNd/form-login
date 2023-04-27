import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface IData {
  id: number;
  status: string;
  date: string;
  client: string;
  currency: string;
  total: number;
  invoice: string;
  updatedAt: string;
}

interface IDatas {
  Products: IData[];
  ProductByID: any;
  InforUser: any;
  FilterStatus: string;
  FilterClient: string;
}

const initialState: IDatas = {
  Products: [],
  ProductByID: {},
  InforUser: {},
  FilterStatus: "",
  FilterClient: "",
};

export const fetchInforUser = createAsyncThunk(
  "data/fetchInforUser",
  async (data: string) => {
    const response = await fetch(
      "http://api.training.div3.pgtest.co/api/v1/user",
      {
        headers: { Authorization: data },
      }
    );
    const result = await response.json();
    return result;
  }
);

export const fetchDataAllProduct = createAsyncThunk(
  "data/fetchDataAllProduct",
  async (data: string) => {
    const response = await fetch(
      "http://api.training.div3.pgtest.co/api/v1/product",
      {
        headers: { Authorization: data },
      }
    );
    const result = await response.json();
    return result;
  }
);

export const fetchUpdateProduct = createAsyncThunk(
  "data/fetchUpdateProduct",
  async (data: any, { dispatch }) => {
    await fetch(
      "http://api.training.div3.pgtest.co/api/v1/product",
      {
        method: "PUT",
        body: JSON.stringify({
          id: data.id,
          order: data.order,
          status: data.status,
          currency: data.currency,
          total: data.total,
          fundingMethod: data.fundingMethod,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: data.token,
        },
      }
    );
    dispatch(fetchDataAllProduct(document.cookie.split("=")[1]));
    return data.id;
  }
);

export const fetchDataProductById = createAsyncThunk(
  "data/fetchDataProductById",
  async (data: any) => {
    const response = await fetch(
      `http://api.training.div3.pgtest.co/api/v1/product/${data.id}`,
      {
        headers: { Authorization: data.token },
      }
    );
    const result = await response.json();
    return result;
  }
);

export const fetchDeleteProduct = createAsyncThunk(
  "data/fetchDeleteProduct",
  async (data: any, { dispatch }) => {
    await fetch(
      `http://api.training.div3.pgtest.co/api/v1/product/${data.id}`,
      {
        method: "DELETE",
        headers: { Authorization: data.token },
      }
    );
    dispatch(fetchDataAllProduct(document.cookie.split("=")[1]));
    return data.id;
  }
);

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    filterStatus: (state, action: PayloadAction<string>) => {
      state.FilterStatus = action.payload;
    },
    filterClient: (state, action: PayloadAction<string>) => {
      state.FilterClient = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDataAllProduct.fulfilled, (state, action) => {
        state.Products = action.payload.data.filter((value: any) => {
          return (
            // value.client.includes(state.FilterClient)
            //  &&
            value.status.includes(state.FilterStatus)
          );
        });
      })
      .addCase(fetchDataProductById.fulfilled, (state, action) => {
        state.ProductByID = action.payload.data;
      })
      .addCase(fetchInforUser.fulfilled, (state, action) => {
        state.InforUser = action.payload.data;
      })
      .addCase(fetchDeleteProduct.fulfilled, (state, action) => {
        state.Products.splice(action.payload, 1);
      });
  },
});

export const { filterStatus, filterClient } = dataSlice.actions;

const { reducer } = dataSlice;

export default reducer;
