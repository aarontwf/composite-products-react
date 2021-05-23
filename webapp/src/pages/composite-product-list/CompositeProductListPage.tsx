import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import { RootState, store } from "../../redux/store";
import { fetchCompositeProducts } from "./compositeListReducer";
import CompositeProductListScreen from "./CompositeProductListScreen";

const CompositeProductListPage: React.FC = () => {
  const compositeProductsRequest = useSelector((state: RootState) => state.compositeList);

  const fetchAll = useCallback(
    () => store.dispatch(fetchCompositeProducts()),
    []
  );

  return (
    <CompositeProductListScreen
      request={compositeProductsRequest}
      fetchCompositeProducts={fetchAll} />
  );
};

export default CompositeProductListPage;
