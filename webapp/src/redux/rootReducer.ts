import { combineReducers } from '@reduxjs/toolkit'
import compositeEditReducer from '../pages/composite-product-dialog/compositeEditReducer'
import compositeListReducer from '../pages/composite-product-list/compositeListReducer'

export default combineReducers({
  compositeList: compositeListReducer,
  compositeEdit: compositeEditReducer
});
