import { Action } from 'redux';
import { createStore } from 'redux';
import CompositeProduct from "../../domain/models/CompositeProduct";
import { AsyncState } from "../../presentation/AsyncState";

interface UpdateAction extends Action {
  readonly type: 'UPDATE_REQUEST';
  readonly compositeProductsRequest: AsyncState<CompositeProduct[]>;
}

const initialState: AsyncState<CompositeProduct[]> = AsyncState.uninitialized();

export const compositeProductListReducer = (state: AsyncState<CompositeProduct[]> = initialState, action: UpdateAction) => {
  switch (action.type) {
    case 'UPDATE_REQUEST':
      return action.compositeProductsRequest;
    default:
      console.error(`Unknown reducer action ${action.type}`);
      return state;
  }
}

export const compositeProductListStore = createStore(compositeProductListReducer);
