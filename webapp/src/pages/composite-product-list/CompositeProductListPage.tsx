import React from "react";
import CompositeProductList from "../../components/CompositeProductList";
import CompositeProduct from "../../domain/models/CompositeProduct";
import Page from "../Page";

class CompositeProductListPage extends React.Component {
  render() {
    const composites: CompositeProduct[] = [
      { id: '1', name: 'First 1800mm Desk Box Set', components: [{ type: 'PRODUCT', quantity: 5, productId: '' }, { type: 'PRODUCT', quantity: 5, productId: '' }] },
      { id: '2', name: 'Second 1800mm Desk Box Set', components: [{ type: 'PRODUCT', quantity: 5, productId: '' }] },
    ];

    return (
      <Page>
        <CompositeProductList compositeProducts={composites} />
      </Page>
    );
  }
}

export default CompositeProductListPage;
