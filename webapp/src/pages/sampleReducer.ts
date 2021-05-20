import CompositeProduct from "../domain/models/CompositeProduct";
import { AsyncState } from "../presentation/AsyncState";

export interface SampleState {
  readonly compositeProducts: AsyncState<CompositeProduct[]>;
}

const initialState: SampleState = {
  compositeProducts: AsyncState.uninitialized()
};

const composites: CompositeProduct[] = [
  { id: '1', name: 'First 1800mm Desk Box Set', components: [{ type: 'PRODUCT', quantity: 5, productId: '' }, { type: 'PRODUCT', quantity: 5, productId: '' }] },
  { id: '2', name: 'Second 1800mm Desk Box Set', components: [{ type: 'PRODUCT', quantity: 5, productId: '' }] },
  { id: '3', name: 'Second 1800mm Desk Box Set', components: [] },
];

export const sampleReducer= (state: SampleState = initialState, action: any) => {
  switch (action.type) {
    case 'LOADING':
      return Object.assign({}, state, {compositeProducts: AsyncState.loading()});
    case 'LOAD_SUCCESS':
      return Object.assign({}, state, {compositeProducts: AsyncState.success(action.compositeProducts)});
    case 'LOAD_FAIL':
      return Object.assign({}, state, {compositeProducts: AsyncState.fail(action.error)});
    default:
      console.error(`Unknown reducer action ${action.type}`);
      return state;
  }
}