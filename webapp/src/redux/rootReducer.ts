import { combineReducers } from '@reduxjs/toolkit'
import compositeEditReducer from './compositeEditReducer'
import compositeListReducer from './compositeListReducer'

export default combineReducers({
  compositeList: compositeListReducer,
  compositeEdit: compositeEditReducer
});
