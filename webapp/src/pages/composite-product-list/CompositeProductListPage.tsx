import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import Button from "../../components/Button";
import CompositeProductList from "./components/CompositeProductList";
import PageHeader from "../../components/PageHeader";
import CompositeProduct from "../../domain/models/CompositeProduct";
import { AsyncState } from "../../presentation/AsyncState";
import Page from "../Page";

const CompositeProductListPage: React.FC = () => {
  const compositeProductsRequest = useSelector<AsyncState<CompositeProduct[]>, AsyncState<CompositeProduct[]>>((state) => state); // FIXME
  const history = useHistory();

  function openAddDialog(): void {
    history.push('/composite-products/add');
  }

  return (
    <Page>
      <PageHeader title="Composite Products" subtitle="Collections of products and groups">
        <Button label="Add" onClick={openAddDialog} />
      </PageHeader>

      {
        compositeProductsRequest.when({
          uninitialized: () => null,
          loading: () => <div className="mt-4">Loading...</div>,
          success: (compositeProducts) => {
            return (
              <div className="mt-4">
                <CompositeProductList compositeProducts={compositeProducts} />
              </div>
            );
          },
          fail: (error) => <div className="mt-4">{error.toString()}</div>,
        })
      }
    </Page>
  );
};

export default CompositeProductListPage;
