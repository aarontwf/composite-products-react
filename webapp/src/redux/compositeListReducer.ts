import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import CompositeProduct from "../domain/models/CompositeProduct";
import ProductServiceFactory from "../domain/service/ProductServiceFactory";
import { AsyncState } from "../presentation/AsyncState";

const service = ProductServiceFactory.demoOnline();

export const fetchCompositeProducts = createAsyncThunk(
  'compositeList/fetch',
  async () => await service.getCompositeProducts()
);

const compositeListSlice = createSlice({
  name: 'compositeList',
  initialState: AsyncState.uninitialized<CompositeProduct[]>(),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchCompositeProducts.pending,
      () => AsyncState.loading()
    );

    builder.addCase(
      fetchCompositeProducts.fulfilled,
      (_, result) => AsyncState.success(result.payload)
    );

    builder.addCase(
      fetchCompositeProducts.rejected,
      (_, result) => AsyncState.fail(result.error)
    );
  }
});

export default compositeListSlice.reducer;
