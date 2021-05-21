import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import Button from "../../components/Button";
import CompositeProductList from "./components/CompositeProductList";
import PageHeader from "../../components/PageHeader";
import Page from "../Page";
import ErrorState from "../../components/ErrorState";
import CompositeListLoadingMask from "./components/CompositeListLoadingMask";
import { RootState, store } from "../../redux/store";
import { fetchCompositeProducts } from "../../redux/compositeListReducer";

const CompositeProductListPage: React.FC = () => {
  const compositeProductsRequest = useSelector((state: RootState) => state.compositeList);
  const history = useHistory();

  useEffect(() => {
    store.dispatch(fetchCompositeProducts());
  }, []);

  function openAddDialog(): void {
    history.push('/composite-products/add');
  }

  return (
    <Page>
      <div className="mb-4">
        <PageHeader title="Composite Products" subtitle="Collections of products and groups">
          <Button label="Add" onClick={openAddDialog} />
        </PageHeader>
      </div>

      {
        compositeProductsRequest.when({
          uninitialized: () => null,
          loading: () => <CompositeListLoadingMask />,
          success: (compositeProducts) => {
            return <CompositeProductList compositeProducts={compositeProducts} />;
          },
          fail: (error) => <ErrorState title={error.name} description={error.message} />,
        })
      }
    </Page>
  );
};

export default CompositeProductListPage;
