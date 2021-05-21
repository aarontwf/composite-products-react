import React, { useEffect } from "react";
import { useHistory } from "react-router";
import Button from "../../components/Button";
import CompositeProductList from "./components/CompositeProductList";
import PageHeader from "../../components/PageHeader";
import Page from "../Page";
import ErrorState from "../../components/ErrorState";
import CompositeListLoadingMask from "./components/CompositeListLoadingMask";
import { store } from "../../redux/store";
import { fetchCompositeProducts } from "../../redux/compositeListReducer";
import { AsyncState } from "../../presentation/AsyncState";
import CompositeProduct from "../../domain/models/CompositeProduct";

interface CompositeProductListScreenProps {
  readonly request: AsyncState<CompositeProduct[]>
};

const CompositeProductListScreen: React.FC<CompositeProductListScreenProps> = (props) => {
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
        props.request.when({
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

export default CompositeProductListScreen;
