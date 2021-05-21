import { createAsyncThunk } from "@reduxjs/toolkit";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import CompositeProduct from "../../domain/models/CompositeProduct";
import Product from "../../domain/models/Product";
import ProductServiceFactory from "../../domain/service/ProductServiceFactory";
import { AsyncState } from "../../presentation/AsyncState";

export type CompositeProductDialogModel = {
  readonly compositeProduct: CompositeProduct;
  readonly availableProducts: Product[];
};

export type CompositeProductDialogState = {
  readonly model: AsyncState<CompositeProductDialogModel>;
  readonly saveRequest: AsyncState<void>;
};

const initialState: CompositeProductDialogState = {
  model: AsyncState.uninitialized(),
  saveRequest: AsyncState.uninitialized(),
};

const service = ProductServiceFactory.demoOnline();

export const fetchCompositeById = createAsyncThunk(
  'composite/fetchById',
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
)

const compositeProductDialogReducer = (
  state: CompositeProductDialogState = initialState,
  action: any
) => {
  switch (action.type) {
    case 'composite/fetchById/pending':
      return { ...state, model: AsyncState.loading() };
    case 'composite/fetchById/fulfilled':
      return { ...state, model: AsyncState.success(action.payload) };
    case 'composite/fetchById/rejected':
      return { ...state, model: AsyncState.fail(action.error) };
    default:
      console.error(`Unknown reducer action ${action.type}`);
      return state;
  }
};

export const compositeProductDialogStore = createStore(
  compositeProductDialogReducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  ),
);
