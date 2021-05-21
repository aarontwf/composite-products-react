import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import CompositeProductListScreen from "./CompositeProductListScreen";

const CompositeProductListPage: React.FC = () => {
  const compositeProductsRequest = useSelector((state: RootState) => state.compositeList);
  return <CompositeProductListScreen request={compositeProductsRequest} />;
};

export default CompositeProductListPage;
