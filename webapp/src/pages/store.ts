import { createStore } from 'redux';
import { sampleReducer } from './sampleReducer';

export const store = createStore(sampleReducer);
