import React from "react";
import { useSelector } from "react-redux";
import { RootState, store } from "../../redux/store";
import { fetchCompositeProducts } from "./compositeListReducer";
import CompositeProductListScreen from "./CompositeProductListScreen";

const CompositeProductListPage: React.FC = () => {
  const compositeProductsRequest = useSelector((state: RootState) => state.compositeList);
  return (
    <CompositeProductListScreen
      request={compositeProductsRequest}
      fetchCompositeProducts={() => store.dispatch(fetchCompositeProducts())} />
  );
};

export default CompositeProductListPage;
