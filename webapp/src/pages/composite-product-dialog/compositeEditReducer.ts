import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import CompositeProduct from "../../domain/models/CompositeProduct";
import Product from "../../domain/models/Product";
import ProductServiceFactory from "../../domain/service/ProductServiceFactory";
import { AsyncState } from "../../presentation/AsyncState";

const service = ProductServiceFactory.demoOnline();

export type CompositeProductDialogModel = {
  readonly compositeProduct: CompositeProduct;
  readonly availableProducts: Product[];
};

export type CompositeProductDialogState = {
  readonly model: AsyncState<CompositeProductDialogModel>;
  readonly saveRequest: AsyncState<void>;
};

export const setupNewComposite = createAsyncThunk(
  'compositeEdit/fetchInitialData',
  async () => {
    const products = await service.getProducts();

    return {
      compositeProduct: {
        name: '',
        components: []
      },
      availableProducts: products
    };
  }
);

export const fetchCompositeById = createAsyncThunk(
  'compositeEdit/fetchInitialData',
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

export const saveComposite = createAsyncThunk(
  'compositeEdit/save',
  async (composite: CompositeProduct) => {
    if (composite.id) {
      return await service.updateCompositeProduct(composite);
    } else {
      return await service.createCompositeProduct(composite);
    }
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

    builder.addCase(
      saveComposite.pending,
      (state) => {
        return { ...state, saveRequest: AsyncState.loading() };
      }
    );

    builder.addCase(
      saveComposite.fulfilled,
      (state, result) => {
        return { ...state, saveRequest: AsyncState.success(result.payload) };
      }
    );

    builder.addCase(
      saveComposite.rejected,
      (state, result) => {
        return { ...state, saveRequest: AsyncState.fail(result.error) };
      }
    );
  }
});

export default compositeEditSlice.reducer;
