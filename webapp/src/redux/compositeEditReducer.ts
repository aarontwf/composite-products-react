import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import CompositeProduct from "../domain/models/CompositeProduct";
import Product from "../domain/models/Product";
import ProductServiceFactory from "../domain/service/ProductServiceFactory";
import { AsyncState } from "../presentation/AsyncState";

const service = ProductServiceFactory.demoOnline();

export type CompositeProductDialogModel = {
  readonly compositeProduct: CompositeProduct;
  readonly availableProducts: Product[];
};

export type CompositeProductDialogState = {
  readonly model: AsyncState<CompositeProductDialogModel>;
  readonly saveRequest: AsyncState<void>;
};

export const fetchCompositeById = createAsyncThunk(
  'compositeEdit/fetchById',
  async (id: string) => {
    const results = await Promise.all([
      service.getCompositeProductById(id),
      service.getProducts()
    ]);

    return {
      compositeProduct: results[0],
      availableProducts: results[1]
    };
  }
);

const initialState: CompositeProductDialogState = {
  model: AsyncState.uninitialized(),
  saveRequest: AsyncState.uninitialized(),
};

const compositeEditSlice = createSlice({
  name: 'compositeEdit',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchCompositeById.pending,
      (state) => {
        return { ...state, model: AsyncState.loading() };
      }
    );

    builder.addCase(
      fetchCompositeById.fulfilled,
      (state, result) => {
        return { ...state, model: AsyncState.success(result.payload) };
      }
    );

    builder.addCase(
      fetchCompositeById.rejected,
      (state, result) => {
        return { ...state, model: AsyncState.fail(result.error) };
      }
    );
  }
});

export default compositeEditSlice.reducer;
