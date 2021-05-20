import React from "react";
import { useHistory } from "react-router";
import Button from "../../components/Button";
import CompositeProductList from "../../components/CompositeProductList";
import PageHeader from "../../components/PageHeader";
import CompositeProduct from "../../domain/models/CompositeProduct";
import Page from "../Page";

const CompositeProductListPage: React.FC = () => {
  const composites: CompositeProduct[] = [
    { id: '1', name: 'First 1800mm Desk Box Set', components: [{ type: 'PRODUCT', quantity: 5, productId: '' }, { type: 'PRODUCT', quantity: 5, productId: '' }] },
    { id: '2', name: 'Second 1800mm Desk Box Set', components: [{ type: 'PRODUCT', quantity: 5, productId: '' }] },
  ];

  const history = useHistory();

  function openAddDialog(): void {
    history.push('/composite-products/add');
  }

  return (
    <Page>
      <PageHeader title="Composite Products" subtitle="Collections of products and groups">
        <Button label="Add" onClick={openAddDialog} />
      </PageHeader>

      <div className="mt-4">
        <CompositeProductList compositeProducts={composites} />
      </div>
    </Page>
  );
};

export default CompositeProductListPage;
